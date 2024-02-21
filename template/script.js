#!/usr/bin/env node
// const ora = require("ora");
const { execSync } = require("child_process");

// const spinner = ora("Executing post init script ");

new Promise((resolve, reject) => {
  // spinner.start();
  // do something
  try {
    const stdout = execSync("bash init");
    console.log(`stdout: ${stdout}`);
    resolve();
  } catch (error) {
    reject(error);
  }
})
  .then(() => {
    // spinner.succeed();
  })
  .catch((error) => {
    // spinner.fail();
    throw new Error(
      "Something went wrong during the post init script execution" +
        (error?.message || JSON.stringify(error))
    );
  });
