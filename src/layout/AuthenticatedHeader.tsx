import {FC, memo} from "react";
import {Link} from "react-router-dom";
import {Icon} from "@iconify/react";
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

export const AuthenticatedHeaderComponent: FC = () => {
  return (
    <div
      className="grid h-full w-full grid-cols-10 items-center gap-3 bg-white px-5"
      data-testid="authenticated-header"
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
              <Link to="/">
                <NavigationMenuLink
                  data-testid="home-menu"
                  className={navigationMenuTriggerStyle()}
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="mx-4 w-40">
              <Link to="/posts">
                <NavigationMenuLink
                  data-testid="about-menu"
                  className={navigationMenuTriggerStyle()}
                >
                  Posts
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="mx-4 w-40">
              {/* TODO: change this to the profile link */}
              <Link to="/">
                <NavigationMenuLink
                  data-testid="profile-menu"
                  className={navigationMenuTriggerStyle()}
                >
                  Profile
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="col-span-1 flex justify-evenly align-middle">
        {/* TODO: change this to the profile link */}
        <Link to="/">
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

export const AuthenticatedHeader = memo(AuthenticatedHeaderComponent);
