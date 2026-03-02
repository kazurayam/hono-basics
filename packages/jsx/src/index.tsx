// packages/jsx/src/index.tsx
import { Hono } from 'hono'
import type { FC } from 'hono/jsx'
// FCとはReact用語のFunction Componentの略。
// Function ComponentとはJSXを返す関数をReactコンポーネントとしてみるという意味。

import { memo, createContext, useContext } from 'hono/jsx'

const app = new Hono()

const Layout: FC = (props) => {
    return (
        <html>
            <body>{props.children}</body>
        </html>
    )
}

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

app.get('/', (c) => {
    const messages = ['Good Morning', 'Good Eventing', 'Good Night']
    return c.render(<Top messages={messages} />)
})

export default app
