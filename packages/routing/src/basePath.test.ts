import { describe, expect, test } from 'bun:test'
import api from './basePath'

describe("Base path", () => {
    test('GET /api/book', async () => {
        const res = await api.request('/api/book', { method: 'GET' })
        expect(res.status).toBe(200)
        expect(await res.text()).toBe('List Books')
    })
})
