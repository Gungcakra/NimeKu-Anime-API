import { load } from "cheerio";
import { fetchPage } from "../utils/fetchPage.js";

export const getHome = async (req, res) => {
  try {
    const url = "https://samehadaku.mba/";
    const html = await fetchPage(url);
    const $ = load(html);

    const newUpdate = [];
    $(
      'li[itemscope="itemscope"][itemtype="http://schema.org/CreativeWork"]'
    ).each((index, element) => {
      const title = $(element).find(".entry-title a").text().trim();
      const link = $(element).find(".entry-title a").attr("href");
      const imageSrc = $(element).find(".thumb img").attr("src");
      const episode = $(element)
        .find('.dtla span b:contains("Episode")')
        .next("author")
        .text()
        .trim();
      const postedBy = $(element)
        .find('.dtla span[itemprop="author"] author')
        .text()
        .trim();
      const releasedOn = $(element)
        .find('.dtla span:contains("Released on")')
        .text()
        .replace("Released on:", "")
        .trim();

      newUpdate.push({
        title,
        link,
        imageSrc,
        episode,
        postedBy,
        releasedOn,
      });
    });

    res.json({ newUpdate });
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
        const pageUrl = "hia" + $(element).attr("href");
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
      const link =
        "https://hianime.to" +
        $(element).find(".film-poster-ahref").attr("href");
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
      const link =
        "https://hianime.to" +
        $(element).find(".film-poster-ahref").attr("href");
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
    const japaneseTitle = $(".item-title:contains('Japanese:') .name")
      .text()
      .trim();
    const synonyms = $(".item-title:contains('Synonyms:') .name").text().trim();
    const aired = $(".item-title:contains('Aired:') .name").text().trim();
    const premiered = $(".item-title:contains('Premiered:') .name")
      .text()
      .trim();
    const duration = $(".item-title:contains('Duration:') .name").text().trim();
    const status = $(".item-title:contains('Status:') .name").text().trim();
    const malScore = $(".item-title:contains('MAL Score:') .name")
      .text()
      .trim();
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

export const getEpisode = async (req, res) => {
  const { episodeId } = req.params;
  const url = `https://hianime.to/watch/${episodeId}`;

  try {
    const html = await fetchPage(url);
    const $ = load(html);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const videoSrc = $("video.jw-video").attr("src");

    const episodes = [];
    $(".ss-list .ssl-item").each((index, element) => {
      const title = $(element).find(".ep-name").text().trim();
      const episodeLink = "https://hianime.to" + $(element).attr("href");
      const episodeNumber = $(element).data("number");

      episodes.push({
        title,
        episodeLink,
        episodeNumber,
      });
    });

    res.json({
      videoSrc,
      episodes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch episode data" });
  }
};
