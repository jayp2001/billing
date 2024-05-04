const { execSync } = require('child_process');
const os = require('os');

function getPrinterNames() {
    let command;
    if (os.platform() === 'win32') {
        command = 'wmic printer get name';
    } else {
        command = 'lpstat -a | awk \'{print $1}\'';
    }

    try {
        const output = execSync(command).toString();
        const printerNames = output.split('\n').filter(name => name.trim() !== '');
        return printerNames;
    } catch (error) {
        console.error('Error fetching printer names:', error.message);
        return [];
    }
}

module.exports = { getPrinterNames };
