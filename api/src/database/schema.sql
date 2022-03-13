CREATE DATABASE verzel;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS modules (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS classes (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  module VARCHAR NOT NULL,
  class_date TIMESTAMP NOT NULL,
  FOREIGN KEY(module) REFERENCES modules(name)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS users (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  username VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  is_admin BOOLEAN NOT NULL
);