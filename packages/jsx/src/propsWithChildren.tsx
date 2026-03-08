// propsWithChildren.tsx
import { Hono } from 'hono'

const Card = ({ title, children }) => {
    return (
        <div className="card">
            <h2>{title}</h2>
            <div className="card-content">{children}</div>
        </div>
    );
};

const app = new Hono()
    // Using middleware by app.use() to set a custom renderer for all routes
    .use('*', async (c, next) => {
        // cはContextオブジェクト
        // https://hono.dev/docs/api/context
        c.setRenderer((content) => {
            return c.html(
                <html>
                    <head></head>
                    <body>{content}</body>
                </html>
            )
        })
        await next()
    })
    .get('/card', (c) => {
        return c.render(
            <>
                <title>Props with children</title>
                <Card title="Welcome!">
                    <p>This is the content inside the card.</p>
                </Card>
            </>
        )
    })

export default app
