- Table of contents
{:toc}

# Honoを基本から学ぶ

## Guides / Testing

TODO

## Helpers / Testing

元ネタ: [Hono / Guides / Testing](https://hono.dev/docs/guides/testing)

元ネタの冒頭にこう書いてある。

> The testClient() function takes an instance of Hono as its first argument and returns an object typed according to your Hono application’s routes, similar to the [Hono Client](https://hono.dev/docs/guides/rpc#client).

この説明文が何を意味しているか、よくわからない。研究してみよう。

        const client = testClient(app)

        test('should return search results', async () => {
            const res = await client.search.$get({
                query: { q: 'hono' }
            });

こんなふうに `` testClient` `` のインスタンスである `client` は `seach` プロパティを持っていて、`search` プロパティの `$get` メソッドを呼び出すことができる。この短いコードで `index.ts` の中で定義されたHonoオブジェクトの持つrouteの一つ、すなわち

    const app = new Hono()
        .get('/search', (c) => {
            const query = c.req.query('q')
            return c.json({query: query, results: ['result1', 'result2']})
        })

を呼び出すことができる。

少し横道に逸れるが、上記のテストと同じ役割を果たすtestを `testClient` を使わずに書いてみよう。どんなコードになるか？

duckduckgoのSearch assist AIに質問してみた。

> how to test Hono without testClient

そしたらこんな応答があった。

> You can test Hono applications by creating a Request and passing it to the Hono application to validate the Response. Use the app.request method to simulate requests and check the responses directly in your tests.

### Testing Hono Applications Without testClient

#### Basic Testing Setup

You can test Hono applications without using the testClient by directly creating requests and validating responses. Here’s how to do it:

- Create a Request: Use the Request class to simulate HTTP requests.

- Pass the Request to the Hono App: Call the app’s request handler with the created request.

- Validate the Response: Check the response status and body.

#### Example Code

Here’s a simple example of how to test a Hono application without testClient:

    import { Hono } from 'hono';
    import { describe, test, expect } from 'vitest';

    const app = new Hono();

    app.get('/posts', (c) => {
      return c.json({ message: 'Many posts' }, 200);
    });

    describe('GET /posts', () => {
      test('should return posts', async () => {
        const req = new Request('http://localhost/posts', { method: 'GET' });
        const res = await app.request(req);

        expect(res.status).toBe(200);
        expect(await res.json()).toEqual({ message: 'Many posts' });
      });
    });

#### Testing POST Requests

For testing POST requests, you can include a body in your request:

    app.post('/posts', (c) => {
      return c.json({ message: 'Created' }, 201);
    });

    describe('POST /posts', () => {
      test('should create a post', async () => {
        const req = new Request('http://localhost/posts', {
          method: 'POST',
          body: JSON.stringify({ message: 'hello' }),
          headers: { 'Content-Type': 'application/json' },
        });
        const res = await app.request(req);

        expect(res.status).toBe(201);
        expect(await res.json()).toEqual({ message: 'Created' });
      });
    });

#### Conclusion

By creating requests manually and passing them to your Hono application, you can effectively test your endpoints without relying on testClient. This method allows for flexibility in testing various HTTP methods and scenarios.

ふむふむ、参考になった。コードを自作してみよう。

[testclient/src/index.ts](https://github.com/kazurayam/hono-basics/blob/master/packages/testclient/src/index.ts)

    // testclient/src/index.ts
    // See https://hono.dev/docs/helpers/testing for explanation
    import { Hono } from 'hono';

    const app = new Hono()
        .get('/search', (c) => {
            const query = c.req.query('q')
            return c.json({query: query, results: ['result1', 'result2']})
        })

    export default app

[testclient/src/index.test.ts](https://github.com/kazurayam/hono-basics/blob/master/packages/testclient/src/index.ts)

    // testclient/src/index.test.ts
    // See https://hono.dev/docs/helpers/testing for explanation

    import { describe, test, expect } from 'bun:test'
    import { testClient } from 'hono/testing'
    import app from './index'

    describe('Search Endpoint', () => {
        // Create the test client from the app instance
        const client = testClient(app)

        test('should return search results', async () => {
            // Call the endpoint using the typed client
            // Notice the type safety for query parameters (if defined in the route)
            // and the direct access via .$get()
            const res = await client.search.$get({
                query: { q: 'hono' }
            });
            // Assertions
            expect(res.status).toBe(200)
            expect(await res.json()).toEqual({
                query: 'hono',
                results: ['result1', 'result2']
            })
        })

        test('should return search results, without testClient', async () => {
            // Call the endpoint without using the typed client
            // It works but the type safety for query parameters (if defined in the route).
            const req = new Request('http://localhost/search?q=hono', { method: 'GET' })
            const res = await app.request(req);
            // Assertions
            expect(res.status).toBe(200)
            expect(await res.json()).toEqual({
                query: 'hono',
                results: ['result1', 'result2']
            })
        })
    })

二つのtestは同じことをする。ただし前者はtestClientを使っているが後者はtestClientを使わずにやっている。

appがrouteに型を明示的に宣言していればtestClientを使ったコードを書くときTypeScript言語の型検査が動く。だからたとえば私がエディタで

        ... = await client.searche.$get({

と書いたとしたら、searcheが間違いで、正しくはsearchと書くべきだ、とVSCodeのエディタが教えてくれるだろう。こんなふうに:

![searche](images/helpers_testing/searche.png)

いっぽう、testClientを使わない後者のコードではどうか？

        ... = new Request('http://localhost/searche?q=hono', { method: 'GET' })

のようにstringリテラルの中でsearchをsearcheと書いたらどうか？ …​ エディタは書き間違いを指摘することができない。

このように `testClient` はTypeScript言語の型検査の力をオーサリング時に享受できるようにしてくれる。testClientを使わなければ型検査の力を享受できない。この違いは大きい。だから testClient を活用するべきだ。
