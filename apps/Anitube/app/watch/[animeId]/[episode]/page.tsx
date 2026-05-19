import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ animeId: string; episode: string }>;
}

/**
 * AniTube is a discovery platform — no video playback.
 * Redirect /watch/[id]/[ep] → /anime/[id]
 */
export default async function WatchPage({ params }: Props) {
  const { animeId } = await params;
  redirect(`/anime/${animeId}`);
}
