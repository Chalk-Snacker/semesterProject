import express from "express";
import USER_API from "./routes/usersRoute.mjs";
import GAME_API from "./routes/gameRoute.mjs";

const server = express();
const port = process.env.PORT || 8080;
server.set("port", port);

server.use(express.static("public"));

server.use("/user", USER_API);
server.use("/game", GAME_API);

server.get("/", (req, res, next) => {
  res
    .status(200)
    .send(JSON.stringify({ msg: "These are not the droids...." }))
    .end();
});

server.listen(server.get("port"), function () {
  console.log("server running", server.get("port"));
});

server.on("error", (err) => {
  console.error("Server error:", err);
});
