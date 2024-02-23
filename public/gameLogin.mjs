"use strict";
import { loadGame } from "./game.mjs";

let crypto;
try {
  crypto = window.crypto || window.msCrypto; // For broader compatibility
} catch (err) {
  console.error("Web Crypto API is not supported!");
}

console.log(crypto);

export async function hashPassword(password) {
  if (!crypto) {
    throw new Error("Web Crypto API is not supported!");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  const buffer = await crypto.subtle.digest("SHA-256", data);

  const hashArray = Array.from(new Uint8Array(buffer));
  const hashedPassword = hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");

  return hashedPassword;
}

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

export function loadTemplates(templateId) {
  let container = document.getElementById("container");
  container.innerHTML = "";
  container.appendChild(document.importNode(document.getElementById(templateId).content, true));
}

export function loginUser() {
  // UI for pålogging:
  const loginButton = document.getElementById("loginButton");
  loginButton.addEventListener("click", function (event) {
    correctLogin();
    loadTemplates("gameTemplate");

    event.preventDefault();
  });

  const createUserButton = document.getElementById("createUserButton");

  createUserButton.addEventListener("click", function (event) {
    loadTemplates("createUserTemplate");
    const submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", function (event) {
      createUser();
      document.getElementById("textField2").value = "";
      document.getElementById("textField3").value = "";
      document.getElementById("textField4").value = "";
      loadTemplates("loginTemplate");
      loginUser();

      event.preventDefault();
    });

    event.preventDefault();
  });
}

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

export async function correctLogin() {
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
    if (response.status !== 201 && response.status !== 200) {
      console.log("Error getting stuff!");
      throw new Error("Server error: " + response.status);
    }
    let data = await response.json();
    if (typeof data == "object") {
      loadGame(data);
    }
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
6. siden det er max antall lvl i threshHold, sette en condition slik at den ikke prøver å lvl videre...
7. flytt alt html fra js inn i egne html templates og toggle de istedenfor  (fjern toggle css (er da undøvendig))
*/
