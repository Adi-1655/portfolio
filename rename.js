const fs = require('fs');
const path = require('path');

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            walk(filePath);
        } else {
            let newPath = null;
            if (filePath.endsWith('.tsx')) {
                newPath = filePath.replace(/\.tsx$/, '.jsx');
            } else if (filePath.endsWith('.ts')) {
                newPath = filePath.replace(/\.ts$/, '.js');
            }
            if (newPath) {
                try {
                    fs.renameSync(filePath, newPath);
                    console.log('Renamed', filePath, 'to', newPath);
                } catch (e) {
                    console.error('Failed to rename', filePath, e);
                }
            }
        }
    }
}

try {
    walk(path.join(__dirname, 'frontend/src'));
    console.log('Done renaming src');
} catch (e) {
    console.error(e);
}
