import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate }_from 'react-router-dom';

import AppHeader from '@/components/layout/AppHeader';
import AppSidebar from '@/components/layout/AppSidebar';
import NowPlayingBar from '@/components/layout/NowPlayingBar';
import TrackListItem from '@/components/TrackListItem';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home as HomeIcon, Play, ListPlus, Music, Users, CalendarDays } from 'lucide-react';

interface ItemDetails {
  id: string;
  title: string;
  type: string; // e.g., "Album", "Playlist"
  imageUrl: string;
  artist?: string;
  description?: string;
  releaseDate?: string; // e.g., "2023" or "Jan 1, 2023"
  trackCount?: number;
  totalDuration?: string; // e.g., "45 min"
}

interface Track {
  id: string;
  trackNumber: number;
  title: string;
  artist: string;
  albumName: string; // For TrackListItem, can be the item's title
  duration: string;
  albumArtUrl: string; // Can be the main item's art
  isExplicit?: boolean;
}

const ItemDetailPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [itemDetails, setItemDetails] = useState<ItemDetails | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    console.log('ItemDetailPage loaded');
    // Data passed from MediaItemCard via Link state
    const state = location.state as { itemId: string; itemTitle: string; itemType: string; itemImageUrl: string };

    if (state && state.itemId) {
      // Simulate fetching more details based on itemId if needed
      // For now, use passed state and add some placeholders
      const newItemDetails: ItemDetails = {
        id: state.itemId,
        title: state.itemTitle || 'Unknown Item',
        type: state.itemType || 'Album',
        imageUrl: state.itemImageUrl || 'https://via.placeholder.com/300?text=Music',
        artist: `Artist for ${state.itemTitle || 'Item'}`,
        description: `This is a fantastic ${state.itemType || 'collection'} by ${state.itemTitle || 'Various Artists'}. Enjoy these amazing tracks that will take you on a journey.`,
        releaseDate: '2024',
        trackCount: 5, // Placeholder, should match tracks.length
        totalDuration: '17 min', // Placeholder
      };
      setItemDetails(newItemDetails);

      // Placeholder tracks related to the item
      const placeholderTracks: Track[] = [
        { id: 't1', trackNumber: 1, title: `Song One from ${state.itemTitle}`, artist: newItemDetails.artist || 'Artist', albumName: newItemDetails.title, duration: '3:30', albumArtUrl: newItemDetails.imageUrl, isExplicit: false },
        { id: 't2', trackNumber: 2, title: `Another Track`, artist: newItemDetails.artist || 'Artist', albumName: newItemDetails.title, duration: '4:15', albumArtUrl: newItemDetails.imageUrl },
        { id: 't3', trackNumber: 3, title: `Hit Single`, artist: newItemDetails.artist || 'Artist', albumName: newItemDetails.title, duration: '2:55', albumArtUrl: newItemDetails.imageUrl, isExplicit: true },
        { id: 't4', trackNumber: 4, title: `Deep Cut`, artist: newItemDetails.artist || 'Artist', albumName: newItemDetails.title, duration: '3:50', albumArtUrl: newItemDetails.imageUrl },
        { id: 't5', trackNumber: 5, title: `Outro Jam`, artist: newItemDetails.artist || 'Artist', albumName: newItemDetails.title, duration: '2:30', albumArtUrl: newItemDetails.imageUrl },
      ];
      setTracks(placeholderTracks);
      newItemDetails.trackCount = placeholderTracks.length; // Update track count
    } else {
      // Handle case where state is not passed (e.g., direct navigation)
      console.warn('ItemDetailPage: No item data found in location state. Redirecting to home.');
      // Potentially redirect or show an error message
      // For now, setting some defaults to prevent crashes, but ideally redirect
      setItemDetails({
        id: 'unknown',
        title: 'Item Not Found',
        type: 'Unknown',
        imageUrl: 'https://via.placeholder.com/300?text=Error',
        artist: 'N/A',
        description: 'Could not load item details. Please try again from the home page.',
      });
      setTracks([]);
      // navigate('/home'); // Example redirect
    }
  }, [location.state, navigate]);

  if (!itemDetails) {
    return ( // Loading state or if redirecting
      <div className="flex flex-col min-h-screen">
        <AppHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <main className="flex-1 sm:ml-60 pt-4 pb-24 px-4 md:px-6"> {/* pb-24 for NowPlayingBar */}
            <p>Loading item details...</p>
          </main>
        </div>
        <NowPlayingBar />
      </div>
    );
  }
  
  // Doraemon theme colors (using sky blue as primary)
  const primaryColor = "sky"; 

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <div className="flex flex-1">
        <AppSidebar />
        <main className="flex-1 sm:ml-60 bg-gradient-to-b from-muted/30 via-background to-background">
          <ScrollArea className="h-[calc(100vh-4rem-5rem)]"> {/* Viewport height - header height - now playing bar height */}
            <div className="px-4 md:px-8 py-6 space-y-6">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/home" className="flex items-center gap-1.5 hover:text-sky-600">
                        <HomeIcon className="h-4 w-4" />
                        Home
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {/* This could link to a category page if one existed, e.g. /albums or /playlists */}
                    <span className="text-muted-foreground">{itemDetails.type}</span>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-semibold truncate max-w-xs">{itemDetails.title}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              {/* Item Header Section */}
              <section className="flex flex-col md:flex-row items-start md:items-end gap-6 md:gap-8">
                <Avatar className={`h-48 w-48 md:h-56 md:w-56 rounded-lg shadow-xl border-4 border-${primaryColor}-200`}>
                  <AvatarImage src={itemDetails.imageUrl} alt={`Cover art for ${itemDetails.title}`} className="object-cover" />
                  <AvatarFallback className={`bg-${primaryColor}-100 rounded-md`}>
                    <Music className={`h-20 w-20 text-${primaryColor}-500`} />
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{itemDetails.type}</p>
                  <h1 className={`text-4xl md:text-5xl font-bold text-foreground leading-tight break-words`}>{itemDetails.title}</h1>
                  {itemDetails.artist && <p className="text-lg text-muted-foreground flex items-center gap-1.5"><Users className="h-5 w-5"/> {itemDetails.artist}</p>}
                  <p className="text-sm text-muted-foreground pt-1 line-clamp-3">{itemDetails.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                    {itemDetails.releaseDate && <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5"/> {itemDetails.releaseDate}</span>}
                    {itemDetails.trackCount && itemDetails.releaseDate && <span>•</span>}
                    {itemDetails.trackCount && <span>{itemDetails.trackCount} songs</span>}
                    {itemDetails.totalDuration && itemDetails.trackCount && <span>•</span>}
                    {itemDetails.totalDuration && <span>{itemDetails.totalDuration}</span>}
                  </div>
                  <div className="pt-4 flex items-center gap-3">
                    <Button size="lg" className={`bg-${primaryColor}-500 hover:bg-${primaryColor}-600 text-white rounded-full px-8 py-3 shadow-md`}>
                      <Play className="mr-2 h-5 w-5 fill-white" /> Play All
                    </Button>
                    <Button variant="outline" size="lg" className={`rounded-full px-6 py-3 border-${primaryColor}-500 text-${primaryColor}-500 hover:bg-${primaryColor}-50 hover:text-${primaryColor}-600`}>
                      <ListPlus className="mr-2 h-5 w-5" /> Add to Library
                    </Button>
                  </div>
                </div>
              </section>
              
              {/* Tracks List Section */}
              <section className="pt-6">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Tracks</h2>
                {tracks.length > 0 ? (
                  <div className="space-y-1">
                    {tracks.map((track, index) => (
                      <TrackListItem
                        key={track.id}
                        trackNumber={track.trackNumber}
                        albumArtUrl={track.albumArtUrl} // or track.specificArtUrl if available
                        title={track.title}
                        artist={track.artist}
                        albumName={track.albumName}
                        duration={track.duration}
                        isExplicit={track.isExplicit}
                        // Placeholder interactive props
                        onPlayPause={() => console.log('Play/pause track:', track.title)}
                        onLikeToggle={() => console.log('Like toggled for track:', track.title)}
                        onAddToPlaylist={() => console.log('Add to playlist for track:', track.title)}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No tracks available for this {itemDetails.type.toLowerCase()}.</p>
                )}
              </section>
            </div>
            <div className="h-24"></div> {/* Spacer for NowPlayingBar */}
          </ScrollArea>
        </main>
      </div>
      <NowPlayingBar />
    </div>
  );
};

export default ItemDetailPage;