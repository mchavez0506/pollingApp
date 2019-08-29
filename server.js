const express = require("express");
const _ = require("underscore");
const app = express();
const PORT = 8082;
const server = require("http").createServer(app);

const socketIO = require("socket.io");
const connections = [];
let title = "Untitled Presentation";
const audience = [];
let speaker = {};
const questions = require("./questions");
let currentQuestion = false;
let results = {
  a: 0,
  b: 0,
  c: 0,
  d: 0
};

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
    } else if (this.id === speaker.id) {
      console.log(
        `Speaker ${speaker.name} has left the building... ${title} is over`
      );
      speaker = {};
      title = "Untitled Presentation";
      io.sockets.emit("end", { speaker: "", title: title });
    }

    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    console.log("disconnected: %s sockets remaining", connections.length);
  });

  socket.on("join", function(payload) {
    const newMember = {
      id: this.id,
      name: payload.name,
      type: "audience"
    };
  
    this.emit("joined", newMember);
    audience.push(newMember);
    io.sockets.emit("audience", audience);
    console.log(`Audience Joined: ${payload.name}`);
  });

  socket.on("start", function(payload) {
    speaker.name = payload.name;
    speaker.id = this.id;
    speaker.type = "speaker";
    title = payload.title;
    this.emit("joined", speaker);
    io.sockets.emit("start", { title: title, speaker: speaker.name });
    console.log(`Presentation started: ${payload.title} by: ${payload.name}`);
  });

  socket.on("ask", function(question) {
    currentQuestion = question;
    results = {
      a: 0,
      b: 0,
      c: 0,
      d: 0
    };
    io.sockets.emit("ask", currentQuestion);
    console.log(`Current question : ${question.q}`);
  });

  socket.on("answer", function(payload) {
    results[payload.choice]++;
    io.sockets.emit("results", results)
    console.log(` Answer: ${JSON.stringify(results)}`);
  });

  socket.emit("welcome", {
    title: title,
    audience: audience,
    speaker: speaker.name,
    questions: questions,
    currentQuestion: currentQuestion,
    results:results
  });

  connections.push(socket);
  console.log("Connected: %s sockets connected", connections.length);
});
