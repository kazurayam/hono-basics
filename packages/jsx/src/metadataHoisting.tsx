import { Hono } from 'hono'

const app = new Hono()
    // Using middleware by app.use() to set a custom renderer for all routes
    .use('*', async (c, next) => {
        // cはContextオブジェクト
        // https://hono.dev/docs/api/context
        c.setRenderer((content) => {
            return c.html(
                <html>
                    <head></head>
                    <body>{content}</body>
                </html>
            )
        })
        await next()
    })
    .get('/about', (c) => {
        return c.render(
            <>
                <title>About Page</title>
                <meta name='description' content='This is the about page' />
                <p>This is the About page.</p>
            </>
        )
    })
// I declared the .use() and .get() chained directly on the Hono object instanciated by new Hono()
// See https://hono.dev/docs/helpers/testing "Important Note on Type Inference"

export default app
