import express from "express";
import User from "../modules/user.mjs";

const USER_API = express.Router();

export const users = [];
// a default user that doesnt save progress
const guestUser = new User();
guestUser.nick = "Guest";
users.push(guestUser);

USER_API.get("/:id", (req, res) => {
  // Return user object
});

// dont need next for now
USER_API.post("/", (req, res) => {
  // create user
  // give the user an id?
  // TO DO:
  // check if username etc is already taken
  // dont store password
  try {
    const userData = req.body;
    const user = new User();
    user.email = userData.playerEmail;
    user.pswHash = userData.playerPsw;
    user.nick = userData.playerNick;
    users.push(user);
    res.status(201).json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
  console.log("Total users: ", users.length);
  console.log(users);
});

USER_API.put("/:id", (req, res) => {
  // edit user
  // add an id or edit user with username?

  const userId = req.params.playerNick;
  const updatedUserData = req.body;

  const userIndex = users.findIndex((user) => user.playerNick === userId);
  if (userIndex !== -1) {
    for (const key in updatedUserData) {
      if (updatedUserData.hasOwnProperty(key)) {
        users[userIndex].email = updatedUserData.playerEmail;
        users[userIndex].pswHash = updatedUserData.playerPsw;
        users[userIndex].nick = updatedUserData.playerNick;
      }
    }

    res.status(200).json({ success: true, message: " User deleted" });
  } else {
    res.status(404).json({ success: false, error: " User not found" });
  }
  console.log("REAL CONSOLE.LOG", users);
});

USER_API.delete("/:id", (req, res) => {
  // delete user
  // add an id or delete with username?
  const userId = req.params.playerNick;

  const userIndex = users.findIndex((user) => user.playerNick === userId);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(200).json({ success: true, message: " User deleted" });
  } else {
    res.status(404).json({ success: false, error: " User not found" });
  }
  console.log("REAL CONSOLE.LOG", users);
});

export default USER_API;
