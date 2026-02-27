import { Hono } from 'hono'

/**
 * Grouping
 * You can group the routes with the Hono instance
 * and add them to the main app with the route method.
 */
const book = new Hono()

book.get('/', (c) => c.text('List Books'))
book.get('/:id', (c) => {
    // GET /book/:id
    const id = c.req.param('id')
    return c.text('Get Book: ' + id)
})
book.post('/', (c) => c.text('Create Book'))

const app = new Hono()
app.route('/book', book)

// Grouping without changing base
const user = new Hono().basePath('/user')
user.get('/', (c) => c.text('List Users')) // GET /user
user.post('/', (c) => c.text('Create User')) // POST /user

app.route('/', user)

export default app
