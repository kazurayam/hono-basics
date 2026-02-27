import { Hono } from 'hono'

// HonoOptions.getPath can handle the host header value.
const app = new Hono({
    getPath: (req) => {
        let newPath = '/' + req.headers.get('host') + req.url.replace(/^https?:\/\/[^\/]+(\/[^?]*)/, '$1')
        if (req.headers.get('host') === null) {
            newPath = '/' + 'localhost' + req.url.replace(/^https?:\/\/[^\/]+(\/[^?]*)/, '$1')
        }
        // console.log('getPath returns ', newPath)
        return newPath
    }
})

app.get('/www1.example.com/hello', (c) => c.text('www1 hello'))
app.get('/www2.example.com/hello', (c) => c.text('www2 hello'))
app.get('/localhost/hello', (c) => c.text('localhost hello'))

export default app
