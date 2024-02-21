#!/usr/bin/env node
const ora = require("ora");
const { inquire } = require("./options");
const { execSync } = require("child_process");

const spinner = ora("Executing post init script ");
const PROJECT_PATH = process.cwd();
new Promise((resolve, reject) => {
  spinner.start();
  // do something
  // print current working directory
  console.log("Current working directory: ", PROJECT_PATH);
  try {
    const stdout = execSync("bash ./init $PROJECT_PATH");
    console.log(`stdout: ${stdout}`);
  } catch (error) {
    console.log(`stdout error: ${stdout}`);
  }
  {
    inquire(resolve);
  }
})
  .then(() => {
    spinner.succeed();
  })
  .catch((error) => {
    spinner.fail();
    throw new Error(
      "Something went wrong during the post init script execution" +
        (error?.message || JSON.stringify(error))
    );
  });
