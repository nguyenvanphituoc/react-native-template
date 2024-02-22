#!/usr/bin/env node
const ora = require("ora");
// const { inquire } = require("./options");
const { initScript } = require("./replace");

const spinner = ora("Executing post init script ");
const PROJECT_PATH = process.cwd();
new Promise((resolve, reject) => {
  spinner.start();
  // do something
  // print current working directory
  console.log("Current working directory: ", PROJECT_PATH);
  try {
    initScript(PROJECT_PATH);
    // inquire(resolve);
    resolve();
  } catch (error) {
    console.log(`stdout error: ${error?.message || JSON.stringify(error)}`);
  }
})
  .then(() => {
    spinner.succeed();
  })
  .catch((error) => {
    console.log(`stdout error: ${error?.message || JSON.stringify(error)}`);
    spinner.fail();
    throw new Error(
      "Something went wrong during the post init script execution" +
        (error?.message || JSON.stringify(error))
    );
  });
