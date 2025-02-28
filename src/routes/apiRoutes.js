import express from "express";
import {
  getHome,
  getGenres,
  getGenreId,
  getGenreIdPage,
  getSearch,
  getSearchPage,
  getAnimeDetail,
  getEpisode
} from "../controllers/scrapingController.js";

const router = express.Router();

router.get("/home", getHome);
router.get("/genres", getGenres);
router.get("/genre/:genreId", getGenreId);
router.get("/genre/:genreId/page/:pageNumber", getGenreIdPage);
router.get("/search/:searchId", getSearch);
router.get("/search/:searchId/page/:pageNumber", getSearchPage);
router.get("/detail/:animeId", getAnimeDetail);
router.get("/watch/:episodeId", getEpisode); 

export default router;
