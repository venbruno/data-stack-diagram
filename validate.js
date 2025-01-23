const fs = require('fs');
const path = require('path');
const integrations = require('./integrations.json');
const { keys, difference } = require('ramda');

console.log("Validation");
console.log("==========");
console.log("");

// logos
const logosPath = path.resolve(__dirname, 'logos');

// Get all file names synchronously
try {
  const files = fs.readdirSync(logosPath);
  const logoNames = files.map(fileName => fileName.replace(/\.svg$/, ''));
  const integrationNames = keys(integrations);
  const missingLogos = difference(integrationNames, logoNames);
  if (missingLogos.length > 0) {
    console.log(`❌ ${missingLogos.length} logo${missingLogos.length === 1 ? '' : 's'} missing from ./logos`);
    console.log("");
    for (const logo of missingLogos) {
      console.log(`    - logo/${logo}.svg`);
    }
  } else {
    console.log(`✅ All logos defined in ./logos`);
  }
  console.log("");

  const missingIntegrations = difference(logoNames, integrationNames);
  if (missingIntegrations.length > 0) {
    console.log(`❌ ${missingIntegrations.length} integration${missingIntegrations.length === 1 ? '' : 's'} missing in integrations.json`);
    console.log("");
    for (const integration of missingIntegrations) {
      console.log(`    - ${integration}`);
    }
  } else {
    console.log(`✅ All integrations defined in integrations.json`);
  }

  if (missingIntegrations.length > 0 || missingLogos.length > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
} catch (error) {
  console.error('Validation failed:', error);
  process.exit(1);
}
