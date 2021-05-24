const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

const apiUrl = "https://api.github.com/graphql";

const main = (message, emoji, token) => {
  if (token) {
    fs.writeFileSync(`${__dirname}/.env`, `GITHUB_ACCESS_TOKEN=${token}`);
  }

  if (!message || !emoji) {
    throw Error("Please enter a message and emoji");
  }

  if (!process.env.GITHUB_ACCESS_TOKEN && !token) {
    throw Error("Missing GitHub access token");
  }

  const data = JSON.stringify({
    query: `mutation { changeUserStatus(input: { emoji: "${emoji}", message: "${message}" }) { clientMutationId status { emoji } } }`,
    variables: {},
  });

  axios
    .post(apiUrl, data, {
      headers: {
        Authorization: `bearer ${process.env.GITHUB_ACCESS_TOKEN || token}`,
      },
    })
    .then(() => {
      console.info("Done!");
    })
    .catch((err) => {
      console.error(
        (err.response && error.response.data.message) || err.message
      );
    });
};

module.exports = main;
