CREATE TABLE movies (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  director TEXT NOT NULL,
  year INTEGER NOT NULL,
  genre TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER,
  rating DOUBLE PRECISION,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
