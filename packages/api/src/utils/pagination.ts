import type { AniListPageInfo } from "../types/anilist.js";
import type { JikanPagination } from "../types/jikan.js";
import type { PaginatedResponse } from "../types/common.js";

export function fromAniListPage<T>(
  data: T[],
  pageInfo: AniListPageInfo,
): PaginatedResponse<T> {
  return {
    data,
    pagination: {
      currentPage: pageInfo.currentPage,
      hasNextPage: pageInfo.hasNextPage,
      total: pageInfo.total,
    },
  };
}

export function fromJikanPage<T>(
  data: T[],
  pagination?: JikanPagination,
): PaginatedResponse<T> {
  const total =
    pagination?.items?.total ??
    (pagination?.last_visible_page != null && pagination?.items?.per_page != null
      ? pagination.last_visible_page * pagination.items.per_page
      : data.length);

  return {
    data,
    pagination: {
      currentPage: pagination?.current_page ?? 1,
      hasNextPage: pagination?.has_next_page ?? false,
      total,
    },
  };
}
