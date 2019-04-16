import { Game } from "./game/Game";
import * as express from "express";
import * as socketio from "socket.io";
const path = require("path");

const app = express();
app.set("port", process.env.PORT || 3000);

let http = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
let io = socketio(http);
app.get("/", (req: any, res: any) => {
    // console.log(path.resolve("index.html"));
    res.sendFile(path.resolve("index.html"));
});

const game = new Game();
game.init();

// const FRAME_RATE = 1000.0 / 30.0;

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on("connection", socket => {
    console.log("a user connected");

    game.addNewPlayer(socket);

    socket.on("message", message => {
        console.log(message);
        // echo the message back down the
        // websocket connection
        //   socket.emit("message", message);
        if (message && message.msg === "start") {
            socket.emit("message", { msg: "СТАРТ ИГРЫ" });
        }
    });

    // send the players object to the new player
    // socket.emit('currentPlayers', players);
    // update all other players of the new player
    // socket.broadcast.emit('newPlayer', players[socket.id]);
    // when a player disconnects, remove them from our players object
    socket.on("disconnect", function() {
        console.log("user disconnected");
        // remove this player from our players object
        // delete players[socket.id];
        // emit a message to all players to remove this player
        io.emit("disconnect", socket.id);
    });
});

const server = http.listen(3000, "192.168.1.102", () => {
    console.log("listening on *:3000");
});

// setInterval(()=> {
//     game.update();
//     // game.sendState();
// }, FRAME_RATE);
