const express = require('express');
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

let connections = [];


// connection established
io.on('connect', (socket)=> {
    connections.push(socket);
    console.log(`${socket.id} has connected`);
    // console.log(connections);
    // event draw when connection is on
    socket.on('draw', (data)=>{
        connections.forEach((con) => {
            if(con.id !== socket.id){
                con.emit('ondraw', {x: data.x,y: data.y,c :data.c})
            }
        });
    })

    // event down when connection is on
    socket.on('down', (data)=>{
        connections.forEach((con)=>{
            if(con.id !== socket.id){
                con.emit('ondown', {x: data.x, y: data.y})
            }
        })
    })

    // when socket connection gets disconnected
    socket.on('disconnect', (reason) => {
        console.log(`${socket.id} got disconnected`)
        // console.log(connections);
        connections = connections.filter((con)=> con.id !== socket.id); 
    });
});



app.use(express.static('public'));
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, ()=> console.log('server started'))