//===========================================
//                                           
//  ##   ##   ####  #####  #####     ####  
//  ##   ##  ##     ##     ##  ##   ##     
//  ##   ##   ###   #####  #####     ###   
//  ##   ##     ##  ##     ##  ##      ##  
//   #####   ####   #####  ##   ##  ####   
//                                           
//===========================================


CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR (50) NOT NULL UNIQUE,
  password VARCHAR (200) NOT NULL DEFAULT '',

  contact_number VARCHAR (50) NOT NULL DEFAULT '',
  first_name VARCHAR (50) NOT NULL DEFAULT '',
  surname VARCHAR (50) NOT NULL DEFAULT '',
  gender gender DEFAULT 'OTHER',

  is_active BOOLEAN DEFAULT TRUE,
  is_verified BOOLEAN DEFAULT FALSE,
  is_blocked BOOLEAN DEFAULT FALSE,
  is_archive BOOLEAN DEFAULT FALSE,

  business_name VARCHAR(100) NOT NULL DEFAULT '',
  business_category VARCHAR(100) NOT NULL DEFAULT '',
  business_size VARCHAR(100) NOT NULL DEFAULT '',
  permission INT NOT NULL DEFAULT 0,
  reseller_id INT NOT NULL DEFAULT 0,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  archived_at TIMESTAMP
);

-- Create Update Trigger
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "users"
FOR EACH ROW
EXECUTE PROCEDURE trg_timestamp();

-- Create Indexes
CREATE INDEX "users_reseller_id" ON "users"("reseller_id");

-- Password is 12345678 and hashed by bcryptjs salt 7
INSERT INTO users 
  (
    email, password, contact_number,
    first_name, surname, gender, is_verified
  )
VALUES
  (
    'a@a.com', '$2a$07$r66gkFrxBP5L5/XSd4No4eY.Z/UGu.56F/neHhsLjAwydlPvUnocO', '09123456789',
    'ahmad', 'akbari', 'MALE', TRUE
  );

SELECT * FROM users;