const fs = require('fs');
require('dotenv').config();

const dir = './src/environments';
const targetPath = './src/environments/environment.ts';
const targetPathProd = './src/environments/environment.prod.ts';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const envConfigFile = `export const environment = {
  production: ${process.env.NODE_ENV === 'production'},
  contentful: {
    spaceId: '${process.env.CONTENTFUL_SPACE_ID || ""}',
    accessToken: '${process.env.CONTENTFUL_ACCESS_TOKEN || ""}'
  }
};
`;

fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.error(err);
    throw err;
  }
  console.log(`✅ Generated file: ${targetPath}`);
});

fs.writeFile(targetPathProd, envConfigFile, function (err) {
  if (err) {
    console.error(err);
    throw err;
  }
  console.log(`✅ Generated file: ${targetPathProd}`);
});