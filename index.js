const fs = require('node:fs');
const ZL = require('zip-lib');

const outPath = './out/';
const archiveName = 'SurvivalResourcePack.zip';

if (fs.existsSync(`${outPath}${archiveName}`)) {
    fs.renameSync(`${outPath}${archiveName}`, `${outPath}${archiveName.split('.').join(`_${Date.now()}.`)}`);
}

const zipperError = (err) => {
    console.log('Could not ZIP archive...');
    console.error(err);
};

const archive = new ZL.Zip();

archive.addFile('./README.md');
archive.addFile('./pack.png');
archive.addFile('./pack.mcmeta');
archive.addFolder('./assets', 'assets');

// Generate zip file.
archive
    .archive(`${outPath}${archiveName}`)
    .then(
        () => {
            console.log('Zipped content...');
        },
        (err) => {
            zipperError(err);
        }
    )
    .catch((err) => {
        zipperError(err);
    });
