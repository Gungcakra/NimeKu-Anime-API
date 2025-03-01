import axios from "axios";

const userAgent = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36";

const headers = {
  "User-Agent": userAgent,
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "en-US,en;q=0.9,id;q=0.8",
  "Referer": "https://samehadaku.mba/",
  "Origin": "https://samehadaku.mba",
  "X-Requested-With": "XMLHttpRequest",
  "Upgrade-Insecure-Requests": "1",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchPage = async (url, config = {}) => {
  try {
    const response = await axios.get(url, {
      headers: {
        ...headers,
        ...config.headers,
      },
      ...config,
    });

    await delay(1000);
    return response.data;
  } catch (error) {
    console.error(`Error fetching URL: ${url}`, error.message);
    console.error("Error Response Headers:", error.response?.headers);
    throw error;
  }
};

export const postPage = async (url, data = {}, config = {}) => {
  try {
    const response = await axios.post(url, new URLSearchParams(data), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...config.headers,
      },
      ...config,
    });

    await delay(1000);
    return response.data;
  } catch (error) {
    console.error(`Error fetching URL: ${url}`, error.message);
    console.error("Error Response Headers:", error.response?.headers);
    throw error;
  }
};


export const fetchWithRetry = async (url, config, retryConfig) => {
  const { retries = 3, delay = 3000 } = retryConfig || {};

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fetchPage(url, config);
    } catch (error) {
      console.error(`Attempt ${attempt} failed: ${url}`, error.message);

      if (attempt === retries) throw error;

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

export const getFinalUrl = async (url, config) => {
  try {
    const response = await axios.head(url, {
      headers: {
        ...headers,
        ...config.headers,
      },
      maxRedirects: 0,
      validateStatus: (status) => status >= 200 && status < 400,
    });

    return response.headers.location || url;
  } catch (error) {
    console.error(`Error getting final URL: ${url}`, error.message);
    throw error;
  }
};
