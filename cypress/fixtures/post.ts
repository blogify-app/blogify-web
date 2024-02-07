import {Post, PostStatus} from "../../src/services/api/gen"; // alias path does not work here
import {user1} from "./user";

export const non_existent_id = () => "non_existent_pid";

export const post1 = (): Post => ({
    id: "post_1",
    thumbnail_url:
        "https://fr.freepik.com/photos-gratuite/vue-dessus-fraises-rouges-fraiches-bol-belles-fleurs-comme-tulipe-roses-fond-bois_12430572.htm#page=2&query=fleurs%20frais&position=18&from_view=keyword&track=ais&uuid=b0faa139-22de-4811-b57d-361006be8eae",
    description: "Lorem Lorem Description",
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo dolore voluptatibus facere nulla quam ipsa quibusdam, voluptatem laborum iure repellat suscipit fuga provident voluptas dolor dignissimos aperiam possimus officia incidunt.
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
        Provident ut at aliquam repellat, deserunt placeat nesciunt harum nulla nam ipsam. Debitis reprehenderit enim deleniti aliquam accusamus iusto maxime assumenda aspernatur! Nihil corrupti ab rem, saepe laborum temporibus nostrum?`,
    title: "Lorem ipsum dolor sit amet consectetur",
    creation_datetime: new Date("2024-01-19"),
    updated_at: new Date("2024-01-19"),
    author: user1(),
    status: PostStatus.ARCHIVED,
    categories: [{
        id: "category1_id",
        label: "Mathematics"
    },
        {
            id: "category2_id",
            label: "Podcasts"
        },
        {
            id: "category3_id",
            label: "Tools"
        }]
});


// Set "any" on purpose to avoid problems with null not assigned to string
export const postWithoutThumbnail = (): any[] => ([{
    id: "post_0",
    thumbnail_url: null,
    description: "Lorem Lorem Description",
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo dolore voluptatibus facere nulla quam ipsa quibusdam, voluptatem laborum iure repellat suscipit fuga provident voluptas dolor dignissimos aperiam possimus officia incidunt.
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
        Provident ut at aliquam repellat, deserunt placeat nesciunt harum nulla nam ipsam. Debitis reprehenderit enim deleniti aliquam accusamus iusto maxime assumenda aspernatur! Nihil corrupti ab rem, saepe laborum temporibus nostrum?`,
    title: "Lorem ipsum dolor sit amet consectetur",
    creation_datetime: new Date("2024-01-19"),
    updated_at: new Date("2024-01-19"),
    author: user1(),
    status: PostStatus.ARCHIVED,
}]);

export const postWithoutValues = (): any[] => ([{
    id: null,
    thumbnail_url: null,
    description: null,
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo dolore voluptatibus facere nulla quam ipsa quibusdam, voluptatem laborum iure repellat suscipit fuga provident voluptas dolor dignissimos aperiam possimus officia incidunt.
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
        Provident ut at aliquam repellat, deserunt placeat nesciunt harum nulla nam ipsam. Debitis reprehenderit enim deleniti aliquam accusamus iusto maxime assumenda aspernatur! Nihil corrupti ab rem, saepe laborum temporibus nostrum?`,
    title: null,
    creation_datetime: null,
    updated_at: null,
    author: null,
    status: null,
}]);

export const createPosts = (n: number): Post[] => {
    const posts: Post[] = [];
    for (let i = 0; i < n; i++) {
        posts.push({
            id: `post_${i}`,
            thumbnail_url:
                "https://fr.freepik.com/photos-gratuite/vue-dessus-fraises-rouges-fraiches-bol-belles-fleurs-comme-tulipe-roses-fond-bois_12430572.htm#page=2&query=fleurs%20frais&position=18&from_view=keyword&track=ais&uuid=b0faa139-22de-4811-b57d-361006be8eae",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo dolore voluptatibus facere nulla quam ipsa quibusdam, voluptatem laborum iure.",
            content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo dolore voluptatibus facere nulla quam ipsa quibusdam, voluptatem laborum iure repellat suscipit fuga provident voluptas dolor dignissimos aperiam possimus officia incidunt.
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
        Provident ut at aliquam repellat, deserunt placeat nesciunt harum nulla nam ipsam. Debitis reprehenderit enim deleniti aliquam accusamus iusto maxime assumenda aspernatur! Nihil corrupti ab rem, saepe laborum temporibus nostrum?`,
            title: "Lorem ipsum dolor sit amet consectetur",
            creation_datetime: new Date("2024-01-19"),
            updated_at: new Date("2024-01-19"),
            author: user1(),
            status: PostStatus.ARCHIVED,
        });
    }
    return posts;
};
