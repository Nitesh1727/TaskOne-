import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const initDB = async () => {
  try {
    // Create the terms_content table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS terms_content (
        id SERIAL PRIMARY KEY,
        language_code VARCHAR(2) NOT NULL,
        title VARCHAR(100) NOT NULL,
        close_button_text VARCHAR(100) NOT NULL,
        menu_items JSONB NOT NULL,
        content_body TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insert Swedish content
    await pool.query(
      `
      INSERT INTO terms_content (
        language_code, 
        title, 
        close_button_text, 
        menu_items,
        content_body
      ) VALUES ($1, $2, $3, $4, $5)
    `,
      [
        "sv",
        "Villkor",
        "Stäng och gå tillbaka",
        JSON.stringify({
          home: "Hem",
          order: "Beställ",
          customers: "Våra Kunder",
          about: "Om oss",
          contact: "Kontakta oss",
        }),
        `GENOM ATT klicka på Fakturera Nu så väljer ni att registrera enligt den information...`,
      ]
    );

    // Insert English content
    await pool.query(
      `
      INSERT INTO terms_content (
        language_code, 
        title, 
        close_button_text, 
        menu_items,
        content_body
      ) VALUES ($1, $2, $3, $4, $5)
    `,
      [
        "en",
        "Terms",
        "Close and go back",
        JSON.stringify({
          home: "Home",
          order: "Order",
          customers: "Our Customers",
          about: "About us",
          contact: "Contact us",
        }),
        `BY clicking on Invoice Now, you choose to register according to the information...`,
      ]
    );

    console.log("✅ Database initialized successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error initializing database:", err);
    process.exit(1);
  }
};

initDB();
