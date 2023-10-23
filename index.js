const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    // console.log('a user connected', socket.id);

    socket.on('join_room', (data) => {
        console.log("joining a room", data.roomid)
        socket.join(data.roomid);
    });

    socket.on('msg_send', (data) => {
        console.log(data);
        // io.emit('msg_rcvd', data);
        // socket.emit('msg_rcvd', data)
        // socket.broadcast.emit('msg_rcvd', data)

        io.to(data.roomid).emit('msg_rcvd', data);
    });
});

app.use('/', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.get('/chat/:roomid', async (req, res) => {
   
    res.render('index', {
        name: 'Sanket',
        id: req.params.roomid,
    });
});

server.listen(3000, () => {
    console.log('Server started');
});