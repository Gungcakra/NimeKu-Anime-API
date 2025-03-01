import express from "express";
import {
  getNew,
  getNewPage,
  getAnimeList,
  getAnimeListPage,
  getSchedule,
  getGenres,
  getGenreId,
  getGenreIdPage,
  getSearch,
  getSearchPage,
  getAnimeDetail,
  getEpisode,
  getAZList,
} from "../controllers/scrapingController.js";

const router = express.Router();

router.get("/new", getNew);
router.get("/new/page/:pageNumber", getNewPage);
router.get("/anime", getAnimeList);
router.get("/anime/page/:pageNumber", getAnimeListPage);
router.get("/schedule", getSchedule);
router.get("/azlist", getAZList);
router.get("/genres", getGenres);
router.get("/genre/:genreId", getGenreId);
router.get("/genre/:genreId/page/:pageNumber", getGenreIdPage);
router.get("/search/:keyword", getSearch);
router.get("/search/:keyword/page/:pageNumber", getSearchPage);
router.get("/detail/:animeId", getAnimeDetail);
router.get("/watch/:episodeId", getEpisode); 

export default router;
