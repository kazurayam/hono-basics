// Async Component
import { Hono } from 'hono'

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
