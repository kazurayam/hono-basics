import type { AppType } from '@kazurayam/hono-basics-rpcserver'
import { hc } from 'hono/client'

const client = hc<AppType>('http://localhost:8787/')

const res = await client.posts.$post({
  form: {
    title: 'Hello',
    body: 'Hono is a cool project',
  },
})

if (res.ok) {
  const data = await res.json()
  console.log(data.message)
}
