import { Hono } from 'hono'
import { html, raw } from 'hono/html'

const app = new Hono()
    .get('/', (c) => {
        return c.html(
            html`<!doctype html>
                <html>
                    <head>
                        <title>Welcome nobody</title>
                    </head>
                    <body>
                        <div>You are supposed to make queries like "GET /:username"</div>
                    </body>
                </html>
            `
        )
    })
    .get('/:username', (c) => {
        const { username } = c.req.param()
        return c.html(
            html`<!doctype html>
                <html>
                    <head>
                        <title>Welcome ${username}</title>
                    </head>
                    <body>
                        <h1>Hello ${username}!</h1>
                    </body>
                </html>`
        )
    })

export default app
