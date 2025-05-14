CREATE TABLE terms_content (
  id SERIAL PRIMARY KEY,
  language_code VARCHAR(2) NOT NULL,
  title VARCHAR(100) NOT NULL,
  close_button_text VARCHAR(100) NOT NULL,
  content_body TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Swedish content
INSERT INTO terms_content (language_code, title, close_button_text, content_body)
VALUES (
  'sv',
  'Villkor',
  'Stäng och gå tillbaka',
  'GENOM ATT klicka på Fakturera Nu... [rest of Swedish content]'
);

-- Insert English content
INSERT INTO terms_content (language_code, title, close_button_text, content_body)
VALUES (
  'en',
  'Terms',
  'Close and go back',
  'BY clicking on Invoice Now... [rest of English content]'
);
