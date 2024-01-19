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

const BADGES = ['lorem', 'ipsum', 'hello']
interface PostProps {
    id: string,
}
const NavBar = () => {
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
                <Button className="flex justify-evenly align-middle"><span>Log out</span></Button>
            </div>
        </div>
    );
}

export const Post: React.FC<PostProps> = ({id}) => {
    return (
        <div className=" bg-white overflow-hidden">
            <NavBar />
            <div id='post-title' className="w-screen flex justify-center mb-4 p-11 mt-40 md:mt-20"><p className="text-6xl" style={{
                fontFamily: 'Oswald, sans-serif',
                fontOpticalSizing: 'auto',
                fontWeight: 618,
                fontStyle: 'normal'
            }}>Lorem ipsum dolor sit amet consectetur</p></div>
            <div className="w-screen flex justify-center">
                <div id='blog-info' className="grid grid-cols-3 w-[500px]">
                    <div id='user-info' className="flex justify-center items-center">
                        <Icon icon='material-symbols-light:face-6' className="text-2xl" />
                        <span className="mx-1">by <strong>John Doe</strong></span>
                    </div>
                    <div id='read-duration-info' className="flex justify-center items-center">
                        <Icon icon="material-symbols-light:nest-clock-farsight-analog-outline" className="text-2xl" />
                        <span className="mx-1">10 min read</span>
                    </div>
                    <div id='creation-date-info' className="flex justify-center items-center">
                        <Icon icon="material-symbols-light:calendar-month-outline" className="text-2xl" />
                        <span className="mx-1">12 Feb 2023</span>
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
                        <div className="mx-10">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo dolore voluptatibus facere nulla quam ipsa quibusdam, voluptatem laborum iure repellat suscipit fuga provident voluptas dolor dignissimos aperiam possimus officia incidunt.
                            Sunt voluptatum ipsa eius recusandae placeat et fugit, eos nemo? Est perspiciatis aut asperiores assumenda non deleniti provident! Dolorem excepturi laudantium quod autem assumenda repellendus ad error nobis illo culpa?
                            Itaque id dolorum vero officiis quas veniam sint laborum, aliquid nulla magnam! Accusamus incidunt aperiam voluptatem beatae quas. Placeat nisi obcaecati quasi nihil maxime aperiam unde eius ullam, error voluptas!
                            A sapiente ducimus magnam quasi animi enim beatae quidem veniam debitis blanditiis ex facilis totam cupiditate, commodi repudiandae corrupti? Illum cum deleniti exercitationem voluptas rerum quam vero ipsa quibusdam porro.
                            Asperiores iure, nostrum quas quibusdam vel architecto aut eaque, saepe voluptatum reiciendis corrupti, odio amet neque nihil eos. Quis, incidunt corporis aut ratione natus possimus expedita doloribus veritatis exercitationem in.
                            Minus aliquam quod incidunt maiores dignissimos nisi sit, culpa quae fuga impedit non quis vel quisquam animi dolor iure magnam! Ratione voluptatum doloribus ad harum, aliquam minus neque incidunt cumque.
                            Delectus quae perspiciatis quas tenetur, eum quasi eos quam quod dicta alias facere incidunt eaque sequi, totam a possimus ipsam, nobis accusamus deleniti. Laboriosam cupiditate quia officiis tempore illum laudantium.
                            Molestiae quam rem ipsum ex iste dolor et cumque numquam quis sit! Eius vitae enim quis cumque, consequatur suscipit facere iste perspiciatis a tempora. Delectus sed dolorum nam explicabo magnam.
                            Nihil ratione autem quisquam fugit maxime ipsum aut tempora libero. Itaque accusantium, tempora inventore in omnis distinctio perspiciatis ipsa recusandae at saepe, enim est pariatur qui soluta necessitatibus iure exercitationem?
                            Itaque cum qui ipsam libero quidem iusto consectetur facere rem explicabo, impedit accusantium quasi aspernatur quae exercitationem inventore adipisci. Maxime quas magnam quisquam excepturi quod aut, minus eveniet suscipit culpa.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates aliquid excepturi facilis, eaque sit ad laborum ratione, dolores dicta sequi recusandae, sunt maxime quis vero et est? Obcaecati, reprehenderit nesciunt.
                            Eaque sit soluta quia illum distinctio pariatur debitis doloribus saepe, et repellendus laudantium dolores molestias laborum officia sapiente nesciunt quibusdam error. Commodi, a aperiam. Aliquid corrupti numquam esse in quod!
                            Impedit temporibus soluta ea, dicta aspernatur provident perferendis repellendus sequi officiis distinctio dolores iste quaerat vero reprehenderit perspiciatis corporis iusto, doloribus nobis itaque. Sunt magnam eius ducimus eligendi eaque placeat.
                            Ducimus illo, similique hic corrupti quam, consequuntur pariatur eaque est voluptates inventore beatae reiciendis eveniet eligendi possimus accusamus! Totam explicabo blanditiis vero unde temporibus quibusdam impedit consequuntur earum provident? Consequatur?
                            Vitae eius fugiat provident officia tempora fuga expedita itaque cumque velit quo animi reiciendis sint aliquam, modi deleniti corrupti odio ad ipsa quod neque debitis! Atque cumque facilis nesciunt iste.
                            Facere, cumque ut. Ullam consequuntur voluptatum consequatur autem rem doloribus mollitia nihil, cupiditate quisquam voluptatem quo perspiciatis, assumenda delectus non provident laborum maxime rerum dicta officia nemo sapiente recusandae eaque!
                            Deserunt repellendus dolorum facere repudiandae provident ea, recusandae magni blanditiis harum quam culpa, cumque quibusdam? Repellat, facere velit maxime est nesciunt voluptatem quibusdam voluptatum eos veritatis minima placeat illo pariatur?
                            Numquam, assumenda quas aliquam accusantium doloribus cupiditate, ullam reiciendis esse optio vitae a accusamus natus cumque? Rem earum quidem quibusdam laudantium, sunt commodi, quae saepe facilis exercitationem enim molestiae totam.
                            Ducimus temporibus assumenda reprehenderit repellat ex quaerat velit molestiae, magni, eum harum tenetur veniam? Fugiat ratione cum beatae saepe repellat fuga veritatis ducimus maxime vel eos. Quasi vitae sed culpa.
                            Provident ut at aliquam repellat, deserunt placeat nesciunt harum nulla nam ipsam. Debitis reprehenderit enim deleniti aliquam accusamus iusto maxime assumenda aspernatur! Nihil corrupti ab rem, saepe laborum temporibus nostrum?
                        </div>
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
                        }}>Mr Lorem</Link>
                        <p className="truncate overflow-hidden">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias totam recusandae a reiciendis quas ducimus at tempora neque quasi eveniet, magni deleniti sapiente voluptas tenetur labore ad quod vero dignissimos?</p>
                        <Link to='' className=" my-3 underline hover:text-slate-700 active:font-semibold focus:text-slate-700">See more about this author</Link>
                    </div>
                </div>
                <div className="col-span-1 h-[300px]"></div>
            </div>

        </div>
    );
}