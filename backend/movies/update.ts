import { api, APIError } from "encore.dev/api";
import { moviesDB } from "./db";
import type { UpdateMovieRequest, Movie } from "./types";

// Updates an existing movie.
export const update = api<UpdateMovieRequest, Movie>(
  { expose: true, method: "PUT", path: "/movies/:id" },
  async (req) => {
    // First check if the movie exists
    const existingMovie = await moviesDB.queryRow<Movie>`
      SELECT id FROM movies WHERE id = ${req.id}
    `;

    if (!existingMovie) {
      throw APIError.notFound("movie not found");
    }

    // Build dynamic update query
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (req.title !== undefined) {
      updates.push(`title = $${paramIndex++}`);
      values.push(req.title);
    }
    if (req.director !== undefined) {
      updates.push(`director = $${paramIndex++}`);
      values.push(req.director);
    }
    if (req.year !== undefined) {
      updates.push(`year = $${paramIndex++}`);
      values.push(req.year);
    }
    if (req.genre !== undefined) {
      updates.push(`genre = $${paramIndex++}`);
      values.push(req.genre);
    }
    if (req.description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(req.description);
    }
    if (req.durationMinutes !== undefined) {
      updates.push(`duration_minutes = $${paramIndex++}`);
      values.push(req.durationMinutes);
    }
    if (req.rating !== undefined) {
      updates.push(`rating = $${paramIndex++}`);
      values.push(req.rating);
    }

    if (updates.length === 0) {
      throw APIError.invalidArgument("no fields to update");
    }

    updates.push(`updated_at = NOW()`);
    values.push(req.id);

    const query = `
      UPDATE movies 
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING id, title, director, year, genre, description, duration_minutes as "durationMinutes", rating, created_at as "createdAt", updated_at as "updatedAt"
    `;

    const movie = await moviesDB.rawQueryRow<Movie>(query, ...values);
    return movie!;
  }
);