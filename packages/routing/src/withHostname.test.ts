import { describe, expect, test } from 'bun:test'
import app from './withHostname'

describe('Routing with hostname', () => {
    test('GET /localhost/hello', async () => {
        const res = await app.request('http://localhost/hello', { method: 'GET' })
        expect(res.status).toBe(200)
        expect(await res.text()).toBe('localhost hello')
    })
})
