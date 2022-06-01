var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io')(server, {cors: {origin: '*'}})

var path = require('path')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var cors = require('cors')
server.listen(5000, () => console.log("Server läuft auf port 5000"))

//App uses

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(cookieParser('awdwda'))
app.use("/public", express.static(path.join(__dirname, '/html/public')));
app.use(bodyParser())
app.use(cors());
app.engine('html', require('ejs').renderFile);


app.get('/', (req, res) => {
 res.sendFile(__dirname + '/html/index.html')
})

io.on("connection", (socket) => {
    console.log("User connected" + socket.id)

    socket.on("message", (data) => {
       socket.broadcast.emit("message", data)
    })
    
})