"use strict";
loadModules();

let loadGame;
let customFetch;

async function loadModules() {
  if (navigator.onLine) {
    try {
      const gameModule = await import("./game.mjs");
      const utilityModule = await import("./utilities.mjs");
      loadGame = gameModule.loadGame;
      customFetch = utilityModule.customFetch;
      loadTemplates("loginTemplate");
      loginUser();
    } catch (error) {
      console.error("Failed to load modules:", error);
    }
  } else {
    loadTemplates("offlineTemplate");
  }
}

export function loadTemplates(templateId) {
  let container = document.getElementById("container");
  container.innerHTML = "";
  container.appendChild(document.importNode(document.getElementById(templateId).content, true));
}

export function loginUser() {
  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    loadTemplates("gameTemplate");
    loadGame();
    return;
  }

  const loginButton = document.querySelector("#loginButton");
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
      loadGame();
    }
  } catch (error) {
    console.log(error);
  }
}
