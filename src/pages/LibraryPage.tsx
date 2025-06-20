import React from 'react';
import AppHeader from '@/components/layout/AppHeader';
import AppSidebar from '@/components/layout/AppSidebar';
import NowPlayingBar from '@/components/layout/NowPlayingBar';
import MediaItemCard from '@/components/MediaItemCard';
import TrackListItem from '@/components/TrackListItem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Music2, User, Disc3, Heart } from 'lucide-react'; // Icons for tab content headings

// Placeholder data interfaces
interface SampleMediaItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  itemType: 'album' | 'artist' | 'playlist';
}

interface SampleTrack {
  id: string;
  albumArtUrl: string;
  title: string;
  artist: string;
  albumName?: string;
  duration: string;
  isExplicit?: boolean;
  isLiked?: boolean;
}

// Placeholder data
const samplePlaylists: SampleMediaItem[] = [
  { id: 'pl1', title: 'Doraemon\'s Gadget Grooves', description: 'Upbeat tunes for inventing', imageUrl: `https://source.unsplash.com/random/300x300?sig=1&playlist,abstract`, itemType: 'playlist' },
  { id: 'pl2', title: 'Nobita\'s Naptime Anthems', description: 'Relaxing melodies', imageUrl: `https://source.unsplash.com/random/300x300?sig=2&playlist,calm`, itemType: 'playlist' },
  { id: 'pl3', title: 'Future Funk Essentials', description: 'Tracks from the 22nd century', imageUrl: `https://source.unsplash.com/random/300x300?sig=3&playlist,future`, itemType: 'playlist' },
];

const sampleArtists: SampleMediaItem[] = [
  { id: 'art1', title: 'DJ Anywhere Door', description: 'Artist', imageUrl: `https://source.unsplash.com/random/300x300?sig=4&artist,dj`, itemType: 'artist' },
  { id: 'art2', title: 'The Time Warpers', description: 'Artist', imageUrl: `https://source.unsplash.com/random/300x300?sig=5&artist,band`, itemType: 'artist' },
];

const sampleAlbums: SampleMediaItem[] = [
  { id: 'alb1', title: 'Pocket Dimensions', description: 'Album by DJ Anywhere Door', imageUrl: `https://source.unsplash.com/random/300x300?sig=6&album,electronic`, itemType: 'album' },
  { id: 'alb2', title: 'Echoes of Time', description: 'Album by The Time Warpers', imageUrl: `https://source.unsplash.com/random/300x300?sig=7&album,rock`, itemType: 'album' },
  { id: 'alb3', title: 'Bell\'s Symphony', description: 'Album by Doraemon', imageUrl: `https://source.unsplash.com/random/300x300?sig=8&album,cat`, itemType: 'album' },
  { id: 'alb4', title: 'Bamboo Copter Beats', description: 'EP by Nobita Nobi', imageUrl: `https://source.unsplash.com/random/300x300?sig=9&album,instrumental`, itemType: 'album' },
];

const sampleLikedSongs: SampleTrack[] = [
  { id: 'song1', title: 'Doraemon no Uta (Remix)', artist: 'DJ Anywhere Door', albumArtUrl: `https://source.unsplash.com/random/100x100?sig=10&song,blue`, duration: '3:45', isLiked: true, albumName: 'Pocket Dimensions' },
  { id: 'song2', title: 'Time Machine Journey', artist: 'The Time Warpers', albumArtUrl: `https://source.unsplash.com/random/100x100?sig=11&song,time`, duration: '4:12', isLiked: true, isExplicit: false, albumName: 'Echoes of Time' },
  { id: 'song3', title: 'Sleepy Afternoon Tune', artist: 'Nobita Nobi', albumArtUrl: `https://source.unsplash.com/random/100x100?sig=12&song,relax`, duration: '2:50', isLiked: true, albumName: 'Naptime Anthems' },
];

const tabConfig = [
  { value: "playlists", label: "Playlists", icon: ListMusic, data: samplePlaylists, itemComponent: MediaItemCard, emptyText: "You haven't created or saved any playlists yet." },
  { value: "artists", label: "Artists", icon: User, data: sampleArtists, itemComponent: MediaItemCard, emptyText: "You are not following any artists yet." },
  { value: "albums", label: "Albums", icon: Disc3, data: sampleAlbums, itemComponent: MediaItemCard, emptyText: "You haven't saved any albums yet." },
  { value: "liked songs", label: "Liked Songs", icon: Heart, data: sampleLikedSongs, itemComponent: TrackListItem, emptyText: "You haven't liked any songs yet." }
];


const LibraryPage = () => {
  console.log('LibraryPage loaded');

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 text-neutral-800">
      <AppHeader /> {/* Sticky, h-16 (4rem) */}
      
      <div className="flex flex-1 overflow-hidden"> {/* Takes remaining vertical space */}
        <AppSidebar /> {/* Fixed, w-60 (15rem) */}
        
        <main className="flex-1 ml-60 overflow-y-hidden flex flex-col"> {/* ml-60 for AppSidebar */}
          <ScrollArea className="flex-1 pb-20"> {/* flex-1 for height, pb-20 for NowPlayingBar (h-20 / 5rem) */}
            <div className="container mx-auto px-6 py-8">
              <h1 className="text-4xl font-bold mb-10 text-sky-700">Your Library</h1>
              
              <Tabs defaultValue="playlists" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 mb-8 p-1.5 bg-sky-100 rounded-lg shadow-sm">
                  {tabConfig.map(tab => (
                    <TabsTrigger 
                      key={tab.value} 
                      value={tab.value}
                      className="text-sm font-medium text-sky-700 data-[state=active]:bg-white data-[state=active]:text-sky-600 data-[state=active]:shadow-md rounded-md py-2.5 transition-all flex items-center justify-center gap-2"
                    >
                      <tab.icon className="h-4 w-4" />
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {tabConfig.map(tab => (
                  <TabsContent key={tab.value} value={tab.value}>
                    <Card className="bg-white/90 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg">
                      {/* Section title within card removed as tab label is prominent enough */}
                      {/* <h2 className="text-2xl font-semibold mb-6 text-sky-600 flex items-center"><tab.icon className="mr-3 h-6 w-6" />{tab.label}</h2> */}
                      {tab.data.length > 0 ? (
                        tab.value === 'liked songs' ? (
                          <div className="space-y-1">
                            {(tab.data as SampleTrack[]).map((item, index) => (
                              <TrackListItem 
                                key={item.id}
                                trackNumber={index + 1}
                                albumArtUrl={item.albumArtUrl}
                                title={item.title}
                                artist={item.artist}
                                albumName={item.albumName}
                                duration={item.duration}
                                isExplicit={item.isExplicit}
                                isLiked={item.isLiked}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-8">
                            {(tab.data as SampleMediaItem[]).map((item) => (
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
                        )
                      ) : (
                        <p className="text-neutral-500 py-8 text-center">{tab.emptyText}</p>
                      )}
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </ScrollArea>
        </main>
      </div>
      <NowPlayingBar /> {/* Fixed, h-20 (5rem) */}
    </div>
  );
};

export default LibraryPage;