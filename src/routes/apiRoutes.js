import express from "express";
import {
  getNew,
  getAnimeList,
  getMovie,
  getPopular,
  getSchedule,
  getGenres,
  getAnimeByGenre,
  getSearch,
  getAnimeDetail,
  getEpisode,
  getAZList,
  getStreamLink
} from "../controllers/scrapingController.js";

const router = express.Router();

router.get("/new/page/:pageNumber", getNew);
router.get("/anime/page/:pageNumber", getAnimeList);
router.get("/movie/page/:pageNumber", getMovie);
router.get("/popular/page/:pageNumber", getPopular);
router.get("/schedule", getSchedule);
router.get("/azlist", getAZList);
router.get("/genres", getGenres);
router.get("/genre/:genreId", getAnimeByGenre);
router.get("/genre/:genreId/page/:pageNumber", getAnimeByGenre);
router.get("/search/:keyword", getSearch);
router.get("/search/:keyword/page/:pageNumber", getSearch);
router.get("/detail/:animeId", getAnimeDetail);
router.get("/watch/:episodeId", getEpisode); 
router.get("/stream/:streamId", getStreamLink); 

export default router;
