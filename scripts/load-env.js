const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

const envPath = path.resolve(__dirname, '../environments', '.env');

if (!fs.existsSync(envPath)) {
  console.error(`🔴 File not found: ${envPath}`);
  process.exit(1);
}

dotenv.config({ path: envPath });
`🟢 Variables loaded from: ${envPath}`;
