// html/src/index.test.ts
import { describe, test, expect } from 'bun:test'
import { testClient } from 'hono/testing'
import app from './index'

describe('HTML Endpoint', () => {
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
