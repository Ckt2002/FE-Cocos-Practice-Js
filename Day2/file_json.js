import * as fs from 'fs';

const fileJsonPath = './json';
function createNewFile(fileName, content) {
    const filePath = `${fileJsonPath}/${fileName}.json`;
    fs.writeFileSync(filePath, content);
}

function writeFile(fileName, content) {
    const filePath = `${fileJsonPath}/${fileName}.json`;
    if (!fs.existsSync(filePath)) {
        createNewFile(fileName, content);
        return;
    }

    fs.writeFileSync(filePath, content);
}

function readFile(fileName) {
    const filePath = `${fileJsonPath}/${fileName}.json`;
    const content = fs.readFileSync(filePath);
    return content;
}

function checkFile(fileName) {
    const filePath = `${fileJsonPath}/${fileName}.json`;
    return fs.existsSync(filePath);
}

export { createNewFile, writeFile, readFile, checkFile };