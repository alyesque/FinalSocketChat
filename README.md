A personal project that uses React and a basic Express server to offer simple websocket-based live chats.

This application uses socket.io to create an event-driven Express server and uses React hooks to render messages on the front end. It also supports the ceration of individual chat rooms which users can join or create upon login.

<strong> Stack: React, Node, Express, Socket.io </strong>

Features:

1. Basic login support that allows a user to select a temporary username as well as specify the room they would like to join. If the room does not exist the server will create it, and if it does exist the server will add the user to the room. 
<p align="center">
<img src='https://i.imgur.com/1I3uWCo.png' alt='login form' width='600'>
  </p>

2. Basic chat functionality whithin rooms to allow users to send messages to each other. Users are informed when other users join and disconnect, and a list of current users is dynamically rendered on the right hand side of the chat panel.

<p align="center">
<img src='https://i.imgur.com/291VUBN.png' alt='empty chat' width='600'>
<img src='https://i.imgur.com/paE3WFf.png' alt='example chat' width='600'>
                                                             </p>
                                                           
