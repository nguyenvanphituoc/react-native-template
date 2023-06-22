import fs from 'fs-extra';
import path from 'path';

function flattenJson(nestedJson, parentKey = '', separator = '.') {
  let items = [];
  for (let [key, value] of Object.entries(nestedJson)) {
    let newKey = parentKey ? `${parentKey}${separator}${key}` : key;
    if (typeof value === 'object') {
      items.push(...flattenJson(value, newKey, separator));
    } else {
      items.push([newKey, value]);
    }
  }
  return items;
}
function convertToKeyValuePairs(nestedJson, parentKey = '', separator = '.') {
  let items = flattenJson(nestedJson, parentKey, separator);
  let result = {};
  for (let [key, value] of items) {
    result[key] = value;
  }
  return result;
}

let fileCount = 0;
const directoryPath = path.resolve(
  process.cwd(),
  'scripts',
  'locale',
  'reports',
);
const reportFilePath = path.join(directoryPath, 'report-locale-missing.txt');
const whitelist = ['.ts', '.tsx', '.js', '.jsx'];
// Ensure that the report file exists before writing to it
fs.ensureFileSync(reportFilePath);
// Truncate the report file to clear its contents
fs.truncateSync(reportFilePath, 0);
const report = [];

async function findTextInDirectory(directory, keysToRemove) {
  try {
    const files = await fs.readdir(directory);
    //
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = await fs.stat(filePath);
      //
      if (stat.isDirectory()) {
        //
        await findTextInDirectory(filePath, keysToRemove);
      } else {
        // Check if the file type is in the whitelist
        if (!whitelist.includes(path.extname(filePath))) {
          continue;
        }
        //
        fileCount = fileCount + 1;
        const contents = await fs.readFile(filePath, 'utf8');
        if (!contents.includes('i18n')) {
          continue;
        }
        //
        // const regex = /i18n.t\(['"]((?:\w+\.)+\w+)['"]/g;
        const pattern = /i18n.t\(['"]{0,1}((?:\w+\W{0,1})+\w+)['"]{0,1}/;
        const fileRegexp = new RegExp(pattern, 'gm');
        const matches = contents.match(fileRegexp) || [];
        // Extract the key(s) from each instance
        matches.forEach(match => {
          const matched = match.match(pattern);
          const matchingStr = matched[0];
          const usingKey = matched[1]; // extract the first argument as key
          // Search for the key in the file contents
          if (!keysToRemove.includes(usingKey)) {
            //
            report.push(
              `=> using ${matchingStr} key does not declare ${usingKey} in\n\t - ${filePath}`,
            );
          }
        });
      }
    }
  } catch (err) {
    console.error(`Unable to read directory ${directory}: ${err}`);
  }
}
fs.readFile(
  path.resolve(process.cwd(), 'src/locales/localization/en.json'),
  'utf-8',
  (_err, data) => {
    const jsonObject = JSON.parse(data);
    const flattenJsonObject = convertToKeyValuePairs(jsonObject);
    const directory = path.resolve(process.cwd(), 'src');
    const keysToRemove = Object.keys(flattenJsonObject);

    findTextInDirectory(directory, keysToRemove).then(() => {
      report.push('=====================================');
      report.push(`file count: ${fileCount}`);
      // Sort the report lines
      // report.sort((a, b) => {
      //   if (a.startsWith('=>') && !b.startsWith('=>')) {
      //     return 1; // a should appear after b
      //   } else if (!a.startsWith('=>') && b.startsWith('=>')) {
      //     return -1; // a should appear before b
      //   } else {
      //     return 0; // maintain the order of a and b
      //   }
      // });
      // Write the new report to the file
      report.push('=====================================');
      report.push(`report generated date: ${new Date()}`);
      fs.writeFileSync(reportFilePath, report.join('\n'), 'utf8');
    });
  },
);
