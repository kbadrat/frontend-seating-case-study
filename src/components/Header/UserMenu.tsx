import { FC } from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "../ui/button";
import { IUser } from "@/types/types";

interface Props {
    user: IUser;
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const UserMenu: FC<Props> = ({ user, setUser }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <div className="flex items-center gap-2">
                        <Avatar>
                            {/* <AvatarImage
                                src={`https://source.boringavatars.com/marble/120/<user-email>?colors=25106C,7F46DB`}
                            /> */}
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col text-left">
                            <span className="text-sm font-medium">
                                {`${user.firstName} ${user.lastName}`}
                            </span>
                            <span className="text-xs text-zinc-500">
                                {user.email}
                            </span>
                        </div>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[250px]">
                <DropdownMenuLabel>{`${user.firstName} ${user.lastName}`}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setUser(null)}>
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserMenu;
