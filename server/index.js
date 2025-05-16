import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";
import { fileURLToPath } from "url";
import { dirname } from "path";

const { Pool } = pg;
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
    require: true,
  },
});

const app = express();
const port = process.env.PORT || 8001;
const host = process.env.HOST || "0.0.0.0";

// Update CORS configuration
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());

// Test and log database connection
const testDatabaseConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Successfully connected to PostgreSQL database");

    // Test query to check if table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'terms_content'
      );
    `);

    if (tableCheck.rows[0].exists) {
      const contentCheck = await client.query(
        "SELECT COUNT(*) FROM terms_content"
      );
      console.log(
        `📝 Found ${contentCheck.rows[0].count} records in terms_content table`
      );
    } else {
      console.log("⚠️ Table terms_content does not exist yet");
    }

    client.release();
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
    process.exit(1);
  }
};

// Initialize server with database check
const startServer = async () => {
  await testDatabaseConnection();

  app.listen(port, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${port}`);
    console.log(`📱 Access on local network: http://YOUR_IP_ADDRESS:${port}`);
  });
};

// Get terms content by language
app.get("/api/terms/:language", async (req, res) => {
  try {
    const { language } = req.params;
    const query = `
      SELECT title, close_button_text, menu_items, content_body 
      FROM terms_content 
      WHERE language_code = $1
    `;
    const result = await pool.query(query, [language]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: `Content not found for language: ${language}`,
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({
      error: "Error fetching content",
      details: err.message,
    });
  }
});

// Start the server
startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
