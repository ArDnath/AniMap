"use client";

import { useQuery } from "@tanstack/react-query";
import { animeApi } from "@anitube/api";
import { HeroSection } from "./HeroSection";
import { AnimeSection } from "./AnimeSection";

export function HomeContent() {
  const { data: trendingData, isLoading: isTrendingLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: () => animeApi.getTrending(1, 15),
  });

  const { data: popularData, isLoading: isPopularLoading } = useQuery({
    queryKey: ["popular"],
    queryFn: () => animeApi.getPopular(1, 12),
  });

  const { data: seasonData, isLoading: isSeasonLoading } = useQuery({
    queryKey: ["currentSeason"],
    queryFn: () => animeApi.getCurrentSeason(1, 12),
  });

  const { data: topData, isLoading: isTopLoading } = useQuery({
    queryKey: ["topAnime"],
    queryFn: () => animeApi.getTopAnime({ page: 1, limit: 12 }),
  });

  // First 3 trending anime for the hero carousel
  const heroAnime = trendingData?.data?.slice(0, 3) ?? [];
  // Rest for the trending section
  const trendingAnime = trendingData?.data?.slice(3, 15) ?? [];
  const popularAnime = popularData?.data ?? [];
  const seasonAnime = seasonData?.data ?? [];
  const topAnime = topData?.data ?? [];

  return (
    <main className="min-h-screen term-bg">
      <HeroSection animeList={heroAnime} />

      <AnimeSection
        title="TRENDING_NOW"
        anime={trendingAnime}
        isLoading={isTrendingLoading}
        viewAllHref="/search?sort=trending"
      />
      <AnimeSection
        title="POPULAR"
        anime={popularAnime}
        isLoading={isPopularLoading}
        viewAllHref="/search?sort=popularity"
      />
      <AnimeSection
        title="CURRENT_SEASON"
        anime={seasonAnime}
        isLoading={isSeasonLoading}
      />
      <AnimeSection
        title="TOP_RATED"
        anime={topAnime}
        isLoading={isTopLoading}
        viewAllHref="/search?sort=score"
      />
    </main>
  );
}
