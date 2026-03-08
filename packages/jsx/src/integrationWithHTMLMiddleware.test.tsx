// jsx/src/integrationWithHTMLMiddleware.test.tsx
import { describe, test, expect } from 'bun:test'
import app from './integrationWithHTMLMiddleware'

describe('verify HTML as text', () => {
    test('GET / should return a HTML DOM with <button style="color: #ffffff; background: #222222;">Push!</button>', async () => {
        const res = await app.request('/kazurayam', { method: 'GET' })
        expect(res.status).toBe(200)
        const text = await res.text()
        console.log(text)
        expect(text).toContain('<h1>Hello kazurayam</h1>')
    })
})
