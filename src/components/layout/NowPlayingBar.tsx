import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Toggle } from '@/components/ui/toggle';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Shuffle,
  Repeat,
  Volume2,
  VolumeX,
  Maximize2,
  Mic2,
  ListMusic,
} from 'lucide-react';

interface TrackInfo {
  title: string;
  artist: string;
  albumArtUrl: string;
  duration: number; // in seconds
}

const NowPlayingBar: React.FC = () => {
  console.log('NowPlayingBar loaded');

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'one' | 'all'>('off'); // Example states
  const [currentTime, setCurrentTime] = useState(0);

  const currentTrack: TrackInfo = { // Placeholder data
    title: 'Doraemon no Uta',
    artist: 'Kumiko Osugi',
    albumArtUrl: '/placeholder-album-art-doraemon.jpg', // Replace with actual or placeholder
    duration: 185, // 3:05
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleVolumeChange = (value: number[]) => setVolume(value[0]);
  const handleSeek = (value: number[]) => {
    // In a real app, this would seek the audio player
    setCurrentTime((value / 100) * currentTrack.duration);
  };


  // Doraemon Theme Styles
  // Primary Blue: `bg-sky-500`, `text-sky-500`, `hover:bg-sky-600`
  // Accent Red: `bg-red-500`, `text-red-500`, `hover:bg-red-600`
  // Accent Yellow: `bg-yellow-400`, `text-yellow-400`, `hover:bg-yellow-500`
  // Slider track: `bg-sky-200`
  // Slider range: `bg-sky-500`
  // Slider thumb: `bg-white border-sky-500`

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 h-20 bg-neutral-50 border-t border-neutral-200 px-4 py-2">
      <div className="grid grid-cols-3 h-full items-center">
        {/* Left: Track Info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 rounded">
            <AvatarImage src={currentTrack.albumArtUrl} alt={currentTrack.title} />
            <AvatarFallback className="bg-sky-100 text-sky-500">DT</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-neutral-800 truncate max-w-[150px] md:max-w-[200px]">{currentTrack.title}</p>
            <p className="text-xs text-neutral-500 truncate max-w-[150px] md:max-w-[200px]">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Center: Playback Controls & Progress */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 md:gap-3">
            <Toggle
              size="sm"
              pressed={isShuffled}
              onPressedChange={setIsShuffled}
              aria-label="Shuffle"
              className="data-[state=on]:text-sky-500"
            >
              <Shuffle className="h-4 w-4" />
            </Toggle>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button 
              variant="default" 
              size="icon" 
              onClick={handlePlayPause} 
              className="h-9 w-9 rounded-full bg-sky-500 hover:bg-sky-600 text-white"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <SkipForward className="h-5 w-5" />
            </Button>
            <Toggle
              size="sm"
              pressed={repeatMode !== 'off'}
              onPressedChange={(pressed) => setRepeatMode(pressed ? 'all' : 'off')}
              aria-label="Repeat"
              className="data-[state=on]:text-sky-500"
            >
              <Repeat className="h-4 w-4" />
            </Toggle>
          </div>
          <div className="flex items-center gap-2 w-full max-w-xs mt-1">
            <span className="text-xs text-neutral-500 w-8 text-right">{formatTime(currentTime)}</span>
            <Slider
              defaultValue={[0]}
              value={[(currentTime / currentTrack.duration) * 100]}
              max={100}
              step={1}
              onValueChange={(value) => handleSeek(value[0])} // Use onValueChange for controlled slider
              className="w-full [&>span:first-child]:h-1 [&>span:first-child>span]:bg-sky-500 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:border-sky-500"
            />
            <span className="text-xs text-neutral-500 w-8 text-left">{formatTime(currentTrack.duration)}</span>
          </div>
        </div>

        {/* Right: Volume & Other Controls */}
        <div className="flex items-center justify-end gap-2 md:gap-3">
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <Mic2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <ListMusic className="h-4 w-4" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                {volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-28 p-2 mb-2">
              <Slider
                defaultValue={[volume]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="[&>span:first-child]:h-1 [&>span:first-child>span]:bg-sky-500 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:border-sky-500"
              />
            </PopoverContent>
          </Popover>
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default NowPlayingBar;