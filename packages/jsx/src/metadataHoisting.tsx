import { Hono } from 'hono'

const app = new Hono()

// Using middleware by app.use() to set a custom renderer for all routes
app.use('*', async (c, next) => {
    // cはContextオブジェクト
    // https://hono.dev/docs/api/context
    // The Context object is instantiated for each request and kept
    // until the response is returned. You can put values in it,
    // set headers and a status code you want to return, and access
    // HonoRequest and Response objects.
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

app.get('/about', (c) => {
    return c.render(
        <>
            <title>About Page</title>
            <meta name='description' content='This is the about page' />
            <p>This is the About page.</p>
            <List />
        </>
    )
})

const List = () => {
    return (
        <>
            <p>first child</p>
            <p>second child</p>
            <p>third child</p>
        </>
    )
}

export default app
