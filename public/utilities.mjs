"use strict";

export function captializeFirstLetter(aName) {
  const firstLetter = aName.charAt(0).toUpperCase();
  const rest = aName.slice(1);
  return firstLetter + rest;
}

export async function customFetch(method, body, headers, url) {
  const errorMessage = document.getElementById("errorMessage");

  const requestOptions = {
    method: method,
    headers: headers,
    body: body,
  };

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    if (!response.ok) {
      if (errorMessage != null) {
        errorMessage.innerText = data.error;
      }
      throw new Error(data.error || "Server error");
    }
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

let itemClicked = null;

export function setItemClicked(item) {
  itemClicked = item;
}

export function getItemClicked() {
  return itemClicked;
}
