"use strict";
import { loadGame } from "./game.mjs";

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
      document.getElementById("textField2").value = "";
      document.getElementById("textField3").value = "";
      document.getElementById("textField4").value = "";

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
  const errorMessage = document.getElementById("errorMessage");
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
    const response = await fetch("/user", requestOptions);
    const data = await response.json();

    if (response.status != 201) {
      errorMessage.innerText = data.error;
      console.log("Error creating user");
      throw new Error(response.status);
    } else {
      loadTemplates("loginTemplate");
      loginUser();
    }
  } catch (error) {
    console.log(error);
  }
}

async function correctLogin() {
  const errorMessage = document.getElementById("errorMessage");
  const usernameInput = document.getElementById("textField0");
  const passwordInput = document.getElementById("textField1");

  const credentials = btoa(`${usernameInput.value}:${passwordInput.value}`);
  const authHeader = `Basic ${credentials}`;

  let requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: authHeader },
  };

  try {
    const response = await fetch("/user/login", requestOptions);
    let data = await response.json();
    if (response.status !== 201 && response.status !== 200) {
      errorMessage.innerText = data.error;
      throw new Error("Server error: " + response.status);
    }

    if (typeof data == "object") {
      localStorage.setItem("authToken", data.userId);
      requestOptions.headers.Authorization = `Bearer ${data.userId}`;
      loadTemplates("gameTemplate");
      loadGame(data);
    }
  } catch (error) {
    console.log(error);
  }
}

/*
--------------------------------------- TO DO: ---------------------------------------
1. bytte "game" i filnavn til hva du skal kalle spillet
2. i loadTemplates, gjør en sjekk før du tømmer container i tilfelle noe går galt, så er siden blank
3. gå over og fjern golbal variabler, 90% er unødvendig og trenger ikke å være global, gjorde de bare det for testing

--------------------------------------- Game fixes: ---------------------------------------
1. husk å gjøre alt til const, og heller let om du får feilmelding
2. siden det er max antall lvl i threshHold, sette en condition slik at den ikke prøver å lvl videre...
3. gjør sjekk på om spiller er max lvl før du lvler opp
4. flytt alt html fra js inn i egne html templates og toggle de istedenfor  (fjern toggle css (er da undøvendig))
5. equip knapp oppdaterer ikke liste;
for globals, kan heller hente verdi fra functions med return og heller redeklarere med samme navn.
6. pass på at du ikke kan equippe annet enn armor og weapon
*/
