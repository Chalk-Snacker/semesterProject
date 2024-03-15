"use strict";
import { loadTemplates, loginUser } from "./gameLogin.mjs";
import { customFetch } from "./utilities.mjs";
import { switchgameplay } from "./game.mjs";

export async function initSettings() {
  const editUserButton = document.getElementById("editUserButton");
  const deleteUserButton = document.getElementById("deleteUserButton");
  const logoutButton = document.getElementById("logoutButton");

  editUserButton.addEventListener("click", async function () {
    const newUserName = document.getElementById("textField5").value;
    const newUserPassword = document.getElementById("textField6").value;
    await customFetch(
      "PUT",
      JSON.stringify({ newUserName: newUserName, newUserPassword: newUserPassword }),
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      "/user/usrPsw"
    );
    await switchgameplay("idleTemplate");
  });
  deleteUserButton.addEventListener("click", async function () {
    await customFetch("DELETE", null, { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("authToken")}` }, "/user");
    localStorage.removeItem("authToken");
    loadTemplates("loginTemplate");
    loginUser();
  });
  logoutButton.addEventListener("click", function () {
    localStorage.removeItem("authToken");
    loadTemplates("loginTemplate");
    loginUser();
  });
}
