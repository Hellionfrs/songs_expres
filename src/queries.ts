import pool from "./db";

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: number;
  genre: string;
}
// Get all songs
const getAllSongs = async (): Promise<Song[]> => {
  const result = await pool.query("SELECT * FROM canciones");
  return result.rows;
};

// Get song by ID
const getSongById = async (id: string): Promise<Song | undefined> => {
  const result = await pool.query("SELECT * FROM canciones WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

// Create a new song
const createSong = async (data: Omit<Song, "id">): Promise<Song> => {
  const result = await pool.query(
    "INSERT INTO canciones (title, artist, album, year, genre) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [data.title, data.artist, data.album, data.year, data.genre]
  );
  return result.rows[0];
};

// Update a song by ID
const updateSong = async (
  id: string,
  data: Partial<Omit<Song, "id">>
): Promise<Song | undefined> => {
  const { title, artist, album, year, genre } = data;
  const result = await pool.query(
    "UPDATE canciones SET title = COALESCE($2, title), artist = COALESCE($3, artist), album = COALESCE($4, album), year = COALESCE($5, year), genre = COALESCE($6, genre) WHERE id = $1 RETURNING *",
    [id, title, artist, album, year, genre]
  );
  return result.rows[0];
};

// Delete a song by ID
const deleteSong = async (id: string): Promise<Song | undefined> => {
  const result = await pool.query(
    "DELETE FROM canciones WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

export { getAllSongs, getSongById, createSong, updateSong, deleteSong };
