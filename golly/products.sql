CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  shop text,
  name text,
  description text,
  price integer,
  category text,
  image_url text
);

CREATE INDEX ON products (shop);

INSERT INTO products (shop, name, description, price, category)
VALUES ('teaguild.com.ua', 'tea', 'some cool tea', 100, 'teas');

INSERT INTO products (shop, name, description, price, category)
VALUES ('teaguild.com.ua', 'coffee', 'some cool tea', 42, 'teas');

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  name text,
  city text,
  address text,
  phone text
);

CREATE TABLE line_items (
  id SERIAL PRIMARY KEY,
  order_id integer,
  product_id integer,
  count integer
);
