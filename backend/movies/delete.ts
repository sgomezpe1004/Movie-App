import { api, APIError } from "encore.dev/api";
import { moviesDB } from "./db";
import type { DeleteMovieRequest } from "./types";

// Deletes a movie by its ID.
export const deleteMovie = api<DeleteMovieRequest, void>(
  { expose: true, method: "DELETE", path: "/movies/:id" },
  async (req) => {
    const result = await moviesDB.queryRow<{ count: number }>`
      DELETE FROM movies WHERE id = ${req.id}
      RETURNING 1 as count
    `;

    if (!result) {
      throw APIError.notFound("movie not found");
    }
  }
);