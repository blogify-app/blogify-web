import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import image from '../../assets/daisy_fields.jpg'
import blankUserProfile from '../../assets/noun-user-picture.svg'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { posts } from "./data/posts";
import { users } from "./data/user";
import { calculateReadTime } from "./utils/get_reading_time";

const BADGES = ['lorem', 'ipsum', 'hello']


const NavBar: React.FC = () => {
    return (
        <div id='blogify-menu' className="w-screen grid grid-cols-10 gap-3 px-10 py-5 shadow-md shadow-slate-200 fixed bg-white">
            <div className="logo w-30 h-15 col-span-1">
                <Link to="/" className="text-2xl" style={{ fontFamily: "Lilita One, sans-serif", fontWeight: 'bolder' }}>
                    BLOGIFY
                </Link>
            </div>
            <div className="col-span-8 flex justify-center">
                <NavigationMenu>
                    <NavigationMenuList className="flex flex-wrap flex-col md:flex-row">
                        <NavigationMenuItem className="mx-4 w-40">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Home
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="mx-4 w-40">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                About
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="mx-4 w-40">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Profile
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className="col-span-1 flex justify-evenly align-middle">
                <Link to=''>
                    <Avatar>
                        <AvatarImage src="random_link" />
                        <AvatarFallback><Icon icon='material-symbols-light:face-6' className="text-2xl" /></AvatarFallback>
                    </Avatar>
                </Link>
                <Button className="flex justify-evenly align-middle"><Icon icon="material-symbols-light:login" className="text-2xl"/></Button>
            </div>
        </div>
    );
}

export const Post: React.FC = () => {
    // TODO: implement providers
    // TODO: implement error page if user or post is not found
    const currentPost = posts.filter((post) => post.id === 'post_1')[0]

    const postAuthor = (users.filter((user) => user.id === currentPost?.user_id))[0];

    return (
        <div className=" bg-white overflow-hidden">
            <NavBar />
            <div id='post-title' className="w-screen flex justify-center mb-4 p-11 mt-40 md:mt-20"><p className="text-6xl" style={{
                fontFamily: 'Oswald, sans-serif',
                fontOpticalSizing: 'auto',
                fontWeight: 618,
                fontStyle: 'normal'
            }}>{currentPost?.title}</p></div>
            <div className="w-screen flex justify-center">
                <div id='blog-info' className="grid grid-cols-3 w-[500px]">
                    <div id='user-info' className="flex justify-center items-center">
                        <Icon icon='material-symbols-light:face-6' className="text-2xl" />
                        <span className="mx-1">by <strong>{postAuthor.first_name}</strong></span>
                    </div>
                    <div id='read-duration-info' className="flex justify-center items-center">
                        <Icon icon="material-symbols-light:nest-clock-farsight-analog-outline" className="text-2xl" />
                        <span className="mx-1">{`${calculateReadTime(currentPost?.content || '').minutes} min read`}</span>
                    </div>
                    <div id='creation-date-info' className="flex justify-center items-center">
                        <Icon icon="material-symbols-light:calendar-month-outline" className="text-2xl" />
                        <span className="mx-1">{new Date(currentPost?.creation_datetime).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
            <div className="my-5 grid grid-cols-8">
                <div className="col-span-1 h-[300px]"></div>
                <div className="col-span-6 grid grid-cols-8 gap-5">
                    <div className="col-span-8 h-[300px]"><img src={image} className="object-cover w-full h-full" /></div>
                    <div className="col-span-2 p-4">
                        <div className="flex justify-center flex-col mx-4">
                            <p className="text-left text-2xl mb-5" style={{
                                fontFamily: 'Oswald, sans-serif'
                            }}>Menu</p>
                            <ul className="text-left ml-1">
                                <li>menu menu menu menu</li>
                                <li>menu menu menu menu</li>
                                <li>menu menu menu menu</li>
                                <li>menu menu menu menu</li>
                                <li>menu menu menu menu</li>
                                <li>menu menu menu menu</li>
                                <li>menu menu menu menu</li>
                                <li>menu menu menu menu</li>
                                <li>menu menu menu menu</li>
                                <li>menu menu menu menu</li>
                                <li>menu menu menu menu</li>
                                <li>menu menu menu menu</li>
                                <li>menu menu menu menu</li>
                                <li>menu menu menu menu</li>
                                <li>menu menu menu menu</li>
                                <li>menu menu menu menu</li>
                                <li>menu menu menu menu</li>
                                <li>menu menu menu menu</li>
                                <li>menu menu menu menu</li>
                                <li>menu menu menu menu</li>
                            </ul>

                        </div>
                    </div>
                    <div id='post-container' className="col-span-6 p-4">
                        <div className="mx-10">{currentPost?.content}</div>
                        <div id='tags-container' className='w-full flex mx-10 py-10'>
                            <span className="mr-2">Tags : </span>
                            <div className="flex justify-evenly">{BADGES.map((badge) => (<Badge className="mx-1">{badge}</Badge>))}</div>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 h-[300px]"></div>
            </div>
            <div id="about-author" className="grid grid-cols-8 bg-slate-50 " >
                <div className="col-span-1 h-[300px]"></div>
                <div className="col-span-6 h-[300px] grid grid-cols-8">
                    <div id='author-picture' className=" col-span-2 flex justify-center"><img src={blankUserProfile} className="bg-white object-cover w-[200px] h-[200px] m-auto rounded-md" /></div>
                    <div id='author-details' className="col-span-6 container flex justify-center flex-col">
                        <Link to='' id='author-name' className="text-left text-2xl mb-5 hover:text-slate-700 active:font-semibold focus:text-slate-200" style={{
                            fontFamily: 'Oswald, sans-serif'
                        }}>{`${postAuthor?.first_name} ${postAuthor?.last_name}`}</Link>
                        <p className="truncate overflow-hidden">{postAuthor?.about}</p>
                        <Link to='' className=" my-3 underline hover:text-slate-700 active:font-semibold focus:text-slate-700">See more about this author</Link>
                    </div>
                </div>
                <div className="col-span-1 h-[300px]"></div>
            </div>

        </div>
    );
}