import { load } from "cheerio";
import { fetchPage, postPage } from "../utils/fetchPage.js";

export const getNew = async (req, res) => {
  try {
    const url = "https://samehadaku.mba/anime-terbaru/";
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

    const pagination = [];
    $(".pagination a.page-numbers, .pagination a.arrow_pag").each(
      (index, element) => {
        const pageUrl = $(element).attr("href");
        const pageNumber =
          $(element).text().trim() || $(element).attr("aria-label") || "Next";
        pagination.push({ pageUrl, pageNumber });
      }
    );
    const currentPage = $(".pagination .current").text().trim();
    const totalPages = $(".pagination span")
      .first()
      .text()
      .match(/Page \d+ of (\d+)/)[1];
    pagination.unshift({ currentPage, totalPages });

    res.json({ newUpdate, pagination });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while scraping data");
  }
};

export const getNewPage = async (req, res) => {
  const { pageNumber } = req.params;
  try {
    const url = `https://samehadaku.mba/anime-terbaru/page/${pageNumber}`;
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

    const pagination = [];
    $(".pagination a.page-numbers, .pagination a.arrow_pag").each(
      (index, element) => {
        const pageUrl = $(element).attr("href");
        const pageNumber =
          $(element).text().trim() || $(element).attr("aria-label") || "Next";
        pagination.push({ pageUrl, pageNumber });
      }
    );
    const currentPage = $(".pagination .current").text().trim();
    const totalPages = $(".pagination span")
      .first()
      .text()
      .match(/Page \d+ of (\d+)/)[1];
    pagination.unshift({ currentPage, totalPages });

    res.json({ newUpdate, pagination });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while scraping data");
  }
};

export const getAnimeList = async (req, res) => {
  try {
    const url = `https://samehadaku.mba/daftar-anime-2/`;
    const html = await fetchPage(url);
    const $ = load(html);

    const animeList = [];
    $(".animepost").each((index, element) => {
      const title = $(element).find(".title h2").text().trim();
      const link = $(element).find("a").attr("href");
      const imageSrc = $(element).find("img").attr("src");
      const type = $(element).find(".type").first().text().trim();
      const score = $(element).find(".score").text().trim();
      const status = $(element).find(".data .type").text().trim();
      const views = $(element).find(".metadata span").eq(2).text().trim();
      const description = $(element).find(".ttls").text().trim();
      const genres = [];
      $(element)
        .find(".genres .mta a")
        .each((i, el) => {
          genres.push($(el).text().trim());
        });

      animeList.push({
        title,
        link,
        imageSrc,
        type,
        score,
        status,
        views,
        description,
        genres,
      });
    });

    const pagination = [];
    $(".pagination a.page-numbers, .pagination a.arrow_pag").each(
      (index, element) => {
        const pageUrl = $(element).attr("href");
        const pageNumber =
          $(element).text().trim() || $(element).attr("aria-label") || "Next";
        pagination.push({ pageUrl, pageNumber });
      }
    );
    const currentPage = $(".pagination .current").text().trim();
    const totalPages = $(".pagination span")
      .first()
      .text()
      .match(/Page \d+ of (\d+)/)[1];
    pagination.unshift({ currentPage, totalPages });

    res.json({ animeList, pagination });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while scraping data");
  }
};

export const getAnimeListPage = async (req, res) => {
  const { pageNumber } = req.params;
  try {
    const url = `https://samehadaku.mba/daftar-anime-2/page/${pageNumber}/`;
    const html = await fetchPage(url);
    const $ = load(html);

    const animeList = [];
    $(".animepost").each((index, element) => {
      const title = $(element).find(".title h2").text().trim();
      const link = $(element).find("a").attr("href");
      const imageSrc = $(element).find("img").attr("src");
      const type = $(element).find(".type").first().text().trim();
      const score = $(element).find(".score").text().trim();
      const status = $(element).find(".data .type").text().trim();
      const views = $(element).find(".metadata span").eq(2).text().trim();
      const description = $(element).find(".ttls").text().trim();
      const genres = [];
      $(element)
        .find(".genres .mta a")
        .each((i, el) => {
          genres.push($(el).text().trim());
        });

      animeList.push({
        title,
        link,
        imageSrc,
        type,
        score,
        status,
        views,
        description,
        genres,
      });
    });

    const pagination = [];
    $(".pagination a.page-numbers, .pagination a.arrow_pag").each(
      (index, element) => {
        const pageUrl = $(element).attr("href");
        const pageNumber =
          $(element).text().trim() || $(element).attr("aria-label") || "Next";
        pagination.push({ pageUrl, pageNumber });
      }
    );
    const currentPage = $(".pagination .current").text().trim();
    const totalPages = $(".pagination span")
      .first()
      .text()
      .match(/Page \d+ of (\d+)/)[1];
    pagination.unshift({ currentPage, totalPages });

    res.json({ animeList, pagination });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while scraping data");
  }
};

export const getSchedule = async (req, res) => {
  try {
    const days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];
    const schedule = {};

    for (const day of days) {
      const url = `https://samehadaku.mba/wp-json/custom/v1/all-schedule?day=${day}`;
      const response = await fetchPage(url);
      schedule[day] = response;
    }
    res.json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while fetching data");
  }
};

export const getAZList = async (req, res) => {
  try {
    const url = "https://samehadaku.mba/daftar-anime-2/?list";
    const html = await fetchPage(url);
    const $ = load(html);

    const azList = {};

    $(".listbar").each((index, element) => {
      const name = $(element).find(".listabj a").text().trim();
      const titles = [];

      $(element)
        .find(".listttl ul li a")
        .each((i, el) => {
          const title = $(el).text().trim();
          const link = $(el).attr("href");
          titles.push({ title, link });
        });

      azList[name] = titles;
    });

    res.json(azList);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while fetching data");
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
  const { keyword } = req.params;
  try {
    const url = `https://samehadaku.mba/?s=${keyword}`;
    const html = await fetchPage(url);
    const $ = load(html);

    const animeList = [];
    $(".animepost").each((index, element) => {
      const title = $(element).find(".title h2").text().trim();
      const link = $(element).find("a").attr("href");
      const imageSrc = $(element).find("img").attr("src");
      const type = $(element).find(".type").first().text().trim();
      const score = $(element).find(".score").text().trim();
      const status = $(element).find(".data .type").text().trim();
      const views = $(element).find(".metadata span").eq(2).text().trim();
      const description = $(element).find(".ttls").text().trim();
      const genres = [];
      $(element)
        .find(".genres .mta a")
        .each((i, el) => {
          genres.push($(el).text().trim());
        });

      animeList.push({
        title,
        link,
        imageSrc,
        type,
        score,
        status,
        views,
        description,
        genres,
      });
    });

    const pagination = [];
    $(".pagination a.page-numbers, .pagination a.arrow_pag").each(
      (index, element) => {
        const pageUrl = $(element).attr("href");
        const pageNumber =
          $(element).text().trim() || $(element).attr("aria-label") || "Next";
        pagination.push({ pageUrl, pageNumber });
      }
    );
    const currentPage = $(".pagination .current").text().trim();
    const totalPages = $(".pagination span")
      .first()
      .text()
      .match(/Page \d+ of (\d+)/)[1];
    pagination.unshift({ currentPage, totalPages });

    res.json({ animeList, pagination });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while scraping data");
  }
};

export const getSearchPage = async (req, res) => {
  const { keyword } = req.params;
  const { pageNumber } = req.params;
  try {
    const url = `https://samehadaku.mba/page/${pageNumber}/?s=${keyword}`;
    const html = await fetchPage(url);
    const $ = load(html);

    const animeList = [];
    $(".animepost").each((index, element) => {
      const title = $(element).find(".title h2").text().trim();
      const link = $(element).find("a").attr("href");
      const imageSrc = $(element).find("img").attr("src");
      const type = $(element).find(".type").first().text().trim();
      const score = $(element).find(".score").text().trim();
      const status = $(element).find(".data .type").text().trim();
      const views = $(element).find(".metadata span").eq(2).text().trim();
      const description = $(element).find(".ttls").text().trim();
      const genres = [];
      $(element)
        .find(".genres .mta a")
        .each((i, el) => {
          genres.push($(el).text().trim());
        });

      animeList.push({
        title,
        link,
        imageSrc,
        type,
        score,
        status,
        views,
        description,
        genres,
      });
    });

    const pagination = [];
    $(".pagination a.page-numbers, .pagination a.arrow_pag").each(
      (index, element) => {
        const pageUrl = $(element).attr("href");
        const pageNumber =
          $(element).text().trim() || $(element).attr("aria-label") || "Next";
        pagination.push({ pageUrl, pageNumber });
      }
    );
    const currentPage = $(".pagination .current").text().trim();
    const totalPages = $(".pagination span")
      .first()
      .text()
      .match(/Page \d+ of (\d+)/)[1];
    pagination.unshift({ currentPage, totalPages });

    res.json({ animeList, pagination });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while scraping data");
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
  const url = `https://samehadaku.mba/${episodeId}`;
  const originUrl = "https://samehadaku.mba";

  try {
    const html = await fetchPage(url);
    const $ = load(html);

    const videoSrc = $("#player_embed iframe").attr("src");

    const downloadLinks = [];
    $(".download-eps ul li").each((index, element) => {
      const quality = $(element).find("strong").text().trim();
      const links = [];
      $(element)
        .find("span a")
        .each((i, el) => {
          const link = $(el).attr("href");
          const provider = $(el).text().trim();
          links.push({ provider, link });
        });
      downloadLinks.push({ quality, links });
    });

    const title = $(".entry-title[itemprop='name']").text().trim();
    const description = $(".entry-content[itemprop='description']")
      .text()
      .trim();
    const episodeNumber = $(".sbdbti .epx span[itemprop='episodeNumber']")
      .text()
      .trim();
    const postedTime = $(".sbdbti .time-post").text().trim();
    const relatedEpisodes = [];
    $(".lstepsiode ul li").each((index, element) => {
      const episodeTitle = $(element).find(".epsleft .lchx a").text().trim();
      const episodeLink = $(element).find(".epsleft .lchx a").attr("href");
      const episodeImage = $(element).find(".epsright img").attr("src");
      const episodeDate = $(element).find(".epsleft .date").text().trim();
      relatedEpisodes.push({
        episodeTitle,
        episodeLink,
        episodeImage,
        episodeDate,
      });
    });

    const previousEpisode = $(".naveps .nvs a").first().attr("href");
    const allEpisode = $(".naveps .nvsc a").attr("href");
    const nextEpisode = $(".naveps .nvs a").last().attr("href");

    const el = $(".east_player_option").first();
    const postData = el.attr("data-post");
    const numeData = el.attr("data-nume");
    const typeData = el.attr("data-type");
    
    let defaultIframe = "";
    try {
      const response = await postPage(`${originUrl}/wp-admin/admin-ajax.php`, 
        new URLSearchParams({
          action: "player_ajax",
          post: postData,
          nume: numeData,
          type: typeData,
        }), 
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          responseType: "text",
        }
      );
      const extractIframeSrc = (html) => {
        const match = html.match(/<iframe[^>]+src="([^"]+)"/i);
        return match ? match[1].trim() : null;
      };
      
      defaultIframe = extractIframeSrc(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    

    res.json({
      title,
      defaultIframe, 
      description,
      episodeNumber,
      postedTime,
      previousEpisode,
      allEpisode,
      nextEpisode,
      relatedEpisodes,
      downloadLinks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch episode data" });
  }
};
