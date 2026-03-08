// html/src/insertingRawHTML.test.ts
import { describe, test, expect } from 'bun:test'
import app from './insertingRawHTML'

describe('verify HTML as text', () => {
    test('GET / should return a HTML DOM with <div>JSX &middot; SSR</div>', async () => {
        const res = await app.request('/foo', { method: 'GET' })
        expect(res.status).toBe(200)
        const text = await res.text()
        console.log(text)
        expect(text).toContain('<div>JSX &middot; SSR</div>')
    })
})

describe('verify HTML DOM', () => {
    test('GET / should return a HTML DOM with <div>JSX &middot; SSR</div>', async () => {
        const res = await app.request('/foo', { method: 'GET' })
        expect(res.status).toBe(200)
        const text = await res.text()
        // Parse the HTML content
        const parser = new DOMParser()
        const doc = parser.parseFromString(text, 'text/html')
        // Verify DOM elements
        const p = doc.querySelector('div')
        expect(p?.textContent).toBe('JSX · SSR')
    })
})

