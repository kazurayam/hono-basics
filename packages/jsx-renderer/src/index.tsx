// packages/jsx-renderer/src/index.tsx

/*
JSX Renderer Middleware allows you to set up the layout
when rendering JSX with the c.render() function, without
the need for using c.setRenderer().
Additionally, it enables access to instances of Context
within components through the use of useRequestContext().
See https://hono.dev/docs/middleware/builtin/jsx-renderer
 */
import { Hono } from 'hono'
import type { FC } from 'hono/jsx'
import { jsxRenderer } from 'hono/jsx-renderer'
import { Suspense } from "hono/jsx/streaming"
import { logger } from 'hono/logger'

const app = new Hono()

const customLogger = (message: string, ...rest: string[]) => {
    console.log(message, ...rest)
}
app.use(logger(customLogger))

app.get(
    '/page/*',
    jsxRenderer(({ children }) => {
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
    })
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


// Nested Layouts
// The Layout component enables nesting the layouts
app.use(
    jsxRenderer(
        ({ children }) => {
            return (
                <html>
                    <body>{ children }</body>
                </html>
            )
        }
    )
)
const blog = new Hono()
blog.use(
    jsxRenderer(({ children, Layout: FC }) => {
        return (
            <Layout>
                <nav>Blog Menu</nav>
                <div>{ children }</div>
            </Layout>
        )
    })
)
app.route('/blog', blog)


export default app
