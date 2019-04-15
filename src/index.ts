// import { A } from "./test";

// console.log("ОПА Ф5 И ТВОЯ МАТЬ");
// const a = new A();
// a.init();
import * as express from 'express';
import * as socketio from 'socket.io';
const path = require('path')

const app = express();
app.set("port", process.env.PORT || 3000);

let http = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
let io = socketio(http);

app.get("/", (req:any, res:any) => {
    // console.log(path.resolve("index.html"));
  res.sendFile(path.resolve("index.html"));
});

var players = {};

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on("connection", (socket)=> {
    console.log("a user connected");
    // console.log(socket);
    players[socket.id] = {
      rotation: 0,
      x: Math.floor(Math.random() * 700) + 50,
      y: Math.floor(Math.random() * 500) + 50,
      playerId: socket.id,
      team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue'
    };

    socket.on("message", (message)=> {
      console.log(message);
      // echo the message back down the
      // websocket connection
    //   socket.emit("message", message);
    if(message && message.msg === "start"){
      socket.emit("message", {msg:'СТАРТ ИГРЫ'});
    }
    });

    // let time = 0;
    // setInterval(() => {
    //     let data = new Date().toString();
    //     socket.emit("message", data);
    // }, 1000);
    // socket.emit("message", 'ИДИ НА!!!');

    // send the players object to the new player
    socket.emit('currentPlayers', players);
    // update all other players of the new player
    socket.broadcast.emit('newPlayer', players[socket.id]);
 
    // when a player disconnects, remove them from our players object
    socket.on('disconnect', function () {
      console.log('user disconnected');
      // remove this player from our players object
      delete players[socket.id];
      // emit a message to all players to remove this player
      io.emit('disconnect', socket.id);
    });
    
});

const server = http.listen(3000,'192.168.1.102', ()=> {
  console.log("listening on *:3000");
});