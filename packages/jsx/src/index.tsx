// packages/jsx/src/index.tsx

import { Hono } from 'hono'
import type { FC } from 'hono/jsx'
// FCとはReact用語のFunction Componentの略。
// Function ComponentとはJSXを返す関数をReactコンポーネントとしてみるという意味。

const app = new Hono()
    .get('/', (c) => {
        // cはContextオブジェクト
        // https://hono.dev/docs/api/context
        // The Context object is instantiated for each request and kept
        // until the response is returned. You can put values in it,
        // set headers and a status code you want to return, and access
        // HonoRequest and Response objects.
        const messages = ['Good Morning', 'Good Evening', 'Good Night']
        return c.html(<Top messages={messages} />)
    })

const Top: FC<{ messages: string[] }> = (props: {
    messages: string[]
}) => {
    return (
        <Layout>
            <h1>Hello Hono!</h1>
            <ul>
                {props.messages.map((message) => {
                    return <li>{message}!!</li>
                })}
            </ul>
        </Layout>
    )
}

const Layout: FC = (props) => {
    return (
        <html>
            <body>{props.children}</body>
        </html>
    )
}



export default app
