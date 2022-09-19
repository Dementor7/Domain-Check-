const express = require("express");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const route = express.Router();

route.get("/", (req, res) => {
  res.json("success");
});

// | head -n 1
route.post("/url", async (req, res) => {
  try {
    const { url, http } = req.body;
    if (url === "" || url !== null) {
      if (http) {
        const { stdout, stderr } = await exec(`curl -Is http://${url}`);
        stdout ? res.status(200).send(stdout) : res.status(400).send(stderr);
      } else {
        const { stdout, stderr } = await exec(`curl -Is https://${url}`);
        stdout ? res.status(200).send(stdout) : res.status(400).send(stderr);
      }
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = route;

// user input { http: true or false } { domain }
// curl -Is http://google.com && whoami