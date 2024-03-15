"use strict";
import { loadGame } from "./game.mjs";
import { customFetch } from "./utilities.mjs";

export function loadTemplates(templateId) {
  let container = document.getElementById("container");
  container.innerHTML = "";
  container.appendChild(document.importNode(document.getElementById(templateId).content, true));
}

export function loginUser() {
  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    const userId = { userId: parseInt(authToken) };
    loadTemplates("gameTemplate");
    loadGame(userId);
    return;
  }

  const loginButton = document.getElementById("loginButton");
  loginButton.addEventListener("click", function (event) {
    correctLogin();

    event.preventDefault();
  });

  const createUserButton = document.getElementById("createUserButton");

  createUserButton.addEventListener("click", function (event) {
    loadTemplates("createUserTemplate");
    const submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", function (event) {
      createUser();

      event.preventDefault();
    });
    const homeButton = document.getElementById("homeButton");
    homeButton.addEventListener("click", function (event) {
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
    playerEmail: userEmailInput.value,
    playerPsw: passwordInput.value,
    playerNick: usernameInput.value,
  };

  try {
    await customFetch("POST", JSON.stringify(user), { "Content-Type": "application/json" }, "/user");
    loadTemplates("loginTemplate");
    loginUser();
  } catch (error) {
    console.log(error);
  }
}

async function correctLogin() {
  const usernameInput = document.getElementById("textField0");
  const passwordInput = document.getElementById("textField1");

  const credentials = btoa(`${usernameInput.value}:${passwordInput.value}`);
  const authHeader = `Basic ${credentials}`;

  try {
    const response = await customFetch("GET", null, { "Content-Type": "application/json", Authorization: authHeader }, "/user/login");

    if (typeof response == "object") {
      localStorage.setItem("authToken", response.userId);
      loadTemplates("gameTemplate");
      loadGame(response);
    }
  } catch (error) {
    console.log(error);
  }
}

/*
--------------------------------------- TO DO: ---------------------------------------
1. i loadTemplates, gjør en sjekk før du tømmer container i tilfelle noe går galt, så er siden blank
2. gå over og fjern golbal variabler, 90% er unødvendig og trenger ikke å være global, gjorde de bare det for testing

--------------------------------------- Game fixes: ---------------------------------------
1. husk å gjøre alt til const, og heller let om du får feilmelding
2. siden det er max antall lvl i threshHold, sette en condition slik at den ikke prøver å lvl videre...
3. gjør sjekk på om spiller er max lvl før du lvler opp
5. equip knapp oppdaterer ikke liste;
for globals, kan heller hente verdi fra functions med return og heller redeklarere med samme navn.
*/
