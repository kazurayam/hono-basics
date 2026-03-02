// html/src/index.test.ts
import { describe, test, expect } from 'bun:test'
import app from './index'

describe('getting started', () => {
    test('GET /', async () => {
        const res = await app.request('/', { method: 'GET' })
        expect(res.status).toBe(200)
    })
})

describe('verify HTML as text', () => {
    test('GET / should return correct HTML content', async () => {
        const res = await app.request('/', { method: 'GET' })
        expect(res.status).toBe(200)
        const text = await res.text()
        expect(text).toContain('<h1>Hello Hono!</h1>')
        expect(text).toContain('<li>Good Morning!!</li>')
        expect(text).toContain('<li>Good Eventing!!</li>')
        expect(text).toContain('<li>Good Night!!</li>')
    })
})

describe('verify HTML DOM', () => {
    test('GET / should return a HTML DOM with <h1>Hello Hono!</h1>', async () => {
        const res = await app.request('/', { method: 'GET' })
        expect(res.status).toBe(200)
        const text = await res.text()
        // Parse the HTML content
        const parser = new DOMParser()
        const doc = parser.parseFromString(text, 'text/html')
        // Verify DOM elements
        const h1 = doc.querySelector('h1')
        expect(h1?.textContent).toBe('Hello Hono!')
        const li1 = doc.querySelector('li:nth-child(1)')
        const li2 = doc.querySelector('li:nth-child(2)')
        const li3 = doc.querySelector('li:nth-child(3)')
        expect(li1?.textContent).toBe('Good Morning!!')
        expect(li2?.textContent).toBe('Good Eventing!!')
        expect(li3?.textContent).toBe('Good Night!!')   
    })
})
