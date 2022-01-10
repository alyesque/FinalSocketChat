const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const router = require("./router");
const PORT = process.env.PORT || 4000;
let rooms = {};

io.on("connection", (socket) => {
  //create and join room //
  socket.on("create", function (room, name) {
    // join created room //
    socket.join(room);

    //determine if room already exists,
    // if it does then add user to user list
    //if it doesn't then create user list for room
    if (rooms.hasOwnProperty(room)) {
      rooms[room].push(name);
    } else {
      rooms[room] = [];
      rooms[room].push(name);
    }

    //broadcast new user joined

    socket.broadcast.to(room).emit("message", {
      name: "[adminBot]",
      mes: name + " has connected to room" + " " + room,
    });

    // handle disconnect

    socket.on("disconnect", (reason) => {
      //announce the disconnect as a message

      io.to(room).emit("message", {
        name: "[adminBot]",
        mes: name + " has disconnected from this room",
      });
      io.to(room).emit("disco", { name: name });

      //modify users list for room by removing disconnected user//
      let newArray = rooms[room].filter(function (e) {
        return e != name;
      });
      rooms[room] = newArray;

      // delete room if last user disconnects

      if ((room[room] = [])) {
        delete room[room];
      }

      //emit the current state of the user list

      io.to(room).emit("list", rooms[room]);
    });

    //emit the current state of the list every time a user connects

    io.to(room).emit("list", rooms[room]);
  });

  // handle messages //

  socket.on("message", ({ name, mes, room }) => {
    io.to(room).emit("message", { name, mes });
  });
});

app.use(router);

http.listen(PORT, function () {
  console.log("listening on port " + PORT);
});
