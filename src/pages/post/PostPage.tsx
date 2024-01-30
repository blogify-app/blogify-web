import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {toast} from "sonner";
import {Post} from "@/features/post";
import {PostProvider} from "@/services/api";
import {Post as PostType} from "@/services/api/gen";

const POST: PostType = {
  title: "Stop using localStorage",
  creation_datetime: new Date(),
  author_id: "author_id",
  content: `Stop Using localStorage!
![](https://miro.medium.com/v2/resize:fit:630/0*B9czCu8g4ihd4Ijq.png)

Image from ducktypelabs.com: [Is putting JWTs in local storage “bad”?](https://www.ducktypelabs.com/is-localstorage-bad/)

[**localStorage**](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) was not designed for modern applications and does not support [the structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm). The title is not clickbait, the message is abrupt **“Stop Using localStorage!”** there is no ambiguity here and we are not holding hands and singing _kumbay_ to soften the blow.

Problems with localStorage?
===========================

![](https://miro.medium.com/v2/resize:fit:315/0*RCjT1o9LQJur6-ol.jpg)

Image from: Randall Degges — [Please Stop Using Local Storage](https://dev.to/rdegges/please-stop-using-local-storage-1i04)

**_localStorage_** came about around [2009](https://caniuse.com/?search=localstorage) as a 5MB string based storage. Let’s cut to the chase with some bullet points since our attention spans are in disarray these days:

*   **An Object of Strings**: You can only store strings. If you want to store anything else you have to serialize it to a string and deserialize to retrieve. This little quirk has been responsible for all sorts of broken websites _E.g. When you store “true” or “false” there is a third value “”_
*   **Historically Slow**: localStorage is somewhat slow at storing and retrieving data, which makes it undesirable for applications that require frequent transactions. _Forget your latest MacBook, benchmarks on low powered devices can reveal the cost more realistically._
*   **Size Limitation**: localStorage has a [5MB cap](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria) _which is subject to eviction_. This is a very small amount for modern applications. It’s difficult to store encoded media with such a small amount. This is not a suitable size for modern applications. And it’s not set in stone, just like all persistent storage on the web localStorage can and will be evicted by the browser at some point. **You are expected to manage that part of the data life-cycle, despite there being no reminder to.**
*   **No Web Worker Access**: I hope you’re understanding that localStorage is not an API for the future or to harness concurrency, which strives on low powered devices.
*   **No Atomicity or Isolation**: localStorage does not guarantee atomicity across multiple operations. There is no locking mechanism to ensure what gets written or to prevent information being written over.
*   **No Data Separation or Granular Origin Scoping**: localStorage is just an object of strings, there is no data separation, user data is mixed with app data. Although it uses the same-origin policy there is no way to restrict data by a particular doman or subdomain that has access. This can create duplicated work when meeting GDPR standards across multiple domains.
*   **No Grouped Transactions:** localStorage has no transactions by the database definiton, but it also has no way to group operations. Each operation is synchronous, non-isolated, with no locking.
*   **Serialization Gotchas**: So many websites are operating with broken state because of poor localStorage management. From the time of this article, just last year a lone as a customer I was told to “Clear your cache” by 3 different web services, which I discovered was due to improper localStorage management. **_If you’re not familiar with the gotchas when storing data in localStorage you may be creating bugs in your application that you may never encounter_**. These type-errors are not always obvious, especially for new developers.
*   **No Structured Data**: JavaScript has a thing called [The structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm). You really need to know this is a thing. Modern APIs and updated APIs such as **postMessage**, **WebWorkers**, **IndexedDB**, **Caches API, BroadcastChannel, Channel Messaging API, MessagePort** and the **History API** all use structured data. It solves the problem with serializing and deserializing JSON within an app. localStorage had not been updated with this feature and there are no discussions around it happening in the future.
*   **Synchronous Blocking Operations**: localStorage is not asynchronous and will block the main thread. It may even make your animations choppy depending on how much you read/ write and at what frequency. Asynchronicity is fundamental to creating fluid applications, especially for mobile devices
*   **Common security compromises:** To clarify, you should never store sensitive data in any persistent storage that wasn’t designed specifically for it. Developers still commonly store Session IDs, JWTs, credit card details and API keys in localStorage. It’s a very common security hack because it is as easy as \`window.localStorage\`

What happend to WebSQL?
=======================

![](https://miro.medium.com/v2/resize:fit:630/1*_2_tLrE4b3p9VXmPOgvk9Q.png)

[WebSQL](https://developer.chrome.com/blog/deprecating-web-sql) aimed to be a simple SQL database interface for the web. It had some decent support but eventually faced challenges that led to depreciation.

Why did they drop the baby?
---------------------------

*   **Single-Vendor Implementation**: WebSQL was primarily a webkit thing (Initially Chrome and Safari). A lack of support from other major browser vendors (Mozilla and Microsoft) made developer adoption close to non-existent in the commercial world.
*   **No W3C Standardization:** this is crucial for adoption. [W3 appeared to drop the proposal in 2010](https://www.w3.org/TR/webdatabase/).
*   **Competition with IndexedDB**: IndexedDB was gaining more traction and support during the rise of WebSQL. Unlike WebSQL, IndexedDB was designed to be a standard, cross-browser solution.
*   **Security Concerns**: Several developers and security specialists showed concerns regarding WebSQL’s safety. They were sceptical of various aspects including lack of permission controls and SOL style vulnerabilities.

Eventually, IndexedDB became the “recommended” standard for client-side storage, being seen as more robust and cross-browser friendly. But **what good is “recommended” when the majority of experienced front-end developers _at the time of this article_ have avoided it like the plague?**

Despite its shortcomings, at the time WebSQL was highly praised amongst the web community and was a worthy competitor.

What about Cookies?
===================

> Cookies were created in 1994 by Lou Montulli, a web browser programmer at Netscape Communications.

Some of you were not even born when cookies were effing stuff up. The title of this article should be “Stop Using Cookies and localStorage” but that’s a very difficult fight, _(yes we should use secure cookies)_

*   **Size Limitations**: Cookies are typically limited to roughly 4KB per domain.
*   **Data Sent with Every Request**: Cookies are sent with every HTTP request to the associated domain. If your data doesn’t need to be transmitted with every request, this can result in unnecessary overhead and increased bandwidth usage.
*   **Security Concerns**: Cookies are more susceptible to XSS. Because cookies are automatically included with every request to the domain, they can be targeted by malicious scripts.
*   **Expiration and Lifetime**: Cookies were designed to expire by a given date.
*   **Increased latency**: Because cookies are automatically included in every HTTP request to the domain, they typically lead to increased latency thus making your website slower to load.

Why IndexedDB
=============

![](https://miro.medium.com/v2/resize:fit:630/0*iaRQdRkmYVALFW8y.jpg)

_(Libraries like_ [_db64_](https://github.com/julienetie/db64) _and_ [_idb_](https://github.com/jakearchibald/idb) _make IndexedDB easeir to consume)_

*   **Better Performance**: Unlike localStorage, IndexedDB operates asynchronously, preventing blocking operations. _(The API is event-driven not Promise based)_
*   **Ample Storage Quota**: IndexedDB provides a larger storage quota _(dependent on the browser, OS and available storage)_ compared to [localStorage’s 5MB cap](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria).
*   **Reliability and Structured Data**: Storing and retrieving data in localStroage can yield unpredictable results if not done properly. IndexedDB reduces common type-coercion and embraces the [structuredClone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), ensuring data integrity.

You probably don’t want to use IndexedDB directly
=================================================

![](https://miro.medium.com/v2/resize:fit:630/0*2Vq_izmqdx9ymmtH.jpg)

^ For those of you who think this article is about convincing you to learn the IndexedDB API. Below is the same content, I just had to add this image to draw attention :)

**It’s absolutely not fun, and you have better things to do than to fight with a hostile storage just to be disappointed by how it’s not what you anticipated.**

The reason you want to use a library is because mostly they:

*   Are promise based
*   Are easier to use
*   Reduce boilerplate code
*   Focus on more meaningful things.

I don’t recommend using libraries bigger than e.g. 10kB gzipped. All these kilobytes add up and those 50kB+ libs are not doing anything meaningful for your real-world scenarios.

The one problem I found with most IndexedDB libraries is how they are mostly oriented around versioning, which you probably don’t need at all, **especially if you’re just looking for a reasonable localStorage alternative**.

> Quick plug: I made [db64](https://github.com/julienetie/db64), a library to focus on just the more relative aspects of IndexedDB.

If you do need versioning or cursors I’d recommend [idb](https://github.com/jakearchibald/idb), which is a comprehensive library that covers all niche cases well.

Conclusion
==========

IMO **nobody should be using localStorage in this day and age**. New developers will have a better experience playing with [Promise()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) or [async/ await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) than trying to figure out why the number ‘0’ is making their conditions _truthy_.

As a recap there’s a speed advantage, it’s non-blocking, you can store types reliably and you can even use cursors to iterate over entries, if you’re into that sort of thing you can easily build a client-side search-engine with accumulated data fetches that don’t make your animations fidget like how localStorage blocks and interferes with them 👀.

_(Update: IndexedDB is commonly described as “low-level” . There’s absolutely nothing low-level about IndexedDB, it’s just an API with an old-style and unfriendly syntax. But that doesn't negate it’s underlying capabilities, hence common library usage)_

For persistent storage, IndexedDB is the better tool for the job, you don’t necessarily need to learn the API or use it directly [unless you want to](/@kamresh485/indexeddb-tutorial-for-beginners-a-comprehensive-guide-with-coding-examples-74df2914d4d5), but it makes sense to use a small wrapper library to make life easier.

Thanks for the read :)`,
};

export const PostPage: FC = () => {
  const [post, setPost] = useState<PostType>({});

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetch = async () => {
      if (!id) return;
      try {
        const post = await PostProvider.getById(id);
        setPost(post);
      } catch (_e) {
        toast("Could not get the post content.");
      }
    };

    void fetch();
  }, [id]);

  // TODO: loading .. or redirect
  if (!post) return null;
  return <Post post={POST} />;
};
