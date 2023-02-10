const express = require("express")
const redis = require("redis")

const app = express()
const port = process.env.PORT || 3000

const isProduction = process.env?.PROD !== undefined
const redisClient = redis.createClient({
    url: isProduction ? 'redis://redis:6379' : 'redis://localhost:6379'
})

redisClient.on('error', err => console.log('Redis Client Error', err))
redisClient.connect().catch(err => console.log('Redis Connect Error', err))

app.get('/', (_, res) => res.send("Hello!"))

app.get('/key/:key', async (req, res) => {
    const { key } = req.params; 
    res.send(await redisClient.get(key))
})

app.post('/key/:key/value/:value', async (req, res) => {
    const { key, value } = req.params;
    await redisClient.set(key, value)
    res.send('Ok')
})

app.listen(port, () => {
    console.log('Running at port: ' + port)
})

// docker run -p 6379:6379 -it redis/redis-stack-server:latest
// docker build -t docker-network-example-api-node-js .
// docker run -d -e PORT=6000 -p 3001:6000 --name api-network docker-network-example-api-node-js