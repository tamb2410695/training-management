import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.join(__dirname, 'src');

const blacklist = ['node_modules', 'assets', 'styles', 'index.js', 'main.js', 'App.js'];

const getExportName = (filename) => path.parse(filename).name;

function buildIndexForFolder(dirPath) {
  const items = fs.readdirSync(dirPath);
  const exportLines = [];

  items.forEach((item) => {
    if (item.startsWith('.') || blacklist.includes(item)) {
      return;
    }

    const itemPath = path.join(dirPath, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      const hasContent = buildIndexForFolder(itemPath);
      if (hasContent) {
        exportLines.push(`export * from './${item}';`);
      }
    } else if (stats.isFile() && /\.(js|jsx|ts|tsx)$/.test(item)) {
      exportLines.push(`export * from "./${getExportName(item)}";`);
    }
  });

  if (exportLines.length > 0) {
    const indexContent = exportLines.join('\n') + '\n';
    fs.writeFileSync(path.join(dirPath, 'index.js'), indexContent, 'utf8');
    console.log(`Da tao index.js cho: ${path.relative(targetDir, dirPath) || 'src (goc)'}`);
    return true;
  }

  return false;
}

if (fs.existsSync(targetDir)) {
  console.log('Bat dau quet toan bo thu muc src...');
  buildIndexForFolder(targetDir);
  console.log('Hoan thanh!');
} else {
  console.error('Khong tim thay thu muc src. Vui long dat script cung cap voi thu muc src.');
}