import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from '@tanstack/react-router';
import { Heart, Home, LayoutDashboard, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';
import { PATHNAME_ROUTES } from '../../constants/main.constants';
import { useAuthResponseContext } from '../../contexts/authResponse/authResponse.context';
import { useLogoutRequest } from '../../hooks/useLogoutRequest/useLogoutRequest';
import { EditProfileDialog } from '../editProfileDialog/editProfileDialog';
import { FavoritesDialog } from '../favoritesDialog/favoritesDialog';
import { MyPropertiesDialog } from '../myPropertiesDialog/myPropertiesDialog';

const INITIALS_LENGTH = 2;

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, INITIALS_LENGTH);
};

// eslint-disable-next-line max-lines-per-function
export const UserProfileMenu = (): React.ReactElement => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [favoritesDialogOpen, setFavoritesDialogOpen] = useState(false);
  const [propertiesDialogOpen, setPropertiesDialogOpen] = useState(false);

  const { authResponse } = useAuthResponseContext();
  const { onLogout, isPending } = useLogoutRequest();

  const user = authResponse!.user;

  if (isPending) {
    return <div>Signing out...</div>;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="gap-2 h-auto p-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user.photoUrl} alt={user.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {getInitials(user?.name ?? 'User')}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm hidden lg:inline">{user.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <div className="flex items-center gap-3 p-2">
            <Avatar className="w-12 h-12">
              <AvatarImage src={user.photoUrl} alt={user.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getInitials(user.name ?? 'User')}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
            <Settings className="w-4 h-4" />
            <span>Edit Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFavoritesDialogOpen(true)}>
            <Heart className="w-4 h-4" />
            <span>My Favorites</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setPropertiesDialogOpen(true)}>
            <Home className="w-4 h-4" />
            <span>My Properties</span>
          </DropdownMenuItem>
          {user.isAdmin && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to={PATHNAME_ROUTES.ADMIN}>
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Admin Panel</span>
                </Link>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => void onLogout()} variant="destructive">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditProfileDialog open={editDialogOpen} onOpenChange={setEditDialogOpen} getInitials={getInitials} />

      <FavoritesDialog open={favoritesDialogOpen} onOpenChange={setFavoritesDialogOpen} />
      <MyPropertiesDialog open={propertiesDialogOpen} onOpenChange={setPropertiesDialogOpen} />
    </>
  );
};
