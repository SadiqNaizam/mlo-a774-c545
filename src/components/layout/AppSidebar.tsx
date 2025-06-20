import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Search, Library, ListMusic, Heart, PlusCircle } from 'lucide-react';

const AppSidebar: React.FC = () => {
  console.log('AppSidebar loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
      isActive ? 'text-primary bg-muted font-semibold' : 'text-muted-foreground'
    }`;
  
  // Doraemon theme colors:
  // Primary text/icons: text-sky-600
  // Active background: bg-sky-100
  // Hover text: hover:text-sky-700
  // Regular text: text-neutral-700

  const themedNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-sky-700 hover:bg-sky-50 ${
    isActive ? 'bg-sky-100 text-sky-600 font-semibold' : 'text-neutral-700'
  }`;


  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r bg-background sm:flex">
      <div className="flex h-16 items-center border-b px-6">
        {/* Optional: Logo placeholder if different from header or for collapsed state */}
      </div>
      <nav className="flex-1 overflow-auto py-4 px-4 space-y-1">
        <NavLink to="/home" className={themedNavLinkClasses}>
          <Home className="h-5 w-5" />
          Home
        </NavLink>
        <NavLink to="/search" className={themedNavLinkClasses}>
          <Search className="h-5 w-5" />
          Search
        </NavLink>
        <NavLink to="/library" className={themedNavLinkClasses}>
          <Library className="h-5 w-5" />
          Your Library
        </NavLink>
        
        {/* Placeholder for expandable "Your Library" sub-items or other sections */}
        <div className="pt-4 mt-4 border-t">
          <Button variant="ghost" className="w-full justify-start text-neutral-700 hover:text-sky-700 hover:bg-sky-50">
            <PlusCircle className="mr-3 h-5 w-5" />
            Create Playlist
          </Button>
          <Button variant="ghost" className="w-full justify-start text-neutral-700 hover:text-sky-700 hover:bg-sky-50">
            <Heart className="mr-3 h-5 w-5" />
            Liked Songs
          </Button>
        </div>
      </nav>
    </aside>
  );
};

export default AppSidebar;