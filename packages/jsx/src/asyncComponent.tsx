// Async Component
import { Hono } from 'hono'

/**
 * hono/jsx supports an Async Component, so you can use async/await in your component.
 * If you render it with c.html(), it will await automatically.
 */

const app = new Hono()

const AsyncComponent = async () => {
    await new Promise((r) => setTimeout(r, 1000)) // sleep 1 s
    return <div>Done!</div>
}

app.get('/', (c) => {
    return c.render(
        <AsyncComponent />
    )
})

export default app
