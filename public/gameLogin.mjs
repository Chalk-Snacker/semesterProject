"use strict";
import { loadGame } from "./game.mjs";

const testPlayer = {
  playerEmail: "testMail",
  playerPsw: "testPassWrD21132",
  playerNick: "testPlayer",
};
const testPlayerUpdated = {
  playerEmail: "testMailTest",
  playerPsw: "testPassWrD21132Test",
  playerNick: "Player1",
};

// const testPlayer2 = {
//   playerEmail: "testMail2",
//   playerPsw: "testPassWrD21132",
//   playerNick: "testPlayer2",
// };

export function main() {
  // bytte navn fra main til login, og flytte kode fra loginUser til hit??
  loginUser();

  // deleteUser("testPlayer");
  console.log(document.getElementsByTagName("*").length);
}

function loginUser() {
  // UI for pålogging:
  // bruk html templates

  // login:
  const formContainer = document.getElementById("containerGameplayZone");
  const userForm = document.createElement("form");

  const usernameLabel = document.createElement("label");
  usernameLabel.classList.add("registerUserLabel");
  usernameLabel.innerText = "Character name";
  const username = document.createElement("input");
  username.classList.add("registerUser");
  username.setAttribute("type", "text");
  username.setAttribute("name", "username");
  username.setAttribute("id", "textField0");

  const passwordLabel = document.createElement("label");
  passwordLabel.classList.add("registerUserLabel");
  passwordLabel.innerText = "Password";
  const password = document.createElement("input");
  password.classList.add("registerUser");
  password.setAttribute("type", "password");
  password.setAttribute("name", "password");
  password.setAttribute("id", "textField1");

  const loginButton = document.createElement("button");
  loginButton.innerText = "Login";
  loginButton.addEventListener("click", function (event) {
    // loadGame(); // kommentert ut for testing
    correctLogin();
    event.preventDefault();
  });

  const createNewUserButton = document.createElement("button");
  createNewUserButton.innerText = "Create new user";
  createNewUserButton.addEventListener("click", function (event) {
    createUserUi();
    event.preventDefault();
  });

  userForm.appendChild(usernameLabel);
  userForm.appendChild(username);
  userForm.appendChild(document.createElement("br"));
  userForm.appendChild(document.createElement("br"));
  userForm.appendChild(passwordLabel);
  userForm.appendChild(password);
  userForm.appendChild(document.createElement("br"));
  userForm.appendChild(document.createElement("br"));
  userForm.appendChild(loginButton);
  userForm.appendChild(document.createElement("br"));
  userForm.appendChild(document.createElement("br"));
  userForm.appendChild(createNewUserButton);
  userForm.appendChild(document.createElement("br"));
  userForm.appendChild(document.createElement("br"));

  formContainer.appendChild(userForm);
  // loadGame();
}

function createUserUi() {
  const formContainer = document.getElementById("containerGameplayZone");
  const userForm = document.createElement("form");

  const userEmailLabel = document.createElement("label");
  userEmailLabel.classList.add("registerUserLabel");
  userEmailLabel.innerText = "Email";
  const userEmail = document.createElement("input");
  userEmail.classList.add("registerUser");
  userEmail.setAttribute("type", "email");
  userEmail.setAttribute("name", "email");
  userEmail.setAttribute("id", "textField2");

  const usernameLabel = document.createElement("label");
  usernameLabel.classList.add("registerUserLabel");
  usernameLabel.innerText = "Character name";
  const username = document.createElement("input");
  username.classList.add("registerUser");
  username.setAttribute("type", "text");
  username.setAttribute("name", "username");
  username.setAttribute("id", "textField3");

  const passwordLabel = document.createElement("label");
  passwordLabel.classList.add("registerUserLabel");
  passwordLabel.innerText = "Password";
  const password = document.createElement("input");
  password.classList.add("registerUser");
  password.setAttribute("type", "password");
  password.setAttribute("name", "password");
  password.setAttribute("id", "textField4");

  const submitButton = document.createElement("button");
  submitButton.innerText = "Create user";
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    createUser();

    userEmail.value = "";
    username.value = "";
    password.value = "";
  });

  userForm.appendChild(userEmailLabel);
  userForm.appendChild(userEmail);
  userForm.appendChild(document.createElement("br"));
  userForm.appendChild(document.createElement("br"));
  userForm.appendChild(usernameLabel);
  userForm.appendChild(username);
  userForm.appendChild(document.createElement("br"));
  userForm.appendChild(document.createElement("br"));
  userForm.appendChild(passwordLabel);
  userForm.appendChild(password);
  userForm.appendChild(document.createElement("br"));
  userForm.appendChild(document.createElement("br"));
  userForm.appendChild(submitButton);

  formContainer.appendChild(userForm);

  /* change the createUser function so that 
     the it takes the information from the input fields.
  */

  // const formData = new FormData(userForm);
  // const register = await createUser();
}

// TESTING STATIC OBJECT
// async function testCreateUser(aPlayer) {
//   let requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(aPlayer),
//   };
//   try {
//     let response = await fetch("http://localhost:8080/user", requestOptions);
//     if (response.status != 201) {
//       console.log(response.status);
//       console.log("Error creating user");
//       throw new Error("Server error: " + response.status);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

async function createUser() {
  const userEmailInput = document.getElementById("textField2");
  const passwordInput = document.getElementById("textField4");
  const usernameInput = document.getElementById("textField3");

  const user = {
    // rename til newEmail ++ ?
    playerEmail: userEmailInput.value,
    playerPsw: passwordInput.value,
    playerNick: usernameInput.value,
  };

  let requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };
  try {
    let response = await fetch("http://localhost:8080/user", requestOptions);

    if (response.status != 201) {
      console.log(response.status);
      console.log("Error creating user");
      throw new Error("Server error: " + response.status);
    }
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(playerName) {
  let requestOptions = {
    method: "DELETE",
  };
  try {
    let response = await fetch(`http://localhost:8080/user/${playerName}`, requestOptions);
    if (response.status != 200) {
      console.log("Error deleting user");
      throw new Error("Server error: " + response.status);
    }
  } catch (error) {
    console.log(error);
  }
}

async function editUser(playerName) {
  let requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(testPlayerUpdated),
  };
  try {
    let response = await fetch(`http://localhost:8080/user/${playerName}`, requestOptions);
    if (response.status != 200) {
      console.log("Error editing user");
      throw new Error("Server error: " + response.status);
    }
  } catch (error) {
    console.log(error);
  }
}

async function correctLogin() {
  const usernameInput = document.getElementById("textField0");
  const passwordInput = document.getElementById("textField1");

  let userData = {
    nick: usernameInput.value,
    password: passwordInput.value,
  };

  let requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
    credentials: "include",
  };
  try {
    let response = await fetch("http://localhost:8080/user/login", requestOptions);
    if (response.status != 201 || response.status != 200) {
      console.log("Error getting stuff!");
      throw new Error("Server error: " + response.status);
    }
    // let data = await response.json();
    // return data;
  } catch (error) {
    console.log(error);
  }
}

/*
--------------------------------------- TO DO: ---------------------------------------
1. sett inn spillernavn + lvl
2. bytte "game" i filnavn til hva du skal kalle spillet
3. lag middleware for auth som kan brukes til innlogging
4. lage middleware for å lage starting items + skills?


--------------------------------------- Game fixes: ---------------------------------------
1. fix the idle and inventory functions, they are a mess with variables that have horrible names, aka fix 
  the css hidden toggle stuff so its not ass
3. husk å gjøre alt til const, og heller let om du får feilmelding
4. make the category buttons smaller and the gameplay area bigger
5. make the layout responsive
6. hvis du begynner å farme eks. woodcutting og går til inventory farmer den fortsatt // lag en egen funksjon for å stoppe farming
   så du ikke trenger å ha 100 linjer hvergang det må stoppes, og kall på den når du bytter skill å grinde eller vindu
7. siden det er max antall lvl i threshHold, sette en condition slik at den ikke prøver å lvl videre...
8. når du lukker spillet spillet og åpner det igjen husker den lvl, men xp bar er resatt..
9. flytt alt html fra js inn i egne html templates og toggle de istedenfor  (fjern toggle css (er da undøvendig))
*/
