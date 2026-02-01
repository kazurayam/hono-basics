// testing/src/sample.test.ts
import { describe, expect, test } from 'bun:test';
import { app } from './sample';

describe('Example', () => {
    test("GET /posts", async () => {
        const res = await app.request('/posts')
        expect(res.status).toBe(200)
        expect(await res.text()).toBe('Many posts')
    })
    test("POST /posts", async () => {
        const res = await app.request('/posts', { method: 'POST' })
        expect(res.status).toBe(201)
        expect(res.headers.get('X-Custom-Header')).toBe('Thank you')
        const json = await res.json()
        expect(json).toEqual({ message: 'Post created' })
    })
    test('POST /posts with JSON data', async () => {
        const res = await app.request('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: 'New Post', content: 'This is a new post.' })
        })
        expect(res.status).toBe(201)
        expect(res.headers.get('X-Custom-Header')).toBe('Thank you')
        const json = await res.json()
        expect(json).toEqual({ message: 'Post created' })
    })
    test('POST /posts with multipart/form-data', async () => {
        const formData = new FormData();
        formData.append('title', 'New Post');
        formData.append('content', 'This is a new post.');

        const res = await app.request('/posts', {
            method: 'POST',
            body: formData
        })
        expect(res.status).toBe(201)
        expect(res.headers.get('X-Custom-Header')).toBe('Thank you')
        const json = await res.json()
        expect(json).toEqual({ message: 'Post created' })
    })
    test('POST /posts using Request class', async () => {
        const req = new Request('http://localhost/posts', {
            // It seems that the app (instance of Hono) will ignore the hostname 'localhost' and the port (80)
            // Am I right?
            method: 'POST'
        })
        const res = await app.request(req)
        expect(res.status).toBe(201)
        expect(res.headers.get('X-Custom-Header')).toBe('Thank you')
        const json = await res.json()
        expect(json).toEqual({ message: 'Post created' })
    })
    test('POST /posts using Request class with non-existent URL', async () => {
        const req = new Request('https://127.1.2.3:8080/posts', {
            // It seems that the app (instance of Hono) will ignore the protocol(https), hostname(127.1.2.3) and port(8080)
            // Am I right?
            method: 'POST'
        })
        const res = await app.request(req)
        expect(res.status).toBe(201)
        expect(res.headers.get('X-Custom-Header')).toBe('Thank you')
        const json = await res.json()
        expect(json).toEqual({ message: 'Post created' })
    })
    test('POST /posts using Request class with syntactically valid but ridiculous URL', async () => {
        const req = new Request('protocol://hostname:9999/posts', {
            // It seems that the app (instance of Hono) will ignore the protocol(https), hostname(127.1.2.3) and port(8080)
            // Am I right?
            method: 'POST'
        })
        const res = await app.request(req)
        expect(res.status).toBe(201)
        expect(res.headers.get('X-Custom-Header')).toBe('Thank you')
        const json = await res.json()
        expect(json).toEqual({ message: 'Post created' })
    })
    test('POST /posts using Request class with invalid path URL will return 404 Not Found', async () => {
        const req = new Request('protocol://hostname:9999/postzzz', {
            // The path '/postzzz' is invalid
            method: 'POST'
        })
        const res = await app.request(req)
        expect(res.status).toBe(404) // Not Found
    })
})
