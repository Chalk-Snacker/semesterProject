import express from "express";
import USER_API from "./routes/usersRoute.mjs";
import GAME_API from "./routes/gameRoute.mjs";

// Creating an instance of the server
const server = express();
// Selecting a port for the server to use.
const port = process.env.PORT || 8080;
server.set("port", port);

// Defining a folder that will contain static files.
// server.use(express.json()); // flyttet til usersRoute.mjs
server.use(express.static("public"));

server.use("/user", USER_API); // Telling the server to use the USER_API (all urls that uses this code will have to have the /user after the base address)
server.use("/game", GAME_API);

// A get request handler example)
server.get("/", (req, res, next) => {
  res
    .status(200)
    .send(JSON.stringify({ msg: "These are not the droids...." }))
    .end();
});

// Start the server
server.listen(server.get("port"), function () {
  console.log("server running", server.get("port"));
});

server.on("error", (err) => {
  console.error("Server error:", err);
});
