// packages/jsx/src/index.tsx

import { Hono } from 'hono'
import type { FC } from 'hono/jsx'
// FCとはReact用語のFunction Componentの略。
// Function ComponentとはJSXを返す関数をReactコンポーネントとしてみるという意味。

import { memo, createContext, useContext } from 'hono/jsx'
import { html } from 'hono/html'

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

app.get('/foo', (c) => {
    const inner = { __html: 'JSX &middot; SSR' }   // &middot; is a middle-dot
    return c.render(<div dangerouslySetInnerHTML={inner} />)
})

const Header = memo(() => <header>Welcome to Hono</header>)
const Footer = memo(() => <footer>Powered by Hono</footer>)
app.get('/memorization', (c) => {
    return c.render(
        <>
            <Header />
            <p>Hono is cool!</p>
            <Footer />
        </>
    )
})

// Context
const themes = {
    light: {
        color: '#000000',
        background: '#eeeeee',
    },
    dark: {
        color: '#ffffff',
        background: '#222222',
    }
}
const ThemeContext = createContext(themes.light)    // set the default theme to be light
const Button: FC = () => {
    const theme = useContext(ThemeContext)
    return <button style={ theme }>Push!</button>
}
const Toolbar: FC = () => {
    return (
        <div>
            <Button />
        </div>
    )
}
app.get('/context', (c) => {
    return c.render(
        <div>
            <ThemeContext.Provider value={themes.dark}>
                <Toolbar />
            </ThemeContext.Provider>
        </div>
    )
})

// Async Component
const AsyncComponent = async () => {
    await new Promise((r) => setTimeout(r, 1000)) // sleep 1 s
    return <div>Done!</div>
}
app.get('/asynccomponent', (c) => {
    return c.render(
        <AsyncComponent />
    )
})


export default app
