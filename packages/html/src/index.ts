import { Hono } from 'hono'
import { html, raw } from 'hono/html'

const app = new Hono()
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
