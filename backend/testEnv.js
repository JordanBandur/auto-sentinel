// backend/testEnv.js

require('dotenv').config();

console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID);
console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY);
console.log('AWS_REGION:', process.env.AWS_REGION);
console.log('SES_VERIFIED_EMAIL:', process.env.SES_VERIFIED_EMAIL);
console.log('PORT:', process.env.PORT);