<p align="center">
<img src='https://i.imgur.com/gBd2ZQN.png' alt='login form' width='500'>
  </p>

<h1> Overview: </h1>

A personal project that uses React and a basic Express server to offer simple websocket-based live chats.

This application uses socket.io to create an event-driven Express server and uses React hooks to render messages on the front end. It also supports the ceration of individual chat rooms which users can join or create upon login.

<h1>Technologies</h1>

<ul>
  <li> HTML5
  <li> CSS
  <li> Javascript(ES6)
  <li> React
  <li> Node.js
  <li> Express
  <li> Socket.io
  <li> Git
  <li> Github 
</ul>

<h1> Approach Taken: </h1>

This was my first time working with websockets, and this project was really about learning to get comfortable with them. I began by building a simple Node server alongside a simple React front end. I first worked on establishing the ability to send messages which went very quickly thanks to Socket.io's fantastic documentation. I next integrated the ability to enter a username and for messages to be sent with that username, alongside notifications when users connected or disconnected. Finally I turned towards establishing infrastructure for separate rooms. While Socket.io does a great job of allowing room creation, its a bit trickier to manage data that passes within a single room. This ended up requiring some complicated server-side code, but was doable.

The main goal throughout this project was to create a simple and quick live-chat app which did not require registration, but which enabled some basic privacy on the basis of room creation. The final project meets those criteria. 

<h1> What I Learned: </h1>

This was my first time really diving into building NODE infrastructure that wasn't oriented around CRUD API capabilities. This project taught me a lot about how to write concise event driven server-code that focuses on getting results quickly without complicating the transfer of data. In the future I would like to add some more complex data handling, such as allowing users to share images, which would require more state management that would be emitted from the server. This project also challenged me by forcing me to think about how state can differ on two different clients connected to the same server. This required much more abstract thinking about state as well as figuring out how to pass state data to the server and then emit it to all connected clients. 


<h1>Features:</h1>

1. Basic login support that allows a user to select a temporary username as well as specify the room they would like to join. If the room does not exist the server will create it, and if it does exist the server will add the user to the room. 
<p align="center">
<img src='https://i.imgur.com/1I3uWCo.png' alt='login form' width='600'>
  </p>

2. Basic chat functionality whithin rooms to allow users to send messages to each other. Users are informed when other users join and disconnect, and a list of current users is dynamically rendered on the right hand side of the chat panel.

<p align="center">
<img src='https://i.imgur.com/291VUBN.png' alt='empty chat' width='600'>
<img src='https://i.imgur.com/paE3WFf.png' alt='example chat' width='600'>
                                                             </p>
                                                           
