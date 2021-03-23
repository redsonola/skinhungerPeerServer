//hello, world
//https://myhsts.org/tutorial-develop-advance-webcam-site-using-peerjs-and-peerserver-with-express-js.php

const express = require('express')
const app = express()
const port = 9000
var server = app.listen(process.env.PORT || 9000, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
var ExpressPeerServer = require("peer").ExpressPeerServer(server); 
app.use("/signaling", ExpressPeerServer);
var connected_users = [];
var random_pool = []; 
ExpressPeerServer.on("connection", function(id){ var idx = connected_users.indexOf(id);
    if(idx === -1) //only add id if it's not in the array yet
    {
        connected_users.push(id);
    }
});

ExpressPeerServer.on("disconnect", function(id){ var idx = connected_users.indexOf(id);
    if(idx !== -1)
    {
        connected_users.splice(idx, 1);
    }

    idx = waiting_peers.indexOf(id); if(idx !== -1)
    {
        waiting_peers.splice(idx, 1);
    }
});

//getting a random chat partner
var waiting_peers = [];
app.get("/find", function(httpRequest, httpResponse, next)
{ 
    console.log("received find request: " + httpRequest.query.id);
    var id = httpRequest.query.id; 
    // if(connected_users.indexOf(id) !== -1)
    // {
        var idx = waiting_peers.indexOf(id); 
        if(idx === -1)
        {
            waiting_peers.push(id);
        }

        if(waiting_peers.length > 1)
        {
            waiting_peers.splice(idx, 1);
            var user_found = waiting_peers[0]; 
            waiting_peers.splice(0, 1); 
            httpResponse.send(user_found);
        }
        else
        {
            httpResponse.status(404).send("Not found");
        }
   // }
    // else
    // {
    //     httpResponse.status(404).send("Not found");
    // }
});
