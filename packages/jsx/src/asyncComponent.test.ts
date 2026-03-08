// jsx/src/asyncComponent.test.tsx
import { describe, test, expect } from 'bun:test'
import app from './asyncComponent'

describe('verify HTML as text', () => {
    test('GET / should return a HTML DOM with <div>Done</div>', async () => {
        const res = await app.request('/', { method: 'GET' })
        expect(res.status).toBe(200)
        const text = await res.text()
        //console.log(text)
        expect(text).toContain('<div>Done!</div>')
    })
})
describe('verify HTML DOM', () => {
    test('GET / should return a HTML DOM with <div>Done</div>', async () => {
        const res = await app.request('/', { method: 'GET' })
        expect(res.status).toBe(200)
        const text = await res.text()
        // Parse the HTML content
        const parser = new DOMParser()
        const doc = parser.parseFromString(text, 'text/html')
        // Verify DOM elements
        const div = doc.querySelector('div')
        expect(div?.textContent).toBe('Done!')
    })
})

