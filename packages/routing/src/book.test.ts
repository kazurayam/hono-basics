import { describe, expect, test } from 'bun:test'
import book from './book'

describe('Grouping', () => {
    test('GET /book', async () => {
        const res = await book.request('/book', { method: 'GET' })
        expect(res.status).toBe(200)
        expect(await res.text()).toBe('List Books')
    })
    test('GET /book/:id', async () => {
        const res = await book.request('/book/botchan', { method: 'GET' })
        expect(res.status).toBe(200)
        expect(await res.text()).toBe('Get Book: botchan')
    })
    test('POST /book', async () => {
        const res = await book.request('/book', { method: 'POST' })
        expect(res.status).toBe(200)
        expect(await res.text()).toBe('Create Book')
    })
})

describe('Grouping without changing base', () => {
    test('GET /user', async () => {
        const res = await book.request('/user', { method: 'GET' })
        expect(res.status).toBe(200)
        expect(await res.text()).toBe('List Users')
    })
    test('POST /user', async () => {
        const res = await book.request('/user', { method: 'POST' })
        expect(res.status).toBe(200)
        expect(await res.text()).toBe('Create User')
    })
})
