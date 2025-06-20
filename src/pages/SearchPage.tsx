import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import AppHeader from '@/components/layout/AppHeader';
import AppSidebar from '@/components/layout/AppSidebar';
import NowPlayingBar from '@/components/layout/NowPlayingBar';

// Custom UI Components
import TrackListItem from '@/components/TrackListItem';
import MediaItemCard from '@/components/MediaItemCard';

// Shadcn/ui Components
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button'; // For potential future use like "View All"

// Types for placeholder data (interfaces are in custom components, but useful for sample data)
interface PlaceholderSong {
  id: string;
  trackNumber?: number;
  albumArtUrl: string;
  title: string;
  artist: string;
  albumName?: string;
  duration: string;
  isExplicit?: boolean;
  isLiked?: boolean;
  isPlaying?: boolean;
}

interface PlaceholderMediaItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  itemType: 'album' | 'artist' | 'playlist';
}

// Placeholder Data
const placeholderSongs: PlaceholderSong[] = [
  { id: 's1', trackNumber: 1, albumArtUrl: 'https://dummyimage.com/100x100/0078D4/fff&text=S1', title: 'Yume wo Kanaete Doraemon', artist: 'MAO', albumName: 'Doraemon Super Hits', duration: '4:05', isExplicit: false, isPlaying: false, isLiked: true },
  { id: 's2', trackNumber: 2, albumArtUrl: 'https://dummyimage.com/100x100/0078D4/fff&text=S2', title: 'Boku Doraemon', artist: 'Nobuyo Oyama', albumName: 'Classic Doraemon Anthems', duration: '2:30', isExplicit: false, isPlaying: false, isLiked: false },
  { id: 's3', trackNumber: 3, albumArtUrl: 'https://dummyimage.com/100x100/0078D4/fff&text=S3', title: 'Doraemon Ekaki Uta', artist: 'Young Fresh', albumName: 'Sing Along Doraemon', duration: '1:55', isExplicit: false, isPlaying: false, isLiked: true },
  { id: 's4', trackNumber: 4, albumArtUrl: 'https://dummyimage.com/100x100/0078D4/fff&text=S4', title: 'Himawari no Yakusoku', artist: 'Motohiro Hata', albumName: 'Stand By Me Doraemon OST', duration: '5:15', isExplicit: false, isPlaying: false, isLiked: false },
];

const placeholderArtists: PlaceholderMediaItem[] = [
  { id: 'ar1', title: 'MAO', description: 'Artist', imageUrl: 'https://dummyimage.com/300x300/F04A40/fff&text=MAO', itemType: 'artist' },
  { id: 'ar2', title: 'Nobuyo Oyama', description: 'Artist', imageUrl: 'https://dummyimage.com/300x300/F04A40/fff&text=NOBUYO', itemType: 'artist' },
  { id: 'ar3', title: 'Young Fresh', description: 'Artist', imageUrl: 'https://dummyimage.com/300x300/F04A40/fff&text=YF', itemType: 'artist' },
  { id: 'ar4', title: 'Motohiro Hata', description: 'Artist', imageUrl: 'https://dummyimage.com/300x300/F04A40/fff&text=MH', itemType: 'artist' },
];

const placeholderAlbums: PlaceholderMediaItem[] = [
  { id: 'al1', title: 'Doraemon Super Hits', description: 'Album • Various Artists', imageUrl: 'https://dummyimage.com/300x300/0078D4/fff&text=DSH', itemType: 'album' },
  { id: 'al2', title: 'Classic Doraemon Anthems', description: 'Album • Nobuyo Oyama', imageUrl: 'https://dummyimage.com/300x300/0078D4/fff&text=CDA', itemType: 'album' },
  { id: 'al3', title: 'Stand By Me Doraemon OST', description: 'Album • Motohiro Hata', imageUrl: 'https://dummyimage.com/300x300/0078D4/fff&text=SBMD', itemType: 'album' },
];

const placeholderPlaylists: PlaceholderMediaItem[] = [
  { id: 'pl1', title: 'Doraemon Adventures Mix', description: 'Playlist • DoraTunes', imageUrl: 'https://dummyimage.com/300x300/FFD700/000&text=DAM', itemType: 'playlist' },
  { id: 'pl2', title: 'Relax with Dorami', description: 'Playlist • Fan Created', imageUrl: 'https://dummyimage.com/300x300/FFD700/000&text=RWD', itemType: 'playlist' },
];


const SearchPage = () => {
  console.log('SearchPage loaded');
  const [searchQuery, setSearchQuery] = useState('');

  // In a real app, these would be filtered based on searchQuery
  const filteredSongs = placeholderSongs;
  const filteredArtists = placeholderArtists;
  const filteredAlbums = placeholderAlbums;
  const filteredPlaylists = placeholderPlaylists;

  return (
    <div className="flex flex-col h-screen bg-neutral-100">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <main className="flex-1 sm:ml-60 pb-20 pt-4 px-4 md:px-6 flex flex-col">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-neutral-800">Search</h1>
            <Input
              type="search"
              placeholder="What do you want to listen to? (e.g., songs, artists, albums)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mt-3 w-full md:w-2/3 lg:w-1/2 bg-white border-neutral-300 focus:ring-sky-500 focus:border-sky-500"
              aria-label="Search for music"
            />
          </div>

          <ScrollArea className="flex-1 -mx-4 md:-mx-6"> {/* Negative margin to extend scroll area to edges of main padding */}
            <div className="px-4 md:px-6"> {/* Inner padding for content within scroll area */}
              <Tabs defaultValue="songs" className="w-full">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-4 bg-neutral-200 p-1 rounded-lg">
                  <TabsTrigger value="songs" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white">Songs</TabsTrigger>
                  <TabsTrigger value="artists" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white">Artists</TabsTrigger>
                  <TabsTrigger value="albums" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white">Albums</TabsTrigger>
                  <TabsTrigger value="playlists" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white">Playlists</TabsTrigger>
                </TabsList>

                <TabsContent value="songs">
                  {filteredSongs.length > 0 ? (
                    <div className="space-y-1">
                      {filteredSongs.map((song) => (
                        <TrackListItem
                          key={song.id}
                          trackNumber={song.trackNumber}
                          albumArtUrl={song.albumArtUrl}
                          title={song.title}
                          artist={song.artist}
                          albumName={song.albumName}
                          duration={song.duration}
                          isExplicit={song.isExplicit}
                          isLiked={song.isLiked}
                          isPlaying={song.isPlaying}
                          // Add handlers as needed
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No songs found for "{searchQuery}".</p>
                  )}
                </TabsContent>

                <TabsContent value="artists">
                  {filteredArtists.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {filteredArtists.map((artist) => (
                        <MediaItemCard
                          key={artist.id}
                          id={artist.id}
                          title={artist.title}
                          description={artist.description}
                          imageUrl={artist.imageUrl}
                          itemType={artist.itemType}
                        />
                      ))}
                    </div>
                  ) : (
                     <p className="text-center text-muted-foreground py-8">No artists found for "{searchQuery}".</p>
                  )}
                </TabsContent>

                <TabsContent value="albums">
                  {filteredAlbums.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {filteredAlbums.map((album) => (
                        <MediaItemCard
                          key={album.id}
                          id={album.id}
                          title={album.title}
                          description={album.description}
                          imageUrl={album.imageUrl}
                          itemType={album.itemType}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No albums found for "{searchQuery}".</p>
                  )}
                </TabsContent>

                <TabsContent value="playlists">
                  {filteredPlaylists.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredPlaylists.map((playlist) => (
                      <MediaItemCard
                        key={playlist.id}
                        id={playlist.id}
                        title={playlist.title}
                        description={playlist.description}
                        imageUrl={playlist.imageUrl}
                        itemType={playlist.itemType}
                      />
                    ))}
                  </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No playlists found for "{searchQuery}".</p>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </main>
      </div>
      <NowPlayingBar />
    </div>
  );
};

export default SearchPage;