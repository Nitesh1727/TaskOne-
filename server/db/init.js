import pool from "./config.js";

const createAndPopulateDB = async () => {
  try {
    // Create table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS terms_content (
        id SERIAL PRIMARY KEY,
        language_code VARCHAR(2) NOT NULL,
        title VARCHAR(100) NOT NULL,
        close_button_text VARCHAR(100) NOT NULL,
        content_body TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Table created successfully");

    // Check if data exists
    const existingData = await pool.query("SELECT * FROM terms_content");
    if (existingData.rows.length === 0) {
      // Insert Swedish content
      await pool.query(
        `
        INSERT INTO terms_content (language_code, title, close_button_text, content_body)
        VALUES ($1, $2, $3, $4)
      `,
        [
          "sv",
          "Villkor",
          "Stäng och gå tillbaka",
          "GENOM ATT klicka på Fakturera Nu så väljer ni att registrera enligt den information som ni har lagt in...",
        ]
      );

      // Insert English content
      await pool.query(
        `
        INSERT INTO terms_content (language_code, title, close_button_text, content_body)
        VALUES ($1, $2, $3, $4)
      `,
        [
          "en",
          "Terms",
          "Close and go back",
          "BY clicking on Invoice Now, you choose to register according to the information...",
        ]
      );

      console.log("Initial data inserted successfully");
    } else {
      console.log("Data already exists in the table");
    }
  } catch (err) {
    console.error("Database initialization error:", err);
    throw err;
  }
};

// Run initialization
createAndPopulateDB()
  .then(() => {
    console.log("Database initialization completed");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  });
