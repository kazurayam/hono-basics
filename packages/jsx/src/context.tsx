// context.tsx
import { Hono } from 'hono'
import type { FC } from 'hono/jsx'
import { createContext, useContext } from 'hono/jsx'

const app = new Hono()

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
    return <button style={theme}>Push!</button>
}

const Toolbar: FC = () => {
    return (
        <div>
            <Button />
        </div>
    )
}

app.get('/', (c) => {
    return c.render(
        <div>
            <ThemeContext.Provider value={themes.dark}>
                <Toolbar />
            </ThemeContext.Provider>
        </div>
    )
})
