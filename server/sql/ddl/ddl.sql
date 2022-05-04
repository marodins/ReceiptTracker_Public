
CREATE TABLE Users(
user_id SERIAL PRIMARY KEY,
email varchar(255) NOT NULL,
password varchar(255) NOT NULL,
UNIQUE (email));

CREATE TABLE Receipts(
  receipt_id SERIAL PRIMARY KEY,
  store varchar(255),
  receipt_date DATE,
  fk_user_receipt int REFERENCES users(user_id)
  ON DELETE CASCADE
);

CREATE TABLE Items(
  item_id SERIAL PRIMARY KEY,
  item_name varchar(255) NOT NULL,
  item_price FLOAT,
  receipt_id INT,
  fk_item_receipt int REFERENCES Receipts(receipt_id)
  ON DELETE CASCADE
);
