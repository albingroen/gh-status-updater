const argv = require("minimist")(process.argv.slice(2));
const axios = require("axios");
require("dotenv").config();

const apiUrl = "https://api.github.com/graphql";

const main = () => {
  const { message, emoji } = argv;

  if (!message || !emoji) {
    throw Error("Please enter a message and emoji");
  }

  const data = JSON.stringify({
    query: `mutation { changeUserStatus(input: { emoji: "${emoji}", message: "${message}" }) { clientMutationId status { emoji } } }`,
    variables: {},
  });

  axios
    .post(apiUrl, data, {
      headers: {
        Authorization: `bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    })
    .then((res) => {
      console.info("Done!");
    })
    .catch((err) => {
      console.error(err);
    });
};

main();
