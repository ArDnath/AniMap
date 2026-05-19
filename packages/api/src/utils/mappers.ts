/**
 * Map provider-specific responses to unified AniTube types
 */

import type { AniListMedia } from "../types/anilist.js";
import type { JikanAnime, JikanEpisode } from "../types/jikan.js";
import type { AnimeInfo, EpisodeInfo, SearchResult } from "../types/common.js";

export function mapAniListToAnimeInfo(media: AniListMedia): AnimeInfo {
  return {
    id: media.id,
    malId: media.idMal,
    title: {
      english: media.title.english,
      romaji: media.title.romaji,
      native: media.title.native,
    },
    description: media.description,
    coverImage: media.coverImage.extraLarge || media.coverImage.large,
    bannerImage: media.bannerImage,
    genres: media.genres,
    episodes: media.episodes,
    status: media.status || "UNKNOWN",
    season: media.season,
    seasonYear: media.seasonYear,
    averageScore: media.averageScore,
    popularity: media.popularity,
    type: media.type,
    format: media.format,
    startDate: formatDate(media.startDate),
    endDate: formatDate(media.endDate),
    studios:
      media.studios?.edges
        .filter((edge) => edge.isMain)
        .map((edge) => edge.node.name) || [],
    trailer: media.trailer
      ? {
          id: media.trailer.id,
          site: media.trailer.site,
          url:
            media.trailer.site === "youtube" && media.trailer.id
              ? `https://www.youtube.com/watch?v=${media.trailer.id}`
              : null,
        }
      : null,
  };
}

export function mapJikanToAnimeInfo(anime: JikanAnime): AnimeInfo {
  return {
    id: anime.mal_id,
    malId: anime.mal_id,
    title: {
      english: anime.title_english,
      romaji: anime.title,
      native: anime.title_japanese,
    },
    description: anime.synopsis,
    coverImage:
      anime.images.webp.large_image_url || anime.images.jpg.large_image_url,
    bannerImage: null,
    genres: anime.genres.map((g) => g.name),
    episodes: anime.episodes,
    status: anime.status,
    season: anime.season?.toUpperCase() ?? null,
    seasonYear: anime.year,
    averageScore: anime.score ? anime.score * 10 : null,
    popularity: anime.members || 0,
    type: anime.type,
    format: anime.type,
    startDate: anime.aired.from,
    endDate: anime.aired.to,
    studios: anime.studios.map((s) => s.name),
    trailer: anime.trailer.youtube_id
      ? {
          id: anime.trailer.youtube_id,
          site: "youtube",
          url: anime.trailer.url,
        }
      : null,
  };
}

export function mapAniListToSearchResult(media: AniListMedia): SearchResult {
  return {
    id: media.id,
    malId: media.idMal,
    title: {
      english: media.title.english,
      romaji: media.title.romaji,
      native: media.title.native,
    },
    coverImage: media.coverImage.large || media.coverImage.medium,
    type: media.type,
    episodes: media.episodes,
    status: media.status || "UNKNOWN",
    averageScore: media.averageScore,
    popularity: media.popularity,
    season: media.season,
    year: media.seasonYear,
    synonyms: media.synonyms?.length ? media.synonyms : undefined,
  };
}

export function mapJikanToSearchResult(anime: JikanAnime): SearchResult {
  return {
    id: anime.mal_id,
    malId: anime.mal_id,
    title: {
      english: anime.title_english,
      romaji: anime.title,
      native: anime.title_japanese,
    },
    coverImage: anime.images.webp.image_url || anime.images.jpg.image_url,
    type: anime.type,
    episodes: anime.episodes,
    status: anime.status,
    averageScore: anime.score ? anime.score * 10 : null,
    popularity: anime.members || 0,
    season: anime.season?.toUpperCase() ?? null,
    year: anime.year,
  };
}

export function mapJikanToEpisodeInfo(
  episode: JikanEpisode,
  episodeNumber?: number,
): EpisodeInfo {
  const number =
    episodeNumber ??
    parseEpisodeNumberFromUrl(episode.url) ??
    episode.mal_id;

  return {
    number,
    title: episode.title,
    aired: episode.aired,
    duration: episode.duration,
    filler: episode.filler,
    recap: episode.recap,
    synopsis: episode.synopsis,
  };
}

export function mapJikanRecommendationToSearchResult(
  entry: Pick<JikanAnime, "mal_id" | "images" | "title">,
  votes: number,
): SearchResult {
  return {
    id: entry.mal_id,
    malId: entry.mal_id,
    title: {
      english: null,
      romaji: entry.title,
      native: null,
    },
    coverImage:
      entry.images.webp.image_url || entry.images.jpg.image_url,
    type: null,
    episodes: null,
    status: "UNKNOWN",
    averageScore: null,
    popularity: votes,
    season: null,
    year: null,
  };
}

function formatDate(date?: {
  year: number | null;
  month: number | null;
  day: number | null;
}): string | null {
  if (!date?.year) return null;

  const year = date.year;
  const month = date.month ? String(date.month).padStart(2, "0") : "01";
  const day = date.day ? String(date.day).padStart(2, "0") : "01";

  return `${year}-${month}-${day}`;
}

function parseEpisodeNumberFromUrl(url: string): number | null {
  const match = url.match(/\/episode\/(\d+)/);
  if (!match?.[1]) return null;
  const n = Number.parseInt(match[1], 10);
  return Number.isNaN(n) ? null : n;
}

export function getBestTitle(title: {
  english: string | null;
  romaji: string | null;
  native: string | null;
}): string {
  return title.english || title.romaji || title.native || "Unknown";
}
