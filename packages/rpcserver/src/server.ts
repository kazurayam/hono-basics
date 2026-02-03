// packages/rpcserver/src/server.ts
import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const schema = z.object({
  title: z.string(),
  body: z.string(),
})git 

const route = new Hono()
    .post(
        '/posts',
        zValidator('form', schema),
        async (c) => {
            const data = await c.req.parseBody()
            return c.json({ ok: true, message: `Created!`, data }, 201);
        }
    )

export type AppType = typeof route
