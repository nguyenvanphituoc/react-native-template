const fs = require("fs");
const path = require("path");

function initScript(projectPath) {
  const directories = [
    "_githooks",
    "_gitignore",
    "_bundle",
    "_eslintignore",
    "_eslintrc.js",
    "_prettierrc.js",
    "_node-version",
    "_gitlab-ci.yml",
    "_watchmanconfig",
    "_husky",
    "_nvmrc",
  ];

  directories.forEach((dir) => {
    const originDir = path.join(projectPath, dir);
    const newDir = path.join(projectPath, "." + dir.slice(1));

    if (fs.existsSync(originDir)) {
      if (fs.lstatSync(originDir).isFile()) {
        fs.copyFileSync(originDir, newDir);
      } else if (fs.lstatSync(originDir).isDirectory()) {
        fs.readdirSync(originDir).forEach((file) => {
          fs.copyFileSync(path.join(originDir, file), path.join(newDir, file));
        });
      }
      fs.rmSync(originDir, { recursive: true, force: true });
    }
  });

  const xcodeEnvPath = path.join(projectPath, "ios", "_xcode_env");
  if (fs.existsSync(xcodeEnvPath)) {
    fs.copyFileSync(xcodeEnvPath, path.join("ios", ".xcode_env"));
    fs.rmSync(xcodeEnvPath, { force: true });
  }

  const dsStore = path.join(projectPath, "_DS_Store");
  if (fs.existsSync(dsStore)) {
    fs.rmSync(dsStore, { force: true });
  }

  console.log("Init script completed");
}

module.exports = { initScript };
