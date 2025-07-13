const fs = require('fs');
const path = require('path');

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('new PrismaClient(')) {
        console.log(`⚠️ Found new PrismaClient() in: ${fullPath}`);
      }
    }
  }
}

scanDir('./');
