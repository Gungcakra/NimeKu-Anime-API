<!-- ![Preview](panel.webp) -->

# Nimeku API
Rest API Anime Subtitle Indonesia

## Source
https://samehadaku.mba

## Fitur
- **New Anime**
- **Anime List**
- **Movie**
- **Popular**
- **Schedule**
- **A-Z List Anime**
- **Genre List**
- **Anime by Genre**
- **Anime Search**
- **Anime Details**
- **Episode Details**
- **Stream Link**

## TechStack

- **Express.js**
- **Node.js**
- **Axios**
- **Cheerio**
- **Vercel**

## Installasi
```bash
# Clone repositori
git clone https://github.com/Gungcakra/nimeku-anime-api.git

# Masuk ke folder proyek
cd nimeku-anime-api

# Install dependensi
npm install

# Jalankan server
npm start
```

## Contoh Response JSON
  ```json
  {
  "title": "Boku no Hero Academia the Movie 4",
  "link": "https://samehadaku.mba/anime/boku-no-hero-academia-the-movie-4/",
  "imageSrc": "https://samehadaku.mba/wp-content/uploads/2025/02/143549.jpg",
  "type": "Movie",
  "score": "7.5",
  "status": "Completed",
  "views": "1304 Views",
  "description": "Movie ke 4 dari Boku no Hero Academia Tonton juga",
  "genres": [
    "Action",
    "School",
    "Super Power"
  ]
  }
  ```

## Routes
URL Utama API:

https://nimeku.vercel.app/api/$endpoint

Ganti `$endpoint` dengan list endpoint ini.

## Endpoint List

### 1. New Anime
- **GET** `/new/page/:pageNumber`
  
  Get list anime terbaru.
  
  **Example:**  
  `https://nimeku.vercel.app/api/new/page/2`

### 2. Anime List
- **GET** `/anime/page/:pageNumber`
  
  Get list semua anime.
  
  **Example:**  
  `https://nimeku.vercel.app/api/anime/page/2`

### 3. Movie
- **GET** `/movie/page/:pageNumber`
  
  Get list movie anime.
  
  **Example:**  
  `https://nimeku.vercel.app/api/movie/page/2`

### 4. Popular Anime
- **GET** `/popular/page/:pageNumber`
  
  Get list anime populer.
  
  **Example:**  
  `https://nimeku.vercel.app/api/popular/page/2`

### 5. Schedule
- **GET** `/schedule`
  
  Get jadwal anime.
  
  **Example:**  
  `https://nimeku.vercel.app/api/schedule`

### 6. A-Z List Anime
- **GET** `/azlist`
  
  Get A-Z list anime.
  
  **Example:**  
  `https://nimeku.vercel.app/api/azlist`

### 7. Genre List
- **GET** `/genres`
  
  Get list genre.
  
  **Example:**  
  `https://nimeku.vercel.app/api/genres`

### 8. Anime by Genre
- **GET** `/genre/:genreId`
  
  Get list anime sesuai genre.
  
  **Example:**  
  `https://nimeku.vercel.app/api/genre/action`

### 9. Anime by Genre
- **GET** `/genre/:genreId/page/:pageNumber`
  
  Get list anime sesuai genre dan halaman.
  
  **Example:**  
  `https://nimeku.vercel.app/api/genre/action/page/2`

### 10. Anime Search
- **GET** `/search/:keyword`
  
  Get list anime sesuai keyword.
  
  **Example:**  
  `https://nimeku.vercel.app/api/search/attack%20on%20titan`

### 11. Anime Search
- **GET** `/search/:keyword/page/:pageNumber`
  
  Get list anime sesuai keyword dan halaman.
  
  **Example:**  
  `https://nimeku.vercel.app/api/search/attack%20on%20titan/page/2`

### 12. Anime Details
- **GET** `/detail/:animeId`
  
  Get detail anime sesuai `animeId`.
  
  **Example:**  
  `https://nimeku.vercel.app/api/detail/attack-on-titan`

### 13. Episode Details
- **GET** `/watch/:episodeId`
  
  Get detail episode anime sesuai `episodeId`.
  
  **Example:**  
  `https://nimeku.vercel.app/api/watch/attack-on-titan-episode-1`

### 14. Stream Link
- **GET** `/stream/:streamId`
  
  Get link streaming sesuai `streamId`.
  
  **Example:**  
  `https://nimeku.vercel.app/api/stream/attack-on-titan-episode-1`
