const express = require("express")

const app = express()
const port = process.env.PORT || 3000

app.get('/', (_, res) => res.send("Hello!"))

app.listen(port, () => {
    console.log('Running at port: ' + port)
})

// docker build -t docker-network-example-api-node-js .
// docker run -d -e PORT=6000 -p 3001:6000 --name api-network docker-network-example-api-node-js