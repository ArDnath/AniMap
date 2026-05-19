/**
 * AniList GraphQL API types
 * @see https://anilist.gitbook.io/anilist-apiv2-docs/
 */

export interface AniListMedia {
  id: number;
  idMal: number | null;
  title: {
    romaji: string | null;
    english: string | null;
    native: string | null;
  };
  coverImage: {
    extraLarge: string;
    large: string;
    medium: string;
    color: string | null;
  };
  bannerImage: string | null;
  startDate: {
    year: number | null;
    month: number | null;
    day: number | null;
  };
  endDate: {
    year: number | null;
    month: number | null;
    day: number | null;
  };
  description: string | null;
  season: "WINTER" | "SPRING" | "SUMMER" | "FALL" | null;
  seasonYear: number | null;
  type: "ANIME" | "MANGA";
  format:
    | "TV"
    | "TV_SHORT"
    | "MOVIE"
    | "SPECIAL"
    | "OVA"
    | "ONA"
    | "MUSIC"
    | null;
  status:
    | "FINISHED"
    | "RELEASING"
    | "NOT_YET_RELEASED"
    | "CANCELLED"
    | "HIATUS"
    | null;
  episodes: number | null;
  duration: number | null;
  chapters: number | null;
  volumes: number | null;
  countryOfOrigin: string;
  isLicensed: boolean;
  source: string | null;
  hashtag: string | null;
  trailer: {
    id: string | null;
    site: string | null;
    thumbnail: string | null;
  } | null;
  updatedAt: number;
  genres: string[];
  synonyms?: string[];
  averageScore: number | null;
  meanScore: number | null;
  popularity: number;
  trending: number;
  favourites: number;
  tags: Array<{
    id: number;
    name: string;
    description: string;
    category: string;
    rank: number;
    isGeneralSpoiler: boolean;
    isMediaSpoiler: boolean;
    isAdult: boolean;
  }>;
  relations: {
    edges: Array<{
      id: number;
      relationType: string;
      node: Partial<AniListMedia>;
    }>;
  };
  characters: {
    edges: Array<{
      id: number;
      role: string;
      node: {
        id: number;
        name: {
          full: string;
          native: string | null;
        };
        image: {
          large: string;
          medium: string;
        };
      };
    }>;
  };
  studios: {
    edges: Array<{
      id: number;
      isMain: boolean;
      node: {
        id: number;
        name: string;
        siteUrl: string;
      };
    }>;
  };
  streamingEpisodes: Array<{
    title: string | null;
    thumbnail: string | null;
    url: string | null;
    site: string | null;
  }>;
}

export interface AniListPageInfo {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  perPage: number;
}

export interface AniListMediaPage {
  media: AniListMedia[];
  pageInfo: AniListPageInfo;
}
