import * as socketio from "socket.io";
import { Iterable } from "./Iterable";
/**
 *  Какой то общий класс, возможно связующее звено, межде элементами
 */
export class Game implements Iterable {
    // private players: socketio.Socket[];
    constructor() {}
    public init() {
        //
        // this.players = [];
    }
    public addNewPlayer(socket: socketio.Socket) {
        // this.players.push(socket);
    }
    public update() {
        //
    }

    public sendState() {
        // for (var i = 0; i < this.players.length; ++i) {
        //     // this.players[i].update();
        //     this.players[i].emit("update", { abc: Math.random() });
        // }
        // currentClient.socket.emit('update', {abc: Math.random()});
    }
}
