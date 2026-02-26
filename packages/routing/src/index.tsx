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
export default app

// Multiple Methods
/*
app.on(['PUT', 'DELETE'], '/post', (c) => {
    c.text('PUT or DELETE /post')
})
*/

/* No overload matcheres here
// Multiple Paths
app.on('GET', ['/hi', '/ja/hi', '/en/hi'], (c) => {
    c.text('Hello')
})
    */
