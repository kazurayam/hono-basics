import { describe, expect, test } from 'bun:test';
import app from './routingPriority';

describe('Routing Priority', () => {
    test('GET /book/a', async () => {
        const res = await app.request('/book/a', { method: 'GET' })
        expect(res.status).toBe(200)
        expect(await res.text()).toBe('GET /book/a')
    })
    test('GET /book/b', async () => {
        const res = await app.request('/book/b', { method: 'GET' })
        expect(res.status).toBe(200)
        expect(await res.text()).toBe('GET /book/b')
    })
    test('GET /book/c', async () => {
        const res = await app.request('/book/c', { method: 'GET' })
        expect(res.status).toBe(200)
        expect(await res.text()).toBe('GET /book/c')
    })
    test('GET /fallback', async () => {
        const res = await app.request('/fallback', { method: 'GET' })
        expect(res.status).toBe(200)
        expect(await res.text()).toBe('fallback')
    })
})

describe('Grouping Ordering', () => {
    test('GET /two/three/hi', async () => {
        const res = await app.request('/two/three/hi', { method: 'GET' })
        expect(res.status).toBe(200)
        expect(await res.text()).toBe('hi')
    })
})

