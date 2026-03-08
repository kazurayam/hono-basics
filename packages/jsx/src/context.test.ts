// jsx/src/context.test.tsx
import { describe, test, expect } from 'bun:test'
import app from './context'

describe('verify HTML as text', () => {
    test('GET / should return a HTML DOM with <button style="color: #ffffff; background: #222222;">Push!</button>', async () => {
        const res = await app.request('/', { method: 'GET' })
        expect(res.status).toBe(200)
        const text = await res.text()
        console.log(text)
        expect(text).toContain('<button style="color:#ffffff;background:#222222">Push!</button>')
    })
})
describe('verify HTML DOM', () => {
    test('GET / should return a HTML DOM with <button style="color: #ffffff; background: #222222;">Push!</button>', async () => {
        const res = await app.request('/', { method: 'GET' })
        expect(res.status).toBe(200)
        const text = await res.text()
        // Parse the HTML content
        const parser = new DOMParser()
        const doc = parser.parseFromString(text, 'text/html')
        // Verify DOM elements
        const button = doc.querySelector('button')
        expect(button?.style.color).toBe('#ffffff')
        expect(button?.style.background).toBe('#222222')
    })
})
