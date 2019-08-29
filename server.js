const express = require("express");
const _ = require("underscore");
const app = express();
const PORT = 8082;
const server = require("http").createServer(app);

const socketIO = require("socket.io");
const connections = [];
let title = "Untitled Presentation";
const audience = [];
const speaker = {};

app.use(express.static("./public"));
app.use(express.static("./node_modules/bootstrap/dist"));

const io = socketIO(server);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

io.sockets.on("connection", socket => {
  socket.once("disconnect", function() {
    const member = _.findWhere(audience, { id: this.id });
    if (member) {
      audience.splice(audience.indexOf(member), 1);
      io.sockets.emit("audience", audience);
      console.log(`left: ${member.name} audience members: ${audience.length}`);
    }
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    console.log("disconnected: %s sockets remaining", connections.length);
  });

  socket.on("join", function(payload) {
    const newMember = {
      id: this.id,
      name: payload.name,
      type: "member"
    };
    this.emit("joined", newMember);
    audience.push(newMember);
    io.sockets.emit("audience", audience);
    console.log(`Audience Joined: ${payload.name}`);
  });

  socket.on("start", function(payload) {
    speaker.name = payload.name;
    speaker.id = this.id;
    speaker.type = "speaker"
    title = payload.title
    this.emit("joined", speaker)
    console.log(`Presentation started: ${payload.title} by: ${payload.name}`)
  });

  socket.emit("welcome", {
    title: title,
    audience:audience,
    speaker: speaker.name
  });

  connections.push(socket);
  console.log("Connected: %s sockets connected", connections.length);
});
