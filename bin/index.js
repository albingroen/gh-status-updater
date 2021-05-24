#!/usr/bin/env node
const argv = require("minimist")(process.argv.slice(2));

const { message, emoji, token } = argv;

const main = require("../index.js");

main(message, emoji, token);
