// packages/routing/src/index.test.ts
import { describe, expect, test } from 'bun:test';
import app from './index';

describe('Basic', () => {
    describe('HTTP Methods', () => {
        test("GET /", async () => {
            const res = await app.request("/", { method: 'GET' })
            expect(res.status).toBe(200)
        })
        test("POST /", async () => {
            const res = await app.request("/", { method: 'POST' })
            expect(res.status).toBe(200)
        })
        test("PUT /", async () => {
            const res = await app.request("/", { method: 'PUT' })
            expect(res.status).toBe(200)
        })
        test("DELETE /", async () => {
            const res = await app.request("/", { method: 'DELETE' })
            expect(res.status).toBe(200)
        })
    })

    describe('Wildcard', () => {
        test('GET /wild/foo/card', async () => {
            const res = await app.request("/wild/foo/card", { method: "GET" })
            expect(res.status).toBe(200)
            expect(await res.text()).toBe('GET /wild/*/card')
        })
    })

    describe('Any HTTP methods', () => {
        test('GET /hello', async () => {
            const res = await app.request('/hello', { method: 'GET' })
            expect(res.status).toBe(200)
            expect(await res.text()).toBe('Any Method /hello')
        })
        test('POST /hello', async () => {
            const res = await app.request('/hello', { method: 'POST' })
            expect(res.status).toBe(200)
            expect(await res.text()).toBe('Any Method /hello')
        })
        test('PUT /hello', async () => {
            const res = await app.request('/hello', { method: 'PUT' })
            expect(res.status).toBe(200)
            expect(await res.text()).toBe('Any Method /hello')
        })
        test('DELETE /hello', async () => {
            const res = await app.request('/hello', { method: 'DELETE' })
            expect(res.status).toBe(200)
            expect(await res.text()).toBe('Any Method /hello')
        })
    })

    describe('Custom HTTP method', () => {
        test('PURGE /cache', async () => {
            const res = await app.request('/cache', { method: 'PURGE' })
            expect(res.status).toBe(200)
            expect(await res.text()).toBe('PURGE Method /cache')
        })
    })

    /*
    describe('Multiple Method', () => {
        test('PUT /post', async () => {
            const res = await app.request('/post', { method: 'PUT' })
            expect(res.status).toBe(200)
            expect(await res.text()).toBe('PUT or DELETE /post')
        })
        test('DELETE /post', async () => {
            const res = await app.request('/post', { method: 'DELETE' })
            expect(res.status).toBe(200)
            expect(await res.text()).toBe('PUT or DELETE /post')
        })
    })
    */

    /*
    describe('Multiple Paths', () => {
        test('GET /hi', async () => {
            const res = await app.request('/hi', { method: 'GET' })
            expect(res.status).toBe(200)
            expect(await res.text()).toBe('Hello')
        })
        test('GET /ja/hi', async () => {
            const res = await app.request('/ja/hi', { method: 'GET' })
            expect(res.status).toBe(200)
            expect(await res.text()).toBe('Hello')
        })
        test('GET /en/hi', async () => {
            const res = await app.request('/en/hi', { method: 'GET' })
            expect(res.status).toBe(200)
            expect(await res.text()).toBe('Hello')
        })
    })
        */
})

describe('Path Parameter', () => {
    describe('single parameter', () => {
        test('GET /user/:name', async () => {
            const res = await app.request('/user/kazurayam', { method: 'GET' })
            expect(res.status).toBe(200)
            expect(await res.text()).toBe('Hi kazurayam')
        })
        test('GET /posts/123/comment/456', async () => {
            const res = await app.request('/posts/123/comment/456', { method: 'GET' })
            expect(res.status).toBe(200)
            expect(await res.text()).toBe('post id: 123, comment id: 456')
        })
    })
})

describe('Optional Parameter', () => {
    test('GET /api/animal/:type', async () => {
        const res = await app.request('/api/animal/lizard', { method: 'GET' })
        expect(res.status).toBe(200)
        expect(await res.text()).toBe('Animal lizard!')
    })
})

describe('Regexp', () => {
    test('GET /post/20260226/whoknows', async () => {
        const res = await app.request('/post/20260226/whoknows', { method: 'GET' })
        expect(res.status).toBe(200)
        expect(await res.text()).toBe('date: 20260226, title: whoknows')
    })
})

describe('Including slashes', () => {
    test('GET /files/data.png', async () => {
        const res = await app.request('/files/data.png', { method: 'GET' })
        expect(res.status).toBe(200)
        expect(await res.text()).toBe('filename: data.png')
    })
    test('GET /files/dir/data.png', async () => {
        const res = await app.request('/files/dir/data.png', { method: 'GET' })
        expect(res.status).toBe(200)
        expect(await res.text()).toBe('filename: dir/data.png')
    })
})

describe('Chained route', () => {
    test('GET /endpoint', async () => {
        const res = await app.request('/endpoint', { method: 'GET' })
        expect(res.status).toBe(200)
        expect(await res.text()).toBe('GET /endpoint')
    })
    test('POST /endpoint', async () => {
        const res = await app.request('/endpoint', { method: 'POST' })
        expect(res.status).toBe(200)
        expect(await res.text()).toBe('POST /endpoint')
    })
    test('DELETE /endpoint', async () => {
        const res = await app.request('/endpoint', { method: 'DELETE' })
        expect(res.status).toBe(200)
        expect(await res.text()).toBe('DELETE /endpoint')
    })

})
