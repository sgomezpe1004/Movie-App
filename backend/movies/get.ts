import { api, APIError } from "encore.dev/api";
import { moviesDB } from "./db";
import type { GetMovieRequest, Movie } from "./types";

// Retrieves a movie by its ID.
export const get = api<GetMovieRequest, Movie>(
  { expose: true, method: "GET", path: "/movies/:id" },
  async (req) => {
    const movie = await moviesDB.queryRow<Movie>`
      SELECT id, title, director, year, genre, description, duration_minutes as "durationMinutes", rating, created_at as "createdAt", updated_at as "updatedAt"
      FROM movies
      WHERE id = ${req.id}
    `;

    if (!movie) {
      throw APIError.notFound("movie not found");
    }

    return movie;
  }
);