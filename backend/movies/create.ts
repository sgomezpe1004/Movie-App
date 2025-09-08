import { api } from "encore.dev/api";
import { moviesDB } from "./db";
import type { CreateMovieRequest, Movie } from "./types";

// Creates a new movie.
export const create = api<CreateMovieRequest, Movie>(
  { expose: true, method: "POST", path: "/movies" },
  async (req) => {
    const movie = await moviesDB.queryRow<Movie>`
      INSERT INTO movies (title, director, year, genre, description, duration_minutes, rating)
      VALUES (${req.title}, ${req.director}, ${req.year}, ${req.genre}, ${req.description || null}, ${req.durationMinutes || null}, ${req.rating || null})
      RETURNING id, title, director, year, genre, description, duration_minutes as "durationMinutes", rating, created_at as "createdAt", updated_at as "updatedAt"
    `;
    
    return movie!;
  }
);