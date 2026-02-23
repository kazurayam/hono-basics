// packages/jsx-renderer/src/index.tsx

/*
JSX Renderer Middleware allows you to set up the layout
when rendering JSX with the c.render() function, without
the need for using c.setRenderer().
Additionally, it enables access to instances of Context
within components through the use of useRequestContext().
 */
import { Hono } from 'hono'
import { jsxRenderer, useRequestContext } from 'hono/jsx-renderer'

const app = new Hono()

app.get('/page/*',
    jsxRenderer(
        ({ children }) => {
            return (
                <html>
                    <body>
                        <header>Menu</header>
                        <div>{children}</div>
                    </body>
                </html>
            )
        },
        {
            docType: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">'
        }
    )
)

app.get('/page/about', (c) => {
    return c.render(<h1>About me!</h1>)
})

export default app
