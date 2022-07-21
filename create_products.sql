create table products (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  price integer
)

create table stocks (
  product_id uuid primary key default uuid_generate_v4(),
  count integer
)

create extension if not exists "uuid-ossp";
