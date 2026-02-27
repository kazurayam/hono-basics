import { Hono } from 'hono'

const api = new Hono().basePath('/api')
api.get('/book', (c) => c.text('List Books')) // GET /api/book

export default api
