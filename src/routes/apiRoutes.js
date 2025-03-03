import express from "express";
import {
  getNew,
  getNewPage,
  getAnimeList,
  getAnimeListPage,
  getMovie,
  getSchedule,
  getGenres,
  getAnimeByGenre,
  getAnimeByGenrePage,
  getSearch,
  getSearchPage,
  getAnimeDetail,
  getEpisode,
  getAZList,
  getStreamLink
} from "../controllers/scrapingController.js";

const router = express.Router();

router.get("/new", getNew);
router.get("/new/page/:pageNumber", getNewPage);
router.get("/anime", getAnimeList);
router.get("/anime/page/:pageNumber", getAnimeListPage);
router.get("/movie", getMovie);
router.get("/schedule", getSchedule);
router.get("/azlist", getAZList);
router.get("/genres", getGenres);
router.get("/genre/:genreId", getAnimeByGenre);
router.get("/genre/:genreId/page/:pageNumber", getAnimeByGenrePage);
router.get("/search/:keyword", getSearch);
router.get("/search/:keyword/page/:pageNumber", getSearchPage);
router.get("/detail/:animeId", getAnimeDetail);
router.get("/watch/:episodeId", getEpisode); 
router.get("/stream/:streamId", getStreamLink); 

export default router;
