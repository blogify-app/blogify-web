export const Post = () => {
    return (
        <div>
            <div id='blogify-banner' className="bg-slate-200 h-[100px] w-screen">
                Banner
            </div>
            <div id='post-title' className="w-screen bg-slate-500 p-4 flex justify-center mb-4"><p className="text-4xl">Title</p></div>
            <div id='post-container' className="container bg-slate-700 grid grid-cols-5 gap-3 px-4">
                <div id='post-content' className="bg-slate-100 col-span-4">Content</div>
                <div id='post-menu' className="bg-slate-100 col-span-1">Menu</div>
            </div>
        </div>
            
    );
}