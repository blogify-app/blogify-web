import {FC} from "react";
import {Link} from "react-router-dom";
import {Icon} from "@iconify/react/dist/iconify";
import {Button} from "@/components/shadcn-ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn-ui/avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/shadcn-ui/navigation-menu";

// TODO: test this
// TODO: move else where, e.g: layout dir
export const NavBar: FC = () => {
  return (
    <div
      className="fixed grid w-screen grid-cols-10 gap-3 border-b border-slate-200 bg-white px-10 py-5"
      data-testid="Navbar"
    >
      <div className="logo w-30 h-15 col-span-1">
        <Link
          to="/"
          data-testid="blogify-logo"
          className="font-logo text-2xl font-bold"
        >
          BLOGIFY
        </Link>
      </div>
      <div className="col-span-8 flex justify-center">
        <NavigationMenu>
          <NavigationMenuList className="flex flex-col flex-wrap md:flex-row">
            <NavigationMenuItem className="mx-4 w-40">
              <NavigationMenuLink
                data-testid="home-menu"
                className={navigationMenuTriggerStyle()}
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="mx-4 w-40">
              <NavigationMenuLink
                data-testid="about-menu"
                className={navigationMenuTriggerStyle()}
              >
                About
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="mx-4 w-40">
              <NavigationMenuLink
                data-testid="profile-menu"
                className={navigationMenuTriggerStyle()}
              >
                Profile
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="col-span-1 flex justify-evenly align-middle">
        <Link to="">
          <Avatar>
            <AvatarImage data-testid="avatar" src="random_link" />
            <AvatarFallback data-testid="avatar">
              <Icon icon="material-symbols-light:face-6" className="text-2xl" />
            </AvatarFallback>
          </Avatar>
        </Link>
        <Button className="flex justify-evenly align-middle">
          <Icon
            data-testid="logout-icon-button"
            icon="material-symbols-light:login"
            className="text-2xl"
          />
        </Button>
      </div>
    </div>
  );
};
