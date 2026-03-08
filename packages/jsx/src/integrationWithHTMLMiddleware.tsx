import { Hono } from 'hono'
import { html } from 'hono/html'

/**
 * Combine the JSX and html middlewares for powerful templating.
 */
const app = new Hono()

interface SiteData {
    title: string
    children?: any
}

const Layout = (props: SiteData) =>
    // use the html Middleware to create a layout template
    html`<!doctype html>
    <html>
      <head>
        <title>${props.title}</title>
      </head>
      <body>
        ${props.children}
      </body>
    </html>`

const Content = (props: { siteData: SiteData; name: string }) => (
    <Layout {...props.siteData}>
        // use the JSX Middleware to create a content component
        <h1>Hello {props.name}</h1>
    </Layout>
)

app.get('/:name', (c) => {
    const { name } = c.req.param()
    const props = {
        name: name,
        siteData: {
            title: 'JSX with html sample',
        },
    }
    return c.html(<Content {...props} />)
})

export default app

