import React, { createRef, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "./App.css";

export default function Test() {
  const [chat, setChat] = useState([]);
  const [name, setName] = useState(undefined);
  const [roomname, setRoomname] = useState("");
  const [users, setUsers] = useState([]);
  let usersArray = [];
  let room = "";
  const text = createRef();
  const nameInput = createRef();
  const socketRef = useRef();
  const anchorRef = useRef(null);
  const roomRef = createRef();
  const executeScroll = () => anchorRef.current.scrollIntoView();
  let ENDPOINT = "http://localhost:4000";

  //establish connection to socket//

  useEffect(() => {
    //connect to the server//
    socketRef.current = io.connect(ENDPOINT);

    //recieve messages and update chat state//
    socketRef.current.on("message", ({ name, mes, room }) => {
      setChat((chat) => [...chat, { name, mes, room }]);
    });

    //recieve user list and update users state

    socketRef.current.on("list", (message) => {
      setUsers(message);
    });

    return () => socketRef.current.disconnect();
  }, []);

  // keeps chat scrolled to bottom //
  useEffect(() => {
    setTimeout(() => {
      executeScroll();
    }, 200);
  }, [chat]);

  //emit message on send //

  const emitMessage = (e) => {
    e.preventDefault();
    socketRef.current.emit("message", {
      name: name,
      mes: text.current.value,
      room: roomname,
    });
    text.current.value = "";
  };

  // accept username input

  const newName = (e) => {
    e.preventDefault();
    setName(nameInput.current.value);
    room = roomRef.current.value;
    socketRef.current.emit("create", room, nameInput.current.value);
    socketRef.current.emit("new user", room, nameInput.current.value);
    setUsers((users) => [...users, nameInput.current.value]);
    usersArray.push(nameInput.current.value);
    setRoomname(room);
  };

  function renderUsers() {
    return users.map((user, index) => (
      <div key={index} className="indivUser">
        {user}{" "}
      </div>
    ));
  }

  return (
    <div className="main">
      {name === undefined && (
        <form className="login" onSubmit={(e) => newName(e)}>
          Enter a Username:
          <input ref={nameInput}></input>
          Enter Room Name:
          <input ref={roomRef}></input>
          <button>Select</button>
        </form>
      )}
      {name !== undefined && (
        <div className="subMain">
          <div className="app">
            <div className="username">
              <div>
                <span className="bold">Username</span>: {name}
              </div>
              <div>
                <span className="bold">Room</span>: {roomname}
              </div>
            </div>
            <div className="chatbox">
              {chat.map((indivMes, index) => {
                if (indivMes.name !== name) {
                  return (
                    <div className="message" key={index}>
                      <span className="bold">{indivMes.name}: </span>{" "}
                      {indivMes.mes}
                    </div>
                  );
                } else {
                  return (
                    <div className="messageMine" key={index}>
                      <span className="bold">{indivMes.name}: </span>{" "}
                      {indivMes.mes}
                    </div>
                  );
                }
              })}
              <div id="anchor" ref={anchorRef}></div>
            </div>
            <form className="inputbox" onSubmit={(e) => emitMessage(e)}>
              <input
                className="maininput"
                ref={text}
                placeholder="message..."
              />
              <button>Send</button>
            </form>
          </div>
          <div className="users">
            {" "}
            <div className="userHead">
              <span className="bold">Active Users:</span>
            </div>{" "}
            <div className="userflex">{renderUsers()} </div>
          </div>
        </div>
      )}
    </div>
  );
}
