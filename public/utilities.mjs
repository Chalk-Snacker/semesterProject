"use strict";

export function captializeFirstLetter(aName) {
  const firstLetter = aName.charAt(0).toUpperCase();
  const rest = aName.slice(1);
  return firstLetter + rest;
}
