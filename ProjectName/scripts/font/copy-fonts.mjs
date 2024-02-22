import fs from 'fs-extra';
import path from 'path';
import {exec} from 'child_process';
import iosCopyFont from './copy-fonts.ios.mjs';
import androidCopyFont from './copy-fonts.android.mjs';

const PROJECT_PATH = process.cwd();
// Define the list of source font files and the destination folder
const FONT_SOURCE_FOLDER = path.join(PROJECT_PATH, 'src/assets/fonts');
// Read all font files in the source folder
const FONT_SOURCES = fs
  .readdirSync(FONT_SOURCE_FOLDER)
  .filter(file => file.endsWith('.ttf') || file.endsWith('.otf'))
  .map(file => path.join(FONT_SOURCE_FOLDER, file));

iosCopyFont.exec(PROJECT_PATH, FONT_SOURCES);
androidCopyFont.exec(PROJECT_PATH, FONT_SOURCES);

// generate font constant file in FONT_SOURCE_FOLDER
// export MAPPING_FONT_FAMILY with object json key: 100 -> 900, each key is font name
/**
 * 100: FontName-Thin
 * 200: FontName-ExtraLight
 * 300: FontName-Light
 * 400: FontName-Regular
 * 500: FontName-Medium
 * 600: FontName-SemiBold
 * 700: FontName-Bold
 * 800: FontName-ExtraBold
 * 900: FontName-Black
 */
// With FontName is font file name read from FONT_SOURCE_FOLDER
// step: 1. read all font file in FONT_SOURCE_FOLDER
// step: 2. generate MAPPING_FONT_FAMILY
// step: 3. Write it to file constant.ts that export MAPPING_FONT_FAMILY as default
// code below:
const FONT_WEIGHT_TO_NUMBER = {
  Thin: 100,
  ExtraLight: 200,
  Light: 300,
  Regular: 400,
  Medium: 500,
  SemiBold: 600,
  Bold: 700,
  ExtraBold: 800,
  Black: 900,
};
const MAPPING_FONT_FAMILY = {
  100: {},
  200: {},
  300: {},
  400: {},
  500: {},
  600: {},
  700: {},
  800: {},
  900: {},
};
FONT_SOURCES.forEach(fontSourcePath => {
  const fontFileName = path.basename(fontSourcePath);
  const fontName = fontFileName.split('.')[0];
  const fontFamily = fontName.split('-')[0];
  const fontWeight = fontName.split('-')[1];
  console.log(fontName, fontFamily, fontWeight);
  //
  let fontWeightNumber = Object.entries(FONT_WEIGHT_TO_NUMBER).find(
    ([key, value]) => fontWeight.toLowerCase().includes(key.toLowerCase()),
  )?.[1];

  if (!fontWeightNumber) {
    // sometime regular does not mark in font name
    fontWeightNumber = 400;
  }
  //
  if (fontWeight.toLowerCase().includes('italic')) {
    MAPPING_FONT_FAMILY[fontWeightNumber][fontFamily + 'Italic'] = fontName;
  } else {
    MAPPING_FONT_FAMILY[fontWeightNumber][fontFamily] = fontName;
  }
});
const content = `export const MAPPING_FONT_FAMILY: {[key in string]: any} = ${JSON.stringify(
  MAPPING_FONT_FAMILY,
  null,
  2,
)};\n`;
fs.writeFileSync(path.join(FONT_SOURCE_FOLDER, 'constant.ts'), content);
// format constant js
exec(
  `eslint ${path.join(FONT_SOURCE_FOLDER, 'constant.ts')} --fix`,
  (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  },
);
console.log('Generate font constant successfully.');
