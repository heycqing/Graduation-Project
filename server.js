const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')


const dev = process.env.NODE_ENV !== 'production'
console.log('dev',dev)

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = new Koa()
  const router = new Router()
  
  // server.get('/post/:id', (req, res) => {
  // 	const actualPage = '/post'
  // 	const queryParams = { title: req.params.id } 
  // 	app.render(req, res, actualPage, queryParams)
  // })
  // server.get('*', (req, res) => {
  //   return handle(req, res)
  // })
  
  router.get('/api/aaaccc', async ctx => {

    // const result = {
    //   userName:ctx.req.query.split('=')[1]
    // }
    // console.log(result)
    // const queryParams = ctx.req
    ctx.body = '{code:0,data:{msg:"用户名错误"}}'
  })

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })
  

  server.use(router.routes())

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
