const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router');
const api = require('./api.router');
const SETTINGS = require('../settings');
const port = SETTINGS.defaultPort || process.env.PORT;

const app = new Koa()
    .use(requestLogger)
    .use(bodyParser())
    .use(api.routes())
    .use(api.allowedMethods());

async function requestLogger(ctx, next) {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
}

app.listen(port, error => {
    if (error) {
        console.error(error);
    } else {
        console.info(`The server is running on port: ${port}`);
    }
});