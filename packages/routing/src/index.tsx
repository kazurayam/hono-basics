import { Hono } from 'hono'

const app = new Hono()

// HTTP Methods
app.get('/', (c) => c.text('GET /'))
app.post('/', (c) => c.text('POST /'))
app.put('/', (c) => c.text('PUT /'))
app.delete('/', (c) => c.text('DELETE /'))

// Wildcard
app.get('/wild/*/card', (c) => {
    return c.text('GET /wild/*/card')
})

// Any HTTP methods
app.all('/hello', (c) => c.text('Any Method /hello'))

// Custom HTTP method
app.on('PURGE', '/cache', (c) => c.text('PURGE Method /cache'))


// Multiple Methods
/* No overload matches here
app.on(['PUT', 'DELETE'], '/post', (c) => {
    return c.text('PUT or DELETE /post')
})
*/

/* No overload matcheres here
// Multiple Paths
app.on('GET', ['/hi', '/ja/hi', '/en/hi'], (c) => {
    return c.text('Hello')
})
    */

// Path Parameter
app.get('/user/:name', async (c) => {
    const name = c.req.param('name')
    return c.text(`Hi ${name}`)
})
app.get('/posts/:id/comment/:comment_id', async (c) => {
    const { id, comment_id } = c.req.param()
    return c.text(`post id: ${id}, comment id: ${comment_id}`)
})

// Optional Parameter
// Will match /api/animal and /api/animal/:type
app.get('/api/animal/:type?', (c) => {
    let t = ''
    const { type } = c.req.param()
    if (type) {
        t = type
    }
    return c.text(`Animal ${t}!`)
})

export default app
