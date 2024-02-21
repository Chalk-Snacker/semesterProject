import express from "express";
import User from "../modules/user.mjs";
import DBmanager from "../modules/storageManager.mjs";
import "dotenv/config";
// import client from "../server.mjs";

const USER_API = express.Router();
USER_API.use(express.json());

export const users = [];
// a default user that doesnt save progress
// const guestUser = new User();
// guestUser.nick = "Guest";
// users.push(guestUser);

USER_API.get("/:", (req, res) => {
  // Return user object
});

// dont need next for now
USER_API.post("/", async (req, res) => {
  // create user
  // give the user an id?
  // TO DO:
  // check if username etc is already taken
  // dont store password

  // ----------- gammelt ------------

  // try {
  //   // await client.connect();
  //   const userData = req.body;
  //   const user = new User();
  //   user.email = userData.playerEmail;
  //   user.pswHash = userData.playerPsw;
  //   user.nick = userData.playerNick;
  //   users.push(user);
  //   res.status(201).json({ success: true, message: "User created successfully" });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ success: false, error: "Internal server error" });
  // }
  // console.log("Total users: ", users.length);
  // console.log(users);

  // ----------- nytt ----------
  // const { name, email, password } = req.body;
  const userData = req.body;

  if (userData.playerNick != "" && userData.playerEmail != "" && userData.playerPsw != "") {
    let user = new User();
    ///TODO: Do not save passwords.

    user.nick = userData.playerNick;
    user.email = userData.playerEmail;
    user.pswHash = userData.playerPsw;
    ///TODO: Does the user exist?
    let exists = false;

    if (!exists) {
      //TODO: What happens if this fails?
      user = await user.save();
      console.log("asdf");
      res.status(201).json(JSON.stringify(user)).end();
    } else {
      console.log("fdsa");
      res.status(400).end();
    }
  } else {
    res.status(400).send("Mangler data felt").end();
  }
});

USER_API.post("/login", async (req, res) => {
  const userData = req.body;
  // console.log("LKADSHFKJASBHDFØKLAJNFGKLJBASDLKFJHASFGJLHABDJKFHASKDLJFHAKSJLDHFKJLASHDFKJLH", userData);

  try {
    const user = await DBmanager.loginAuthUser(userData.nick, userData.password);

    if (user !== undefined) {
      // User exists and password is correct
      // res.status(200).json({ success: true, message: "Login successful", user: user });
      //const token = jsonwebtoken.sign({ userId: user.id, username: user.nick }, process.env.TOKEN_SECRET); // add expiration? {expiresIn:"1h"}
      //res.json({ token: token });
      // res.status(200).json({ success: true, message: "Login successful", user: user.id });
      res.json({ userId: user.id });

      console.log("Meine Mama hat einfach erlaubt dass ich cola trinken darf! Wie cool ist dass bitte? Ich zocke fortnite..und trinke cola! YIPEEEEEE!");
    } else {
      // User does not exist or password is incorrect
      res.status(401).json({ success: false, error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
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
