// testclient/src/index.ts
// See https://hono.dev/docs/helpers/testing for explanation
import { Hono } from 'hono';

const app = new Hono()
    .get('/search', (c) => {
        const query = c.req.query('q')
        return c.json({query: query, results: ['result1', 'result2']})
    })

export default app
