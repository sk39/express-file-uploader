import express from 'express'
import api from './routes/api'
import path from "path"

const app: express.Express = express()
global["appRoot"] = path.resolve(__dirname);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', api)

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})
