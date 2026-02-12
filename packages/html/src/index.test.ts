// html/src/index.test.ts
import { describe, test, expect } from 'bun:test'
import { testClient } from 'hono/testing'
import app from './index'

describe('verify HTML as text', () => {
    // Create the test client from the app instance
    const client = testClient(app)

    test('should return HTML content with username', async () => {
        const username = 'JohnDoe'
        // Call the endpoint using the typed client
        const res = await client[':username'].$get({
            param: { username : username }
        })
        // Assertions
        expect(res.status).toBe(200)
        const text = await res.text()
        //console.log(text)
        expect(text).toContain(`<title>Welcome ${username}</title>`)
        expect(text).toContain(`<h1>Hello ${username}!</h1>`)
    })

    test('should return HTML content with username, without testClient', async () => {
        const username = 'JaneDoe'
        // Call the endpoint without using the typed client
        const req = new Request(`http://localhost/${username}`, { method: 'GET' })
        const res = await app.request(req)
        // Assertions
        expect(res.status).toBe(200)
        const text = await res.text()
        expect(text).toContain(`<title>Welcome ${username}</title>`)
        expect(text).toContain(`<h1>Hello ${username}!</h1>`)
    })
})

describe('verify HTML as DOM', () => {
    const client = testClient(app)

    test('should return HTML content with username and verify DOM', async () => {
        const username = 'Alice'
        const res = await client[':username'].$get({
            param: { username : username }
        })
        expect(res.status).toBe(200)
        const text = await res.text()
        // Parse the HTML content
        const parser = new DOMParser()
        const doc = parser.parseFromString(text, 'text/html')
        // Verify DOM elements
        const title = doc.querySelector('title')
        const h1 = doc.querySelector('h1')
        expect(title?.textContent).toBe(`Welcome ${username}`)
        expect(h1?.textContent).toBe(`Hello ${username}!`)
    })
})

