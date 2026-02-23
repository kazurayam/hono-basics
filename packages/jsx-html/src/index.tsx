// packages/jsx-html/src/index.tsx

// Integration with html Middleware
// Combine the JSX and html middlewares for powerful templating.

import { Hono } from 'hono'
import { html } from 'hono/html'

const app = new Hono()

interface SiteData {
    title: string
    children?: any
}

app.get('/:name', (c) => {
    const { name } = c.req.param()
    const props = {
        name: name,
        siteData: {
            title: 'JSX with html sample'
        }
    }
    return c.html(<Content {...props} />)
})

const Content = (props: { siteData: SiteData; name: string }) => (
    <Layout {...props.siteData}>
        <h1>Hello {props.name}</h1>
    </Layout>
)

const Layout = (props: SiteData) =>
    html`<doctype html>
        <html>
            <head>
                <title>${props.title}</title>
            </head>
            <body>
                ${props.children}
            </body>
        </html>`


export default app
