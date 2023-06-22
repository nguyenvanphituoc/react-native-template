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
const reportFilePath = path.join(directoryPath, 'report-locale.txt');
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
    report.push(`# reading dir.... ${directory}`);
    //
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = await fs.stat(filePath);
      //
      if (stat.isDirectory()) {
        //
        await findTextInDirectory(filePath, keysToRemove, fileCount);
      } else {
        // Check if the file type is in the whitelist
        if (!whitelist.includes(path.extname(filePath))) {
          report.push(`\t + skipped file: ${filePath}`);
          continue;
        }
        //
        fileCount = fileCount + 1;
        const contents = await fs.readFile(filePath, 'utf8');
        //
        report.push(`\t - reading file.... ${filePath}`);
        // Loop through each key to remove
        let keyIndex = 0;
        while (keyIndex < keysToRemove.length) {
          const key = keysToRemove[keyIndex];
          // Search for the key in the file contents
          if (contents.includes(key)) {
            // If the key is found, remove it from the list of keys to remove
            const index = keysToRemove.indexOf(key);
            if (index > -1) {
              //
              keysToRemove.splice(index, 1);
              //
              report.push(
                `=> key found and remove: ${key}, ${keysToRemove.length}`,
              );
              continue;
            }
          }
          keyIndex++;
        }
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
      report.push(`remain keys ${keysToRemove.length}:`);

      const remainKeyValue = keysToRemove.map(
        key => `${key}: '${flattenJsonObject[key]}'`,
      );
      report.push(remainKeyValue.map(key => '. ' + key).join('\n'));
      // Write the new report to the file
      report.push('=====================================');
      report.push(`report generated date: ${new Date()}`);
      fs.writeFileSync(reportFilePath, report.join('\n'), 'utf8');
    });
  },
);
/**
 * if (isMainThread) {
      const directory = path.resolve(process.cwd(), 'src/assets');

      const searchTasks = Object.entries(flattenJsonObject).map(
        async ([key, value]) => {
          return new Promise((resolve, reject) => {
            const worker = new Worker(process.cwd(), {
              workerData: {directory, searchText: key},
            });
            worker.on('message', resolve);
            worker.on('error', reject);
            worker.on('exit', code => {
              if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
              }
            });
          });
        },
      );

      Promise.all(searchTasks)
        .then(results => {
          const matchedFiles = results.flat();
          console.log(`Matched files: ${matchedFiles}`);
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      const {directory, searchText} = workerData;
      searchDirectory(directory, searchText)
        .then(result => {
          parentPort.postMessage(result);
        })
        .catch(err => {
          console.error(err);
        });
    }
 */
