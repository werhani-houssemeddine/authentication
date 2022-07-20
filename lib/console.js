const {Console} = require('console');
const { createWriteStream } = require('fs');
const path = require('path');

const print = (() => {
    const filePath = file => path.join(__dirname, '..', file);

    const output = createWriteStream(filePath('console.log'), {flags: 'a+'});
    const errOutput = createWriteStream(filePath('err.log'), {flags: 'a+'});
    const _console = new Console(output, errOutput);

    return _console;
})();

module.exports = print;