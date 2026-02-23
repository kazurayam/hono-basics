// packages/jsx/src/index.tsx

import { Hono } from 'hono'
import type { FC } from 'hono/jsx'
// FCとはReact用語のFunction Componentの略。
// Function ComponentとはJSXを返す関数をReactコンポーネントとしてみるという意味。

const app = new Hono()

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

app.get('/', (c) => {
    const messages = ['Good Morning', 'Good Evening', 'Good Night']
    return c.render(<Top messages={messages} />)
})

const Top: FC<{ messages: string[] }> = (props: {
    messages: string[]
}) => {
    return (
        <>
            <h1>Hello Hono!</h1>
            <ul>
                {props.messages.map((message) => {
                    return <li>{message}!!</li>
                })}
            </ul>
        </>
    )
}

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
