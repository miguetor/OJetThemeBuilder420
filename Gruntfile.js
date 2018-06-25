/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
'use strict';

var path = require('path');

module.exports = function(grunt) {

  require("load-grunt-config")(grunt, 
  {
    configPath: path.join(process.cwd(), "scripts/grunt/config")
  }); 

  grunt.loadNpmTasks("grunt-oraclejet");

  grunt.registerTask("build", (buildType) => {
    grunt.task.run([
      'clean:mythemejson',
      'fixMyTheme',
      `oraclejet-build:${buildType}`]);
  });

  grunt.registerTask("serve", (buildType) => {
    grunt.task.run([
      'clean:mythemejson',
      'fixMyTheme',
      `oraclejet-serve:${buildType}`]);
  }); 

  grunt.registerTask("fixMyTheme", () => {
    let mythemeBase = 'src/themes/mytheme';
    const allPlatforms = ['android', 'ios', 'web', 'windows'];
    const jetVersion = _getJetVersion(grunt);
    allPlatforms.forEach((platform) => {
      let valuePairs = _getValuePairsArray(jetVersion, platform);
      let filePath = path.resolve(mythemeBase, platform, `_mytheme.${platform}.settings.scss`);
      let fileContent = grunt.file.read(filePath);
      valuePairs.forEach((valuePair) => {
        fileContent = fileContent.replace(valuePair.str, valuePair.newStr);
      });
      grunt.file.write(filePath, fileContent);
    });

  });
};

function _getValuePairsArray(jetVersion, platform) {
  return [
    {
      str: new RegExp('.*\\$imageDir.*', 'g'),
      newStr: `$imageDir: "../../alta/${jetVersion}/${platform}/images/" !default;`,
    },
    {
      str: new RegExp('.*\\$fontDir.*', 'g'),
      newStr: `$fontDir:  "../../alta/${jetVersion}/${platform}/fonts/" !default;`,
    },
    {
      str: new RegExp('.*\\$commonImageDir.*', 'g'),
      newStr: `$commonImageDir:  "../../alta/${jetVersion}/common/images/" !default;`,
    },
  ];
}

function _getJetVersion(grunt) {
  let packageJSON = path.resolve('node_modules/@oracle/oraclejet/package.json');
  packageJSON = grunt.file.readJSON(packageJSON);
  return packageJSON.version;
}
