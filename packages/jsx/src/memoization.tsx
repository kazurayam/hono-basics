import { Hono } from 'hono'
import { memo } from 'hono/jsx'

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

const Header = memo(() => <header>Welcome to Hono</header>)
const Footer = memo(() => <footer>Powered by Hono</footer>)
app.get('/memoization', (c) => {
    return c.render(
        <>
            <Header />
            <p>Hono is cool!</p>
            <Footer />
        </>
    )
})

export default app

