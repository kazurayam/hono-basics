// testing/src/sample.ts
import { Hono } from 'hono';

export const app = new Hono()
    .get('/posts', (c) => {
        return c.text('Many posts');
    })
    .post('/posts', (c) => {
        return c.json({
            message: 'Post created'
        },
            201,
            {
                'X-Custom-Header': 'Thank you'
            }
        );
    });

