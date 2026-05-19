import { Metadata } from "next";
import { notFound } from "next/navigation";
import { animeApi } from "@anitube/api";
import type { EpisodeInfo, SearchResult } from "@anitube/api";
import { AnimeHeader } from "../../../components/anime/AnimeHeader";
import { AnimeDescription } from "../../../components/anime/AnimeDescription";
import { AnimeEpisodes } from "../../../components/anime/AnimeEpisodes";
import { AnimeCharacters } from "../../../components/anime/AnimeCharacters";
import { AnimeRecommendations } from "../../../components/anime/AnimeRecommendations";
import { AnimeInfo as AnimeInfoSection } from "../../../components/anime/AnimeInfo";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const anime = await animeApi.getAnimeById(parseInt(id), "anilist");
    const title = anime.title.english || anime.title.romaji || "Anime Details";
    const description =
      anime.description?.replace(/<[^>]*>/g, "").slice(0, 155) ||
      "Discover anime on AniTube";
    return {
      title: `${title} | AniTube`,
      description,
      openGraph: { title, description, type: "website" },
    };
  } catch {
    return { title: "Anime Not Found | AniTube" };
  }
}

export default async function AnimePage({ params }: Props) {
  const { id } = await params;
  const animeId = parseInt(id);
  if (isNaN(animeId)) notFound();

  let anime;
  let episodes: EpisodeInfo[] | null = null;
  let recommendations: SearchResult[] | null = null;

  try {
    anime = await animeApi.getAnimeById(animeId, "anilist");
    if (anime.malId) {
      try {
        const epRes = await animeApi.getEpisodes(anime.malId);
        episodes = epRes.data;
      } catch { /* skip */ }
      try {
        recommendations = await animeApi.getRecommendations(anime.malId);
      } catch { /* skip */ }
    }
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen term-bg">
      <AnimeHeader anime={anime} />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Main col */}
          <div className="lg:col-span-2 space-y-5">
            <AnimeDescription description={anime.description} />
            {episodes && episodes.length > 0 && (
              <AnimeEpisodes
                episodes={episodes}
                animeTitle={anime.title.english || anime.title.romaji || ""}
              />
            )}
            <AnimeCharacters animeId={animeId} />
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <AnimeInfoSection anime={anime} />
            {recommendations && recommendations.length > 0 && (
              <AnimeRecommendations recommendations={recommendations} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
