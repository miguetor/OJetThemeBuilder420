/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
module.exports = function(grunt)
{
  return {
    connect: {
        webDevServer: {
          options: {
            hostname: '*',
            port: 8000,
            livereload: true,
            base: [
              'web',
              'bower_components/oraclejet/dist/scss',
              'src/themes'],
            open: true
          }
        }
      }
  };
};