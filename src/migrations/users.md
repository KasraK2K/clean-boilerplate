# Users Table

## Information

This table is useful to hold users and admins

### Create Table

```postgres
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
  is_admin BOOLEAN DEFAULT FALSE,
  is_super_admin BOOLEAN DEFAULT FALSE,
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
```

### Create Index

- For create unique indexe you can use `CREATE UNIQUE INDEX` ...

```postgres
CREATE INDEX "users_is_admin" ON "users"("is_admin");
```

### Insert First User

Password is 12345678 and hashed by bcryptjs salt 7

```postgres
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
```

### Select All Users

```postgres
SELECT * FROM users;
```
