--======================================================================================================
--                                                                                                      
--  #####    ####           ####   #####   ###    ###  ###    ###    ###    ##     ##  ####     ####  
--  ##  ##  ##             ##     ##   ##  ## #  # ##  ## #  # ##   ## ##   ####   ##  ##  ##  ##     
--  #####   ##  ###        ##     ##   ##  ##  ##  ##  ##  ##  ##  ##   ##  ##  ## ##  ##  ##   ###   
--  ##      ##   ##        ##     ##   ##  ##      ##  ##      ##  #######  ##    ###  ##  ##     ##  
--  ##       ####           ####   #####   ##      ##  ##      ##  ##   ##  ##     ##  ####    ####   
--                                                                                                      
--======================================================================================================


CREATE TYPE gender AS ENUM ('MALE', 'FEMALE', 'TRANSSEXUAL', 'OTHER');

CREATE SEQUENCE user_id_seq;

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  no smallint NOT NULL DEFAULT nextval('user_id_seq'),
  email VARCHAR (50) NOT NULL UNIQUE,
  password VARCHAR (200) NOT NULL,

  phone VARCHAR (50),
  first_name VARCHAR (50),
  last_name VARCHAR (50),
  gender gender DEFAULT 'OTHER',

  is_active BOOLEAN DEFAULT TRUE,
  is_verified BOOLEAN DEFAULT FALSE,
  is_admin BOOLEAN DEFAULT FALSE,
  is_super_admin BOOLEAN DEFAULT FALSE,
  is_blocked BOOLEAN DEFAULT FALSE

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
);

-- To fild user/admin faster
CREATE INDEX "users_admin_key" ON "users"("is_admin");

-- Password is 12345678 and hashed by bcryptjs salt 7
INSERT INTO users 
  (
    email, password, phone,
    first_name, last_name, gender, is_active, is_verified, is_admin, is_super_admin, is_blocked
  )
VALUES
  (
    'kasra.karami.kk@gmail.com', '$2a$07$r66gkFrxBP5L5/XSd4No4eY.Z/UGu.56F/neHhsLjAwydlPvUnocO', '09123456789',
    'Kasra', 'Karami', 'MALE', TRUE, TRUE, TRUE, TRUE, FALSE
  );

SELECT * FROM users;