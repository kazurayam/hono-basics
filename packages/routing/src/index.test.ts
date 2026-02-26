// packages/routing/src/index.test.ts
import { describe, expect, test } from 'bun:test';
import app from './index';

describe('HTTP Methods', () => {
    test("GET /", async () => {
        const res = await app.request("/", { method: 'GET' })
        expect(res.status).toBe(200)
    })
})
