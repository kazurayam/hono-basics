import { describe, test, expect } from 'bun:test'
import { testClient } from 'hono/testing'
import app from './fragment'

describe('verify HTML as DOM', () => {
    const client = testClient(app)
    test('should return HTML content with username and verify DOM', async () => {
        const res = await client.about.$get()
        expect(res.status).toBe(200)
        const text = await res.text()
        // Parse the HTML content
        const parser = new DOMParser()
        const doc = parser.parseFromString(text, 'text/html')
        // Verify DOM elements
        const title = doc.querySelector('title')
        const meta = doc.querySelector('meta')
        expect(title?.textContent).toBe(`About Page`)
        expect(meta?.getAttribute('name')).toBe('description')
        expect(meta?.getAttribute('content')).toBe('This is the about page')
        const list = doc.querySelectorAll('p')
        list.forEach((p) => {
            console.log(p.textContent)
        })
        //expect(list.length).toBe(4)
    })
})


