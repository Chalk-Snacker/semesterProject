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
  // lage all ui her og bruke css funksjoner for å toggle mellom login page og create user?

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
  username.setAttribute("type", "password");
  username.setAttribute("name", "password");
  username.setAttribute("id", "textField1");

  const loginButton = document.createElement("button");
  loginButton.innerText = "Login";
  loginButton.addEventListener("click", function (event) {
    loadGame();
    /* run createUser function here, but change the function so that 
       the createUser takes the information from the input fields.
    */
    event.preventDefault();
  });

  const createNewUserButton = document.createElement("button");
  createNewUserButton.innerText = "Create new user";
  createNewUserButton.addEventListener("click", function (event) {
    createUserUi();

    // lag og kjør funksjon for å gjemme css for login

    /* run createUser function here, but change the function so that 
       the createUser takes the information from the input fields.
    */
    event.preventDefault();
  });

  // const formData = new FormData(userForm);
  // const register = await createUser();

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

  // kjør dette aller først:
  // formData = customerForm
  // let customerForm = document.createElement("form");
  // let playerEmail = document.createElement("input");
  // let playerPsw = document.createElement("input");
  // let playerNick = document.createElement("input");
  // customerForm.appendChild("");
  // lag knapp for createUser her og legg på en eventlistener som kjører create user knapp
  /* run createUser function here, but change the function so that 
     the createUser takes the information from the input fields.
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

/*
--------------------------------------- TO DO: ---------------------------------------
1. lag liste for stats i idle
2. oppdater stats med if tester e.l. når du skal lvl opp... må vel da lage et xp system...
3. sett inn spillernavn + lvl
4. bytte "game" i filnavn til hva du skal kalle spillet
*/

/*
--------------------------------------- Game fixes: ---------------------------------------
1. fix the idle and inventory functions, they are a mess with variables that have horrible names, aka fix 
  the css hidden toggle stuff so its not ass
2. fix bug med at hvis du holder på å lvl et skill og trykker på samme knapp så skjer det ting. 
  Det skal ikke gå ann å trykke på knappen av samme skill mens man lvler det.
  evt så kan du cleare intervalle av samme skill (cleare alle 4 istedenfor 3)?
3. husk å gjøre alt til const, og heller let om du får feilmelding
4. make the category buttons smaller and the gameplay area bigger
5. make the layout responsive
6. trenger kanskje ikke å starte siden med idle delen, kanskje noe annet skal være der?
7. kan kanskje lage noen av div og knapper med for loop heller 
8. hvis du begynner å farme eks. woodcutting og går til inventory farmer den fortsatt // lag en egen funksjon for å stoppe farming
   så du ikke trenger å ha 100 linjer hvergang det må stoppes, og kall på den når du bytter skill å grinde eller vindu
*/
