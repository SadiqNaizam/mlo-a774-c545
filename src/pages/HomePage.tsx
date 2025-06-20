import React from 'react';
import AppHeader from '@/components/layout/AppHeader';
import AppSidebar from '@/components/layout/AppSidebar';
import NowPlayingBar from '@/components/layout/NowPlayingBar';
import MediaItemCard from '@/components/MediaItemCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Available if needed for section structuring

// Define types for MediaItemCard props for clarity
type MediaItemType = 'album' | 'artist' | 'playlist';

interface MediaItemData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  itemType: MediaItemType;
}

const newReleasesData: MediaItemData[] = [
  { id: 'nr1', title: 'Blue Skies Symphony', description: 'Album • The Gadgeteers', imageUrl: 'https://picsum.photos/seed/bluesky/300/300', itemType: 'album' },
  { id: 'nr2', title: 'Pocket Full of Dreams', description: 'Album • DoraBand Live', imageUrl: 'https://picsum.photos/seed/pocketdreams/300/300', itemType: 'album' },
  { id: 'nr3', title: 'Future Bell Echoes', description: 'Single • DJ Nobita', imageUrl: 'https://picsum.photos/seed/futurebell/300/300', itemType: 'album' },
  { id: 'nr4', title: 'Time Travel Tunes', description: 'Album • The Timewarpers', imageUrl: 'https://picsum.photos/seed/timetravel/300/300', itemType: 'album' },
  { id: 'nr5', title: 'Anywhere Door Anthems', description: 'EP • Sizuka Melodies', imageUrl: 'https://picsum.photos/seed/anywheredoor/300/300', itemType: 'album' },
];

const featuredPlaylistsData: MediaItemData[] = [
  { id: 'fp1', title: "Doraemon's Happy Hits", description: 'Playlist • Feel Good Vibes', imageUrl: 'https://picsum.photos/seed/doraemonhappy/300/300', itemType: 'playlist' },
  { id: 'fp2', title: 'Gian\'s Power Hour', description: 'Playlist • Energetic & Loud', imageUrl: 'https://picsum.photos/seed/gianpower/300/300', itemType: 'playlist' },
  { id: 'fp3', title: 'Suneo\'s Smooth Grooves', description: 'Playlist • Chill & Jazzy', imageUrl: 'https://picsum.photos/seed/suneosmooth/300/300', itemType: 'playlist' },
  { id: 'fp4', title: 'Study with Dekisugi', description: 'Playlist • Focus & Ambient', imageUrl: 'https://picsum.photos/seed/dekisugistudy/300/300', itemType: 'playlist' },
];

const recommendationsData: MediaItemData[] = [
  { id: 'rec1', title: 'Cosmic Journey', description: 'Album • Astro Sounds', imageUrl: 'https://picsum.photos/seed/cosmicjourney/300/300', itemType: 'album' },
  { id: 'rec2', title: 'Robotic Rhythms', description: 'Artist • Unit 01', imageUrl: 'https://picsum.photos/seed/roboticrhythms/300/300', itemType: 'artist' },
  { id: 'rec3', title: 'Virtual Vibes', description: 'Playlist • Electronic Adventures', imageUrl: 'https://picsum.photos/seed/virtualvibes/300/300', itemType: 'playlist' },
  { id: 'rec4', title: 'The Time Travelers', description: 'Artist • Chronos Crew', imageUrl: 'https://picsum.photos/seed/timetravelers/300/300', itemType: 'artist' },
  { id: 'rec5', title: 'Dreamscape Melodies', description: 'Album • Lucid Waves', imageUrl: 'https://picsum.photos/seed/dreamscape/300/300', itemType: 'album' },
];


const HomePage = () => {
  console.log('HomePage loaded');

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50 text-neutral-900">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col sm:ml-60"> {/* sm:ml-60 for AppSidebar width */}
        <AppHeader /> {/* Sticky, h-16 */}
        
        <ScrollArea className="flex-1 overflow-y-auto">
          {/* Add padding-bottom to main to ensure content is not obscured by fixed NowPlayingBar */}
          {/* NowPlayingBar is h-20 (5rem). Add some extra for spacing. Total pb-24 (6rem) */}
          <main className="p-4 md:p-6 lg:p-8 space-y-8 pb-24">
            
            <section id="new-releases">
              <h2 className="text-3xl font-bold mb-4 text-sky-600">New Releases</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {newReleasesData.map(item => (
                  <MediaItemCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    itemType={item.itemType}
                  />
                ))}
              </div>
            </section>

            <Separator className="my-6 md:my-8 bg-sky-200 h-[2px]" />

            <section id="featured-playlists">
              <h2 className="text-3xl font-bold mb-4 text-sky-600">Featured Playlists</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {featuredPlaylistsData.map(item => (
                  <MediaItemCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    itemType={item.itemType}
                  />
                ))}
              </div>
            </section>

            <Separator className="my-6 md:my-8 bg-sky-200 h-[2px]" />

            <section id="recommendations">
              <h2 className="text-3xl font-bold mb-4 text-sky-600">Recommendations</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {recommendationsData.map(item => (
                  <MediaItemCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    itemType={item.itemType}
                  />
                ))}
              </div>
            </section>

          </main>
        </ScrollArea>
        
        <NowPlayingBar /> {/* Fixed at bottom, h-20 */}
      </div>
    </div>
  );
};

export default HomePage;