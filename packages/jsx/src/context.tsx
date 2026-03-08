// context.tsx
import { Hono } from 'hono'
import type { FC } from 'hono/jsx'
import { createContext, useContext } from 'hono/jsx'
/**
 * This example demonstrates how to use React's Context API in a Hono application.
 * We create a ThemeContext to provide theme information to the Button component.
 * The Toolbar component contains the Button, and we wrap it with the ThemeContext.Provider
 * to pass down the dark theme. The Button component consumes the theme context and applies
 * the styles accordingly.
 */
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

const Toolbar: FC = () => {
    return (
        <div>
            <Button />
        </div>
    )
}

const Button: FC = () => {
    const theme = useContext(ThemeContext)
    return <button style={theme}>Push!</button>
}

const app = new Hono().get('/', (c) => {
    return c.render(
        <div>
            <ThemeContext.Provider value={themes.dark}>
                <Toolbar />
            </ThemeContext.Provider>
        </div>
    )
})

export default app
