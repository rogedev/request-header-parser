const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/public", express.static(__dirname + "/public"))

const PORT = process.env.PORT || 3030

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"))

app.get("/api/whoami", (req, res) => {
  const response = {
    ipaddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    language: req.get("accept-language"),
    software: req.get("user-agent"),
  }
  res.status(200).send(response)
})
