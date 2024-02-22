import fs from 'fs-extra';
import csv from 'csv-parser';
import path from 'path';

const languageDir = path.resolve(process.cwd(), 'src/locales');
const languageCSV = path.join(languageDir, 'language.csv');
const results = [];

fs.mkdirSync(path.join(languageDir, 'localization'), {
  recursive: true,
});
fs.emptyDirSync(path.join(languageDir, 'localization'));

fs.createReadStream(languageCSV)
  .pipe(csv())
  .on('data', data => {
    /**
     * {
      module: 'errorMessage.videoDescriptionRequired',
      en: 'Description is required',
      vi: 'Mô tả là bắt buộc',
      ja: '概要説明の記入が必要です。',
      zh: ''
    }
     */
    // flatten data
    results.push(data);
  })
  .on('end', () => {
    const output = {};

    results.forEach(row => {
      const rowKeys = Object.keys(row);
      rowKeys.forEach(key => {
        const locale = key.toLowerCase();
        if (locale === 'module') {
          return;
        }
        if (!output[locale]) {
          output[locale] = {};
        }
        //
        const languageKey = row[rowKeys[0]];
        const languageValue = row[key];
        if (languageValue) {
          output[locale][languageKey] = languageValue;
        } else {
          console.warn(
            `Missing language value for ${locale} at ${languageKey}`,
          );
        }
      });
    });

    // sort module and nested module by alphabet
    // ignore case
    Object.keys(output).forEach(locale => {
      const newObj = {};
      Object.keys(output[locale])
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
        .forEach(module => {
          newObj[module] = output[locale][module];
        });
      output[locale] = newObj;
    });

    // module separate with dot
    // make nested object
    Object.keys(output).forEach(locale => {
      const newObj = {};
      Object.keys(output[locale]).forEach(languageKey => {
        // split module
        const moduleKeys = languageKey.split('.');
        let currentObj = newObj;
        moduleKeys.forEach((moduleKey, index) => {
          // last key is language key
          if (index === moduleKeys.length - 1) {
            currentObj[moduleKey] = output[locale][languageKey];
            // delete old key
            delete output[locale][languageKey];
          } else {
            // create new object for nested module
            if (!currentObj[moduleKey]) {
              currentObj[moduleKey] = {};
            }
            // move to next level
            currentObj = currentObj[moduleKey];
          }
        });
      });
      output[locale] = newObj;
    });

    // Write to file
    Object.entries(output).forEach(([key, value]) =>
      fs
        .writeJSON(path.join(languageDir, `localization/${key}.json`), value, {
          spaces: '\t',
          replacer: (key, value) => {
            if (typeof value === 'string') {
              return value.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
            }
            return value;
          },
        })
        .then(() => console.log(`Output saved to ${key}.json`))
        .catch(err => console.error(err)),
    );

    // create index.js exports all language
    const defineKeys = Object.keys(output).reduce((objc, key) => {
      objc[key] = key;
      return objc;
    }, {});
    const indexFile = Object.keys(output).map(
      key => `import ${defineKeys[key]} from './${defineKeys[key]}.json';`,
    );
    indexFile.push(
      `export default {${Object.values(defineKeys).join(', ')}};\n`,
    );

    fs.writeFile(
      path.join(languageDir, 'localization/index.js'),
      indexFile.join('\n'),
    );
  });
