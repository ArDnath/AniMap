import { animeApi } from "./dist/index.js";

const tests = [
  {
    name: "searchAnime",
    run: () => animeApi.searchAnime("Naruto", { perPage: 3 }),
    assert: (r) => r.data.length > 0,
  },
  {
    name: "getTrending",
    run: () => animeApi.getTrending(1, 3),
    assert: (r) => r.data.length > 0,
  },
  {
    name: "getPopular",
    run: () => animeApi.getPopular(1, 3),
    assert: (r) => r.data.length > 0,
  },
  {
    name: "getAnimeById (AniList)",
    run: () => animeApi.getAnimeById(16498),
    assert: (a) => Boolean(a.title.romaji || a.title.english),
  },
  {
    name: "getCurrentSeason",
    run: () => animeApi.getCurrentSeason(1, 3),
    assert: (r) => r.data.length > 0,
  },
  {
    name: "getTopAnime (Jikan)",
    run: () => animeApi.getTopAnime({ limit: 3 }),
    assert: (r) => r.data.length > 0,
  },
  {
    name: "getAnimeByGenre",
    run: () => animeApi.getAnimeByGenre("Action", 1, 3),
    assert: (r) => r.data.length > 0,
  },
  {
    name: "getEpisodes (Jikan, MAL 16498)",
    run: () => animeApi.getEpisodes(16498, 1),
    assert: (r) => r.data.length > 0 && r.data[0].number >= 1,
  },
  {
    name: "getRecommendations (Jikan, MAL 16498)",
    run: () => animeApi.getRecommendations(16498),
    assert: (r) => Array.isArray(r),
  },
];

async function main() {
  console.log("Testing @anitube/api (AniList + Jikan)\n");

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    process.stdout.write(`  ${test.name} ... `);
    try {
      const result = await test.run();
      if (!test.assert(result)) {
        throw new Error("assertion failed");
      }
      console.log("ok");
      passed++;
    } catch (error) {
      console.log("FAIL");
      console.error(`    ${error.message}`);
      if (error.provider) console.error(`    provider: ${error.provider}`);
      if (error.statusCode) console.error(`    status: ${error.statusCode}`);
      failed++;
    }
  }

  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

main();
