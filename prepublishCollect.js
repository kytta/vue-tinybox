/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const clearPackageJson = require('clean-publish/core').clearPackageJSON;

const filesToExport = [
  'CHANGELOG.md',
  'LICENSE',
  'README.md',
  'src/tinybox.vue',
  'dist',
];

const packagePath = path.join(__dirname, 'package');

fse.emptyDirSync(packagePath);

if (!fs.existsSync(packagePath)) {
  fs.mkdirSync(packagePath);
}

const cleanPackage = clearPackageJson(require('./package.json'));

fs.writeFileSync(
  path.join(packagePath, 'package.json'),
  JSON.stringify(cleanPackage, undefined, 2),
);

filesToExport.forEach((filename) => {
  fse.copySync(
    path.join(__dirname, filename),
    path.join(packagePath, filename),
  );
});
