/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
const fs = require('fs-extra');
const path = require('path');

module.exports = function()
{
  fs.removeSync(path.resolve('src/themes/mytheme/theme.json'));

  let mythemeBase = 'src/themes/mytheme';
  const allPlatforms = ['android', 'ios', 'web', 'windows'];
  const jetVersion = _getJetVersion();
  allPlatforms.forEach((platform) => {
    let valuePairs = _getValuePairsArray(jetVersion, platform);
    let filePath = path.resolve(mythemeBase, platform, `_mytheme.${platform}.settings.scss`);
    let fileContent = fs.readFileSync(filePath, 'utf-8');
    valuePairs.forEach((valuePair) => {
      fileContent = fileContent.replace(valuePair.str, valuePair.newStr);
    });
    fs.outputFileSync(filePath, fileContent);
  });
  
  return {
    copySrcToStaging: {
        fileList: [
          {
            buildType: 'release',
            cwd: 'src',
            src: [
              '**',
              '!js/**/*.js',
              'js/main.js',
              'js/libs/**',
              '!js/libs/**/*debug*',
              '!js/libs/**/*debug*/**',
              '!js/main-release-paths.json',
              '!themes/**'
            ],
            dest: 'web'
          },
          {
            buildType: 'dev',
            cwd: 'src',
            src: [
              '**', 
              '!js/main-release-paths.json',
              '!themes/**',
              ],
            dest: 'web'
          },
          {
            cwd: 'src-web',
            src: ['**'],
            dest: 'web'          },
          {
            cwd: 'src/themes',
            src: ['**', '!**/*.scss', '!**.map', '!**/*.json'],
            dest: 'themes'
          },
          {
            cwd: 'src/themes',
            src:[
              '**',
              '!**/*.json'
            ], 
            dest:'web/scss/themes'
          },
          {
            cwd: 'src/themes',
            src:[
              '**',
              '!**/*.json'
            ], 
            dest:'web/themes'
          },          
        ],
      },
  };
};

function _getValuePairsArray(jetVersion, platform) {
  return [
    {
      str: new RegExp('.*\\$imageDir.*', 'g'),
      newStr: `$imageDir: "../../../css/alta/${jetVersion}/${platform}/images/" !default;`,
    },
    {
      str: new RegExp('.*\\$fontDir.*', 'g'),
      newStr: `$fontDir:  "../../../css/alta/${jetVersion}/${platform}/fonts/" !default;`,
    },
    {
      str: new RegExp('.*\\$commonImageDir.*', 'g'),
      newStr: `$commonImageDir:  "../../../css/alta/${jetVersion}/common/images/" !default;`,
    },
  ];
}

function _getJetVersion() {
  let packageJSON = path.resolve('node_modules/@oracle/oraclejet/package.json');
  packageJSON = fs.readJsonSync(packageJSON);
  return packageJSON.version;
}
