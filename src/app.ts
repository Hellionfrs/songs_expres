import express from "express";
import bodyParser from "body-parser";
import {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
} from "./queries";
import { isValidNumber } from "./utils";

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Get all songs
app.get("/", (_req, res) => {
  res.redirect("/songs");
});

app.get("/songs", async (_req, res) => {
  const songs = await getAllSongs();
  res.json(songs);
});

// Get song by ID
app.get("/songs/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidNumber(id)) {
    res.status(400).json({
      error: "El ID de la canción debe ser un número entero positivo",
    });
    return;
  }
  const song = await getSongById(id);
  if (!song) {
    res.status(404).json({ error: `Cancion con id ${id} no encontrada ` });
    return;
  }
  res.json(song);
});

// Create a new song
app.post("/songs", async (req, res) => {
  const newSong = await createSong(req.body);
  res.json(newSong);
});

// Update a song by ID
app.put("/songs/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidNumber(id)) {
    res.status(400).json({
      error: "El ID de la canción debe ser un número entero positivo",
    });
    return;
  }
  const updatedSong = await updateSong(id, req.body);
  if (!updatedSong) {
    res.status(404).json({ error: "Canción no encontrada" });
    return;
  }
  res.json(updatedSong);
});

// Delete a song by ID
app.delete("/songs/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidNumber(id)) {
    res.status(400).json({
      error: "El ID de la canción debe ser un número entero positivo",
    });
    return;
  }
  const deletedSong = await deleteSong(id);
  if (!deletedSong) {
    res.status(404).json({ error: "Canción no encontrada" });
    return;
  }
  res.json(deletedSong);
});

app.use((_req, res, _next) => {
  res.status(404).json({ error: "Route not found, Try /songs" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
