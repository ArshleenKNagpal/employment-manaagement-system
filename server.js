const { db } = require("./config/connection");
const express = require("express");
const index  = require("./utils/index.js");

const PORT = process.env.PORT || 3000;

function createConnect() {
  console.log("Welcome to Employee Tracker");
  index();
}
createConnect();

