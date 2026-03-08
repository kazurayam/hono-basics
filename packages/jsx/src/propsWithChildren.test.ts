// html/src/propsWithChildrent.test.ts
import { describe, test, expect } from 'bun:test'
import app from './propsWithChildren'

describe('verify HTML as text', () => {
    test('GET / should return correct HTML content', async () => {
        const res = await app.request('/card', { method: 'GET' })
        expect(res.status).toBe(200)
        const text = await res.text()
        console.log(text)
        expect(text).toContain('<title>Props with children</title>')
        expect(text).toContain('<h2>Welcome!</h2>')
        expect(text).toContain('<p>This is the content inside the card.</p>')
    })
})

describe('verify HTML DOM', () => {
    test('GET / should return a HTML DOM with <h2>Welcome!</h2> and the content inside the card', async () => {
        const res = await app.request('/card', { method: 'GET' })
        expect(res.status).toBe(200)
        const text = await res.text()
        // Parse the HTML content
        const parser = new DOMParser()
        const doc = parser.parseFromString(text, 'text/html')
        // Verify DOM elements
        const p = doc.querySelector('div.card div.card-content p')
        expect(p?.textContent).toBe('This is the content inside the card.')
    })
})

