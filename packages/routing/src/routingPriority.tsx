import { Hono } from 'hono'

const app = new Hono()

app.get('/book/a', (c) => c.text('GET /book/a'))
app.get('/book/:slug', (c) => c.text(`GET /book/${c.req.param('slug')}`))

// Grouping ordering
const three = new Hono()
three.get('/hi', (c) => c.text('hi'))
const two = new Hono()
two.route('/three', three)
app.route('/two', two)


// fallback
app.get('*', (c) => c.text('fallback'))

export default app
