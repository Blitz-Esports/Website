this.body.addEventListener("pageLoaded", async () => {

    // Get the blog posts div
    const blogPostsDiv = document.getElementById('blog-container');
    const blogWidgetDiv = document.getElementById('blog-widget-container');
    const blogTagsDiv = document.getElementById('blog-tags-container');
    const blogAuthorDiv = document.getElementById('blog-author-container');

    // Get blog ID
    const params = new URLSearchParams(window.location.search);
    const blogId = params.get('id');

    // Fetch the blog posts & insert data
    const blogPostsData = await this.api("blog");
    const targetBlog = blogPostsData.find(blogPost => blogPost.id === blogId) || blogPostsData[0];
    blogPostsDiv.innerHTML = createBlogPost(targetBlog);

    // Update blog widget
    blogWidgetDiv.innerHTML = blogPostsData.slice(0, 5).map((blogData) => {
        const { id, Title, Thumbnail, "Created At": createdAt } = blogData;
        return `
        <article class="post">
        <div class="post-inner">
            <figure class="post-thumb"><a href="blog.html?id=${id}"><img
                        src="${Thumbnail}" alt=""></a></figure>
            <div class="post-info">${new Date(createdAt).toLocaleDateString()}</div>
            <div class="text"><a href="blog.html?id=${id}">${Title}</a></div>
        </div>
        </article>
        `
    }).join("\n")

    // Update blog tags
    if (targetBlog.Tags && targetBlog.Tags.length > 0) {
        blogTagsDiv.innerHTML = targetBlog.Tags.map((t) => {
            return `<a>${t}</a>`;
        }).join("\n");
    }
    else {
        blogTagsDiv.innerHTML = `<a>No tags</a>`
    }

    // Update blog author
    let authorAvatar = "images/avatars/default.png";
    if (targetBlog["Author Avatar"] && targetBlog["Author Avatar"].startsWith("avatars")) authorAvatar = `images/${targetBlog["Author Avatar"]}`;
    else if (targetBlog["Author Avatar"]) authorAvatar = `https://aggregator.blitzesports.org/resize/${targetBlog["Author Avatar"]}?w=160&h=166`

    blogAuthorDiv.innerHTML = `
    <figure class="thumb"><img src="${authorAvatar}" alt=""></figure>
    <h3 class="name">${targetBlog["Author Name"] || "Anonymous"}</h3>
    <div class="text">${targetBlog.Description || "No Description"}</div>
    `

    function createBlogPost(post) {
        const { Title, Thumbnail, "Created At": createdAt, Content, "Author Name": authorName } = post;
        return `
        <div class="image-box">
                                        <figure class="image"><img src="${Thumbnail || "https://ik.imagekit.io/blitz/website/blog/default.png"}" alt=""></figure>
                                    </div>
                                    <div class="lower-content">
                                        <div class="post-date">${new Date(createdAt).toLocaleDateString()}</div>
                                        <h3>${Title}</h3>
                                        <ul class="post-info">
                                            <li>by <a href="blog.html">${authorName}</a></li>
                                        </ul>
                                        <p>${Content}</p>
                                    </div>
        `
    };

})
