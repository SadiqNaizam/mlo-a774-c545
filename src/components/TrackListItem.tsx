import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
  Play,
  Pause,
  Heart,
  MoreHorizontal,
  Music2, // For avatar fallback
  ListMusic, // For "Add to Queue" or "Playlist" icon
  Users, // For "View Artist" icon
  Album, // For "View Album" icon
} from 'lucide-react';

interface TrackListItemProps {
  trackNumber?: number;
  albumArtUrl: string;
  title: string;
  artist: string;
  albumName?: string;
  duration: string; // e.g., "3:45"
  isExplicit?: boolean;
  isLiked?: boolean;
  isPlaying?: boolean;
  onPlayPause?: () => void;
  onLikeToggle?: () => void;
  onAddToPlaylist?: () => void;
  onViewArtist?: () => void;
  onViewAlbum?: () => void;
  onAddToQueue?: () => void;
}

const TrackListItem: React.FC<TrackListItemProps> = ({
  trackNumber,
  albumArtUrl,
  title,
  artist,
  albumName,
  duration,
  isExplicit = false,
  isLiked = false,
  isPlaying = false,
  onPlayPause = () => console.log('TrackListItem: Play/Pause clicked for', title),
  onLikeToggle = () => console.log('TrackListItem: Like toggled for', title),
  onAddToPlaylist = () => console.log('TrackListItem: Add to Playlist clicked for', title),
  onViewArtist = () => console.log('TrackListItem: View Artist clicked for', artist),
  onViewAlbum = () => console.log('TrackListItem: View Album clicked for', albumName),
  onAddToQueue = () => console.log('TrackListItem: Add to Queue clicked for', title),
}) => {
  console.log('TrackListItem loaded for:', title);

  return (
    <div className="group grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_1fr_auto] items-center gap-x-3 p-2 hover:bg-muted/50 rounded-md transition-colors duration-150 cursor-default">
      {/* Column 1: Play/Num + Album Art + Title/Artist */}
      <div className="flex items-center space-x-3 min-w-0">
        {/* Play/Track Number */}
        <div className="w-8 h-10 flex items-center justify-center text-sm text-muted-foreground shrink-0">
          {isPlaying ? (
            <Button variant="ghost" size="icon" onClick={onPlayPause} className="w-8 h-8 text-primary" aria-label="Pause song">
              <Pause className="h-4 w-4" />
            </Button>
          ) : (
            <>
              <span className="group-hover:hidden group-focus-within:hidden">{trackNumber}</span>
              <Button variant="ghost" size="icon" onClick={onPlayPause} className="w-8 h-8 hidden group-hover:flex group-focus-within:flex" aria-label="Play song">
                <Play className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>

        {/* Album Art */}
        <Avatar className="h-10 w-10 rounded shrink-0">
          <AvatarImage src={albumArtUrl} alt={`${title} album art`} />
          <AvatarFallback className="rounded bg-muted">
            <Music2 className="h-5 w-5 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>

        {/* Title, Artist, Explicit Tag */}
        <div className="flex flex-col min-w-0 flex-1">
          <p className={`font-medium truncate ${isPlaying ? 'text-primary' : 'text-foreground'}`}>
            {title}
          </p>
          <div className="flex items-center space-x-1.5">
            {isExplicit && (
              <Badge variant="outline" className="px-1 py-0 text-[10px] h-4 leading-none border-muted-foreground/50 text-muted-foreground">
                E
              </Badge>
            )}
            <p className="text-xs text-muted-foreground truncate">{artist}</p>
          </div>
        </div>
      </div>

      {/* Column 2: Album Name (visible on md+ screens) */}
      <div className="min-w-0 px-2 hidden md:block">
        {albumName && (
          <p className="text-sm text-muted-foreground truncate hover:underline cursor-pointer" onClick={onViewAlbum}>
            {albumName}
          </p>
        )}
      </div>
      
      {/* Column 3 (md) / Column 2 (sm):Spacer on small screens if no album name shown to push controls to the right */}
      {/* This is a bit of a hack for small screens. If AlbumName is hidden, this div will take its place in grid */}
      <div className="block md:hidden flex-1 min-w-0"></div>


      {/* Column 4 (md) / Column 3 (sm): Like, Duration, More Options */}
      <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={onLikeToggle}
          className="w-8 h-8 data-[liked=true]:text-primary data-[liked=false]:text-muted-foreground hover:text-primary"
          data-liked={isLiked}
          aria-label={isLiked ? "Unlike song" : "Like song"}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
        </Button>

        <span className="text-sm text-muted-foreground w-10 text-right">{duration}</span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground" aria-label="More options">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuItem onClick={onAddToQueue}>
              <ListMusic className="mr-2 h-4 w-4" />
              <span>Add to queue</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onAddToPlaylist}>
              <ListMusic className="mr-2 h-4 w-4" /> 
              <span>Add to playlist</span>
            </DropdownMenuItem>
            {albumName && (
              <DropdownMenuItem onClick={onViewAlbum}>
                <Album className="mr-2 h-4 w-4" />
                <span>View album</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={onViewArtist}>
              <Users className="mr-2 h-4 w-4" />
              <span>View artist</span>
            </DropdownMenuItem>
            {/* Consider more actions like "Share", "Remove from this playlist", etc. */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TrackListItem;