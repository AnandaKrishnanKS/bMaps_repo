import React from 'react';
import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/shared/dropdown-menu';
import { Button } from '@/components/shared/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/shared/avatar';
import { LayoutDashboard, LogOut, ShieldAlert } from 'lucide-react';

interface UserDropdownProps {
    user_name: string;
    user_email: string;
    setShowLogOutModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user_name, user_email, setShowLogOutModal }) => {
    const router = useRouter();

    return (
        <div className="hidden lg:block h-min mt-1.5">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <span className="sr-only">User menu</span>
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="https://i.pravatar.cc/300" alt="Avatar" />
                            <AvatarFallback>{user_name}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user_name}</p>
                            <p className="text-xs leading-none text-muted-foreground">{user_email}</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => router.replace("/dashboard")}>
                            <LayoutDashboard className="h-4 w-4 mr-2" />
                            Dashboard
                            <DropdownMenuShortcut className={"bg-gray-200 px-1 rounded"}>⇧⌘D</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.replace("/admin")}>
                            <ShieldAlert className="h-4 w-4 mr-2" />
                            Admin Tools
                            <DropdownMenuShortcut className={"bg-gray-200 px-1 rounded"}>⇧⌘A</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setShowLogOutModal(true)}>
                        <LogOut className="h-4 w-4 mr-2" />
                        <p>Log out</p>
                        <DropdownMenuShortcut className={"bg-gray-200 px-1 rounded"}>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default UserDropdown;
