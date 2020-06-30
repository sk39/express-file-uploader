import express from 'express'
import api from './routes/api'
import path from "path"

const app: express.Express = express()
global["appRoot"] = path.resolve(__dirname);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, access_token'
    )
    next()
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', api)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`File upload server listening on port ${port}!`)
})


