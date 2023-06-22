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

const directoryPath = path.resolve(
  process.cwd(),
  'scripts',
  'locale',
  'reports',
);
const reportFilePath = path.join(directoryPath, 'report-key-map.txt');
fs.readFile(
  path.resolve(process.cwd(), 'src/locales/localization/en.json'),
  'utf-8',
  (_err, data) => {
    const jsonObject = JSON.parse(data);
    const flattenJsonObject = convertToKeyValuePairs(jsonObject);

    let previousKey = '';
    const report = Object.entries(flattenJsonObject).reduce(
      (rs, [key, value]) => {
        const keyArray = key.split('.');
        if (previousKey !== keyArray[0]) {
          previousKey = keyArray[0];
          rs.push(`\n// secction  for key ${previousKey}\n`);
        }
        rs.push(`${key}\n`);
        return rs;
      },
      [],
    );
    report.unshift('{\n');
    report.push('}\n');
    fs.writeFileSync(reportFilePath, report.join(''), 'utf8');
  },
);
