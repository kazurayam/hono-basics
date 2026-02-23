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
import { Suspense } from "hono/jsx/streaming"

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


// Stream content
const AsyncComponent = async () => {
  await new Promise((r) => setTimeout(r, 1000))  // sleep 1second
  return <div>Hi!</div>
}

app.get(
  '/stream/*',
  jsxRenderer(
    ({ children }) => {
      return (
        <html>
          <body>
            <h1>Server-side-rendering Streaming</h1>
            { children }
          </body>
        </html>
      )
    },
    { stream: true}
  )
)

app.get('/stream', (c) => {
  return c.render(
    <Suspense fallback={<div>loading...</div>}>
      <AsyncComponent />
    </Suspense>
  )
})

export default app
