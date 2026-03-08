// jsx/src/memoization.test.tsx
import { describe, test, expect } from 'bun:test'
import app from './memoization'

describe('verify HTML as text', () => {
    test('GET /memoization should return a HTML ', async () => {
        const res = await app.request('/memoization', { method: 'GET' })
        expect(res.status).toBe(200)
        const text = await res.text()
        //console.log(text)
        expect(text).toContain('<header>Welcome to Hono</header>')
        expect(text).toContain('<footer>Powered by Hono</footer>')
    })
})
