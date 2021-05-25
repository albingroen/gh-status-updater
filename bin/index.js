#!/usr/bin/env node
const argv = require("minimist")(process.argv.slice(2));
const main = require("../index.js");

const { message, emoji, busy, token } = argv;

main(message, emoji, Boolean(busy), token);
