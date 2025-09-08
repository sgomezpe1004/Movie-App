import { api } from "encore.dev/api";
import { Query } from "encore.dev/api";
import { moviesDB } from "./db";
import type { Movie, ListMoviesResponse } from "./types";

export interface ListMoviesRequest {
  limit?: Query<number>;
  offset?: Query<number>;
}

// Retrieves all movies, with optional pagination.
export const list = api<ListMoviesRequest, ListMoviesResponse>(
  { expose: true, method: "GET", path: "/movies" },
  async (req) => {
    const limit = req.limit || 50;
    const offset = req.offset || 0;

    const movies = await moviesDB.queryAll<Movie>`
      SELECT id, title, director, year, genre, description, duration_minutes as "durationMinutes", rating, created_at as "createdAt", updated_at as "updatedAt"
      FROM movies
      ORDER BY created_at DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    const totalResult = await moviesDB.queryRow<{ count: number }>`
      SELECT COUNT(*) as count FROM movies
    `;

    return {
      movies,
      total: totalResult?.count || 0
    };
  }
);