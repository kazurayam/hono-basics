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
