import fs from 'fs';
import path from 'path';

// directory to search
const srcDir = 'd:\\College\\Projects\\Adi Portfolio\\frontend\\src';

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Check if URL is present
    if (!content.includes('http://localhost:5000')) {
        return;
    }

    // Determine config path relative to current file
    let relativeLevels = filePath.replace(srcDir, '').split(path.sep).length - 2;
    let configPrefix = relativeLevels > 0 ? '../'.repeat(relativeLevels) : './';
    let importStatement = `import { API_URL, UPLOADS_URL } from "${configPrefix}config";`;

    // Add import statement after the first group of imports
    if (!content.includes('import { API_URL, UPLOADS_URL }')) {
        let lines = content.split('\n');
        let ObjectImportsStart = -1;
        let lastImportIndex = -1;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('import ')) {
                lastImportIndex = i;
            }
        }
        if (lastImportIndex !== -1) {
            lines.splice(lastImportIndex + 1, 0, importStatement);
            content = lines.join('\n');
        } else {
            content = importStatement + '\n' + content;
        }
    }

    // Replace fetch('http://localhost:5000/api/... => fetch(`${API_URL}...`
    // Match literal quotes and replace with string interpolation
    content = content.replace(/(?<![`])['"]http:\/\/localhost:5000\/api([^'"]*)['"](?![`])/g, '\`${API_URL}$1\`');
    
    // Replace standard substrings inside template literals
    content = content.replace(/http:\/\/localhost:5000\/api/g, '${API_URL}');
    
    // Replace http://localhost:5000/uploads inside existing template literals OR standard quotes
    content = content.replace(/http:\/\/localhost:5000\/uploads/g, '${UPLOADS_URL}');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated ' + filePath);
    }
}

function walkDir(dir) {
    let list = fs.readdirSync(dir);
    list.forEach(function(file) {
        let fullPath = path.join(dir, file);
        let stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            walkDir(fullPath);
        } else if (file.endsWith('.jsx')) {
            processFile(fullPath);
        }
    });
}

walkDir(srcDir);
console.log('Done replacement script');
