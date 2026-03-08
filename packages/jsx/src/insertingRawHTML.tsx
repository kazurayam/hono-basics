import { Hono } from 'hono'

const app = new Hono()

app.use('*', async (c, next) => {
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

app.get('/foo', (c) => {
    const inner = { __html: 'JSX &middot; SSR' }   // &middot; is a middle-dot
    return c.render(<div dangerouslySetInnerHTML={inner} />)
})

export default app

