export interface CreateMovieRequest {
  title: string;
  director: string;
  year: number;
  genre: string;
  description?: string;
  durationMinutes?: number;
  rating?: number;
}

export interface Movie {
  id: number;
  title: string;
  director: string;
  year: number;
  genre: string;
  description?: string;
  durationMinutes?: number;
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetMovieRequest {
  id: number;
}

export interface UpdateMovieRequest {
  id: number;
  title?: string;
  director?: string;
  year?: number;
  genre?: string;
  description?: string;
  durationMinutes?: number;
  rating?: number;
}

export interface DeleteMovieRequest {
  id: number;
}

export interface ListMoviesRequest {
  limit?: number;
  offset?: number;
}

export interface ListMoviesResponse {
  movies: Movie[];
  total: number;
}