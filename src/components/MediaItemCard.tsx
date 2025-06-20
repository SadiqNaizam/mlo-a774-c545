import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface MediaItemCardProps {
  id: string; // Unique identifier for the media item
  title: string; // Primary title (e.g., album name, artist name, playlist name)
  description: string; // Secondary text (e.g., "Album by Artist", "Artist", "Playlist")
  imageUrl: string; // URL for the cover art
  itemType?: 'album' | 'artist' | 'playlist'; // Optional type for more specific handling or ARIA attributes
}

const MediaItemCard: React.FC<MediaItemCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  itemType, // Defaulting to 'album' if not provided, for example.
}) => {
  console.log(`MediaItemCard loaded for: ${title} (ID: ${id})`);

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-xl group bg-card text-card-foreground border-border rounded-lg">
      <Link
        to="/item-detail"
        state={{ itemId: id, itemTitle: title, itemType: itemType || description, itemImageUrl: imageUrl }}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
        aria-label={`View details for ${title}`}
      >
        <AspectRatio ratio={1} className="bg-muted rounded-t-lg overflow-hidden">
          <img
            src={imageUrl || 'https://via.placeholder.com/300?text=Music'}
            alt={`Cover art for ${title}`}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </AspectRatio>
        <CardContent className="p-3 sm:p-4 space-y-1">
          <CardTitle className="text-base sm:text-md font-semibold line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
            {description}
          </CardDescription>
        </CardContent>
      </Link>
    </Card>
  );
};

export default MediaItemCard;