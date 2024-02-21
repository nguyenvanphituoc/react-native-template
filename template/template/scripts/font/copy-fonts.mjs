import fs from 'fs-extra';
import path from 'path';
import plist from 'plist';
import xcode from 'xcode';
import {exec} from 'child_process';
// Define the list of source font files and the destination folder
const FONT_SOURCE_FOLDER = 'src/assets/fonts';
// Read all font files in the source folder
const FONT_SOURCES = fs
  .readdirSync(FONT_SOURCE_FOLDER)
  .filter(file => file.endsWith('.ttf') || file.endsWith('.otf'))
  .map(file => path.join(FONT_SOURCE_FOLDER, file));

// Define the path to your Xcode project
const PROJECT_PATH = 'ios';
// add font to bundle resource
// Add the font files to the Copy Bundle Resources build phase for all targets
// Update the Info.plist file for each target
const xcodeProjectPath = path.join(
  PROJECT_PATH,
  'ProjectName.xcodeproj',
  'project.pbxproj',
);
const project = xcode.project(xcodeProjectPath);
project.parseSync();
//
const applicationTargetType = '"com.apple.product-type.application"';
const pbxProjectPath = project.getFirstProject().uuid;
const pbxProject = project.hash.project.objects['PBXProject'][pbxProjectPath];
const targetUUIDs = pbxProject.targets.map(target => target.value);
//
const processingPlist = [];

targetUUIDs.forEach(targetUUID => {
  //
  const target = project.pbxNativeTargetSection()[targetUUID];
  if (
    !target ||
    !target.buildConfigurationList ||
    target.productType !== applicationTargetType
  ) {
    return;
  }
  // Retrieve the INFOPLIST_FILE path from build settings
  const buildConfigurations =
    project.pbxXCConfigurationList()[target.buildConfigurationList]
      .buildConfigurations;
  // edit plist from build setting of application target
  buildConfigurations.forEach(buildConfig => {
    const xcBuildConfiguration =
      project.pbxXCBuildConfigurationSection()[buildConfig.value];
    const infoPlistFile = xcBuildConfiguration.buildSettings['INFOPLIST_FILE'];
    //
    if (processingPlist.includes(infoPlistFile)) {
      return;
    }
    processingPlist.unshift(infoPlistFile);
    const plistPath = path.join(PROJECT_PATH, infoPlistFile);
    // Update the Info.plist file
    const plistContent = fs.readFileSync(plistPath, 'utf8');
    const plistData = plist.parse(plistContent);

    if (!plistData.UIAppFonts) {
      plistData.UIAppFonts = [];
    }

    FONT_SOURCES.forEach(fontSourcePath => {
      const fontFileName = path.basename(fontSourcePath);
      if (!plistData.UIAppFonts.includes(fontFileName)) {
        plistData.UIAppFonts.unshift(fontFileName);
        console.log(`${fontFileName} added to ${infoPlistFile}`);
      } else {
        console.log(`${fontFileName} is already present in ${infoPlistFile}`);
      }
    });

    // Update the Info.plist file
    fs.writeFileSync(plistPath, plist.build(plistData));
    console.log(`${infoPlistFile} updated successfully.`);
  });

  // PBXResourcesBuildPhase
  const resourcesBuildPhase = project.pbxResourcesBuildPhaseObj(targetUUID);
  const relativePath = path.relative('src', PROJECT_PATH);

  // Add the font files to the Copy Bundle Resources build phase for the target
  FONT_SOURCES.forEach(fontSourcePath => {
    const fontFileName = path.basename(fontSourcePath);
    if (!resourcesBuildPhase.files.includes(fontFileName)) {
      // PBXBuildFile
      // PBXResourcesBuildPhase
      // PBXFileReference
      // PBXGroup
      const fontFileRef = project.addResourceFile(`../${fontSourcePath}`, {
        target: targetUUID,
        lastKnownFileType: '"file"',
      });
      console.log(
        `${fontFileName} added to Copy Bundle Resources for target: ${fontFileRef.comment}`,
      );
    }
  });

  fs.writeFileSync(xcodeProjectPath, project.writeSync());
});

const ANDROID_ASSETS_FOLDER = 'android/app/src/main/assets';
const ANDROID_FONT_FOLDER = 'fonts';
const ANDROID_ASSETS_FONT_FOLDER = path.join(
  ANDROID_ASSETS_FOLDER,
  ANDROID_FONT_FOLDER,
);
// copy font to android
if (!fs.existsSync(ANDROID_ASSETS_FOLDER)) {
  fs.mkdirSync(ANDROID_ASSETS_FOLDER);
}
if (!fs.existsSync(ANDROID_ASSETS_FONT_FOLDER)) {
  fs.mkdirSync(ANDROID_ASSETS_FONT_FOLDER);
}
FONT_SOURCES.forEach(fontSourcePath => {
  const fontFileName = path.basename(fontSourcePath);
  const fontDestPath = path.join(ANDROID_ASSETS_FONT_FOLDER, fontFileName);
  fs.copyFileSync(fontSourcePath, fontDestPath);
  console.log(`${fontFileName} copied to ${ANDROID_ASSETS_FONT_FOLDER}`);
});

// fs.writeFileSync(xcodeProjectPath, project.writeSync());
console.log('Font installation completed successfully.');

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
