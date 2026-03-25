const { readFileSync } = require('fs');
const content = readFileSync('packages/domain/src/index.ts', 'utf-8');
console.log(content);
