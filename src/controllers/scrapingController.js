import { load } from "cheerio";
import { fetchPage } from "../utils/fetchPage.js";

export const getHome = async (req, res) => {
  try {
    const url = "https://hianime.to/home";
    const html = await fetchPage(url);
    const $ = load(html);

    const spotlight = [];
    $(".swiper-slide").each((index, element) => {
      const title = $(element).find(".desi-head-title").text().trim();
      const link =
        "https://hianime.to" +
        $(element).find(".desi-buttons a.btn-primary").attr("href");
      const imageSrc = $(element)
        .find(".deslide-cover-img img")
        .attr("data-src");
      const description = $(element).find(".desi-description").text().trim();
      const type = $(element).find(".scd-item").eq(0).text().trim();
      const duration = $(element).find(".scd-item").eq(1).text().trim();
      const releaseDate = $(element).find(".scd-item.m-hide").text().trim();
      const quality = $(element).find(".scd-item .quality").text().trim();
      const subCount = $(element).find(".tick-item.tick-sub").text().trim();
      const dubCount = $(element).find(".tick-item.tick-dub").text().trim();
      const episodeCount = $(element).find(".tick-item.tick-eps").text().trim();

      spotlight.push({
        title,
        link,
        imageSrc,
        description,
        type,
        duration,
        releaseDate,
        quality,
        subCount,
        dubCount,
        episodeCount,
      });
    });

    const filteredSpotlight = spotlight.filter(
      (item) => item.title && item.link && item.imageSrc
    );

    const trending = [];
    $(".block_area_trending .swiper-slide").each((index, element) => {
      const rank = $(element).find(".number span").text().trim();
      const title = $(element).find(".film-title").text().trim();
      const link =
        "https://hianime.to" + $(element).find("a.film-poster").attr("href");
      const imageSrc = $(element).find(".film-poster-img").attr("data-src");

      trending.push({
        rank,
        title,
        link,
        imageSrc,
      });
    });

    const latest = [];
    const newOn = [];
    const topUpcoming = [];

    $(".film_list-wrap .flw-item").each((index, element) => {
      const title = $(element).find(".film-name a").text().trim();
      const link =
        "https://hianime.to" +
        $(element).find(".film-poster-ahref").attr("href");
      const imageSrc = $(element).find(".film-poster-img").attr("data-src");
      const type = $(element).find(".fdi-item").eq(0).text().trim();
      const duration = $(element).find(".fdi-duration").text().trim();
      const subCount = $(element).find(".tick-item.tick-sub").text().trim();
      const dubCount = $(element).find(".tick-item.tick-dub").text().trim();
      const episodeCount = $(element).find(".tick-item.tick-eps").text().trim();

      const item = {
        title,
        link,
        imageSrc,
        type,
        duration,
        subCount,
        dubCount,
        episodeCount,
      };

      if (index < 12) {
        latest.push(item);
      } else if (index < 24) {
        newOn.push(item);
      } else {
        topUpcoming.push(item);
      }
    });

    const filteredLatest = latest.filter(
      (item) => item.title && item.link && item.imageSrc
    );
    const filteredNewOn = newOn.filter(
      (item) => item.title && item.link && item.imageSrc
    );
    const filteredTopUpcoming = topUpcoming.filter(
      (item) => item.title && item.link && item.imageSrc
    );

    res.json({
      spotlight: filteredSpotlight,
      trending,
      latest: filteredLatest,
      newOn: filteredNewOn,
      topUpcoming: filteredTopUpcoming,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while scraping data");
  }
};


export const getGenres = async (req, res) => {
  try {
    const url = "https://komikstation.co/manga/list-mode/";
    const html = await fetchPage(url);
    const $ = load(html);

    const genres = [];

    $(".dropdown-menu.c4.genrez li").each((index, element) => {
      const genreLabel = $(element).find("label").text().trim();
      const genreValue = $(element).find("input").val();

      if (genreLabel && genreValue) {
        genres.push({ label: genreLabel, value: genreValue });
      }
    });

    res.json({ genres });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

export const getGenreId = async (req, res) => {
  const { genreId } = req.params;
  const url = `https://komikstation.co/genres/${genreId}`;

  try {
    const html = await fetchPage(url);
    const $ = load(html);
    const seriesList = [];

    $(".bs").each((index, element) => {
      const series = {};
      const bsx = $(element).find(".bsx");

      series.title = bsx.find("a").attr("title");
      series.url = bsx.find("a").attr("href");
      series.image = bsx.find("img").attr("src");
      series.latestChapter = bsx.find(".epxs").text();
      series.rating = bsx.find(".numscore").text();

      seriesList.push(series);
    });

    const pagination = [];
    $(".pagination a.page-numbers").each((index, element) => {
      const pageUrl = $(element).attr("href");
      const pageNumber = $(element).text();
      pagination.push({ pageUrl, pageNumber });
    });

    const nextPage = $(".pagination a.next.page-numbers").attr("href");

    res.json({ seriesList, pagination, nextPage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data" });
  }
};

export const getGenreIdPage = async (req, res) => {
  const { genreId, pageNumber } = req.params;
  const url = `https://komikstation.co/genres/${genreId}/page/${pageNumber}`;

  try {
    const html = await fetchPage(url);
    const $ = load(html);
    const seriesList = [];

    $(".bs").each((index, element) => {
      const series = {};
      const bsx = $(element).find(".bsx");

      series.title = bsx.find("a").attr("title");
      series.url = bsx.find("a").attr("href");
      series.image = bsx.find("img").attr("src");
      series.latestChapter = bsx.find(".epxs").text();
      series.rating = bsx.find(".numscore").text();

      seriesList.push(series);
    });

    const pagination = [];
    $(".pagination a.page-numbers").each((index, element) => {
      const pageText = $(element).text().trim().toLowerCase();

      if (pageText !== "« sebelumnya" && pageText !== "berikutnya »") {
        const pageUrl = "hia" +  $(element).attr("href");
        const pageNumber = $(element).text();
        pagination.push({ pageUrl, pageNumber });
      }
    });

    res.json({ seriesList, pagination });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data" });
  }
};

export const getSearch = async (req, res) => {
  const { searchId } = req.params;
  const url = `https://hianime.to/search?keyword=${searchId}`;

  try {
    const html = await fetchPage(url);
    const $ = load(html);
    const seriesList = [];

    $(".flw-item").each((index, element) => {
      const title = $(element).find(".film-name a").text().trim();
      const link = "https://hianime.to" + $(element).find(".film-poster-ahref").attr("href");
      const imageSrc = $(element).find(".film-poster-img").attr("data-src");
      const type = $(element).find(".fdi-item").eq(0).text().trim();
      const duration = $(element).find(".fdi-duration").text().trim();
      const subCount = $(element).find(".tick-item.tick-sub").text().trim();
      const episodeCount = $(element).find(".tick-item.tick-eps").text().trim();

      seriesList.push({
        title,
        link,
        imageSrc,
        type,
        duration,
        subCount,
        episodeCount,
      });
    });

    const pagination = [];
    $(".pagination a.page-link").each((index, element) => {
      const pageUrl = "https://hianime.to" + $(element).attr("href");
      const pageNumber = $(element).text().trim();
      pagination.push({ pageUrl, pageNumber });
    });

    res.json({ seriesList, pagination });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data" });
  }
};

export const getSearchPage = async (req, res) => {
  const { searchId, pageNumber } = req.params;
  const url = `https://hianime.to/search?keyword=${searchId}&page=${pageNumber}`;

  try {
    const html = await fetchPage(url);
    const $ = load(html);
    const seriesList = [];

    $(".flw-item").each((index, element) => {
      const title = $(element).find(".film-name a").text().trim();
      const link = "https://hianime.to" + $(element).find(".film-poster-ahref").attr("href");
      const imageSrc = $(element).find(".film-poster-img").attr("data-src");
      const type = $(element).find(".fdi-item").eq(0).text().trim();
      const duration = $(element).find(".fdi-duration").text().trim();
      const subCount = $(element).find(".tick-item.tick-sub").text().trim();
      const episodeCount = $(element).find(".tick-item.tick-eps").text().trim();

      seriesList.push({
        title,
        link,
        imageSrc,
        type,
        duration,
        subCount,
        episodeCount,
      });
    });

    const pagination = [];
    $(".pagination a.page-link").each((index, element) => {
      const pageUrl = "https://hianime.to" + $(element).attr("href");
      const pageNumber = $(element).text().trim();
      pagination.push({ pageUrl, pageNumber });
    });

    res.json({ seriesList, pagination });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data" });
  }
};

export const getAnimeDetail = async (req, res) => {
  const { animeId } = req.params;
  const url = `https://hianime.to/${animeId}`;

  try {
    const html = await fetchPage(url);
    const $ = load(html);

    const title = $(".film-name.dynamic-name").text().trim();
    const imageSrc = $(".anisc-poster .film-poster-img").attr("src");
    const description = $(".film-description .text").text().trim();
    const japaneseTitle = $(".item-title:contains('Japanese:') .name").text().trim();
    const synonyms = $(".item-title:contains('Synonyms:') .name").text().trim();
    const aired = $(".item-title:contains('Aired:') .name").text().trim();
    const premiered = $(".item-title:contains('Premiered:') .name").text().trim();
    const duration = $(".item-title:contains('Duration:') .name").text().trim();
    const status = $(".item-title:contains('Status:') .name").text().trim();
    const malScore = $(".item-title:contains('MAL Score:') .name").text().trim();
    const watchUrl = "https://hianime.to" + $(".btn-play").attr("href");
    const genres = [];
    $(".item-list:contains('Genres:') a").each((index, element) => {
      genres.push($(element).text().trim());
    });
    const studios = [];
    $(".item-title:contains('Studios:') a").each((index, element) => {
      studios.push($(element).text().trim());
    });
    const producers = [];
    $(".item-title:contains('Producers:') a").each((index, element) => {
      producers.push($(element).text().trim());
    });

    const animeDetails = {
      title,
      imageSrc,
      description,
      japaneseTitle,
      synonyms,
      aired,
      premiered,
      duration,
      status,
      malScore,
      watchUrl,
      genres,
      studios,
      producers,
    };

    res.json(animeDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while scraping data");
  }
};



export const getChapter = async (req, res) => {
  const { chapterId } = req.params;
  const url = `https://komikstation.co/${chapterId}`;

  try {
    const html = await fetchPage(url);
    const $ = load(html);

    const title = $("h1.entry-title").text().trim();
    const manhwaLink = $(".ts-breadcrumb ol li").eq(1).find("a").attr("href");
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    await delay(250);

    const scriptContent = $("script")
      .filter((i, el) => {
        return $(el).html().includes("ts_reader.run");
      })
      .html();

    const jsonString = scriptContent.match(/ts_reader\.run\((.*?)\);/)[1];
    const jsonObject = JSON.parse(jsonString);

    const images = jsonObject.sources[0].images;

    const prevChapter = jsonObject.prevUrl || null;
    const nextChapter = jsonObject.nextUrl || null;

    const chapters = [];
    $(".nvx #chapter option").each((index, element) => {
      const chapterTitle = $(element).text().trim();
      const chapterUrl = $(element).attr("value") || null;

      chapters.push({
        title: chapterTitle,
        url: chapterUrl,
      });
    });

    const prevButtonUrl = $(".ch-prev-btn").attr("href") || null;
    const nextButtonUrl = $(".ch-next-btn").attr("href") || null;

    res.json({
      title,
      manhwaLink,
      images,
      prevChapter,
      nextChapter,
      chapters,
      prevButtonUrl,
      nextButtonUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch chapter data" });
  }
};

