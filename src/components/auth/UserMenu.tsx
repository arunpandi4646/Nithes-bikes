'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppContext } from '@/contexts/AppContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Settings, User as UserIcon, ChevronDown } from 'lucide-react';

export function UserMenu() {
  const { user, setActiveSection } = useAppContext();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({ title: 'Logged out successfully.' });
      setActiveSection('home');
    } catch (error) {
      toast({ variant: 'destructive', title: 'Logout failed.' });
    }
  };

  if (!user) return null;

  const displayName = user.displayName || user.email?.split('@')[0] || 'User';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-auto items-center gap-2 rounded-full p-1 pr-3 transition-colors hover:bg-white/10">
          <Avatar className="h-9 w-9 border-2 border-primary">
            <AvatarImage src={user.photoURL || ''} alt={displayName} />
            <AvatarFallback>{initial}</AvatarFallback>
          </Avatar>
          <span className="hidden max-w-[100px] truncate text-sm font-medium text-white sm:block">
            {displayName}
          </span>
          <ChevronDown className="h-4 w-4 text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
