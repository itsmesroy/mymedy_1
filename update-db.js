const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const updates = [
  { name: 'MY Anion Pad', image: '/products/Anion Pad - P1_20250301_133526_0035.png' },
  { name: 'MY Liner', image: '/products/Liner- P1_20250301_133527_0049.png' },
  { name: 'MY Tampon', image: '/products/Tampon - P1_20250301_133527_0059.png' },
  { name: 'MY Cup', image: '/products/M Cup - P1_20250301_133527_0056.png' },
  { name: 'MY Wash', image: '/products/Intimate Wash- P1_20250301_133527_0071.png' },
  { name: 'MY Sanitizer', image: '/products/Sanitizer- P1_20250301_133527_0083.png' },
  { name: 'MY Mist', image: '/products/Body Mist- P1_20250301_133527_0074.png' },
  { name: 'MY Gyno Wipes', image: '/products/Gyno Wipes- P1_20250301_133527_0068.png' }
];

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');

  updates.forEach(update => {
    db.query(
      'UPDATE products SET image = ? WHERE name = ?',
      [update.image, update.name],
      (err, result) => {
        if (err) {
          console.error(`Error updating ${update.name}:`, err);
        } else {
          console.log(`Updated ${update.name} with image ${update.image}`);
        }
      }
    );
  });

  // Close the connection after all updates
  setTimeout(() => {
    db.end();
    console.log('Database connection closed');
  }, 1000);
}); 