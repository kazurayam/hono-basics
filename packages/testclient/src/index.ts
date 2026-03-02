// testclient/src/index.ts
// See https://hono.dev/docs/helpers/testing for explanation
import { Hono } from 'hono';

// See https://hono.dev/docs/helpers/testing for explanation
/*
 * For the testClient to correctly infer the types of your routes and provide autocompletion, you must define your routes using chained methods directly on the Hono instance.
 */
const app = new Hono()
    .get('/search', (c) => {
        const query = c.req.query('q')
        return c.json({query: query, results: ['result1', 'result2']})
    })

export default app
