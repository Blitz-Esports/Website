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
    const blogPostsData =  await this.graphql(`
    query MyQuery {
        blogs {
          authorAvatar
          authorDescription
          authorName
          content
          createdAt
          id
          slug
          tags
          thumbnail
          title
        }
      }      
    `);
    const targetBlog = blogPostsData.find(blogPost => blogPost.id === blogId) || blogPostsData[0];
    blogPostsDiv.innerHTML = createBlogPost(targetBlog);

    // Update blog widget
    blogWidgetDiv.innerHTML = blogPostsData.slice(0, 5).map((blogData) => {
        const { id, title, thumbnail, createdAt } = blogData;
        const thumb = thumbnail ? thumbnail[0].url : "https://ik.imagekit.io/blitz/website/blog/default.png"
        return `
        <article class="post">
        <div class="post-inner">
            <figure class="post-thumb"><a href="blog.html?id=${id}"><img
                        src="${thumb}" alt=""></a></figure>
            <div class="post-info">${new Date(createdAt).toLocaleDateString()}</div>
            <div class="text"><a href="blog.html?id=${id}">${title}</a></div>
        </div>
        </article>
        `
    }).join("\n")

    // Update blog tags
    if(targetBlog.tags.length > 0) {
        blogTagsDiv.innerHTML = targetBlog.tags.map((t) => {
            return `<a>${t}</a>`;
        }).join("\n");
    }
    else {
        blogTagsDiv.innerHTML = `<a>No tags</a>`
    }
   
    // Update blog author
    let authorAvatar = "images/avatars/default.png";
    if(targetBlog.authorAvatar && targetBlog.authorAvatar.startsWith("avatars"))  authorAvatar = `images/${targetBlog.authorAvatar}`;
    else if(targetBlog.authorAvatar) authorAvatar = `https://imageproxy.blitzesports.org/-/rs:fit:160:166/plain/${targetBlog.authorAvatar}`

    blogAuthorDiv.innerHTML = `
    <figure class="thumb"><img src="${authorAvatar}" alt=""></figure>
    <h3 class="name">${targetBlog.authorName || "Anonymous"}</h3>
    <div class="text">${targetBlog.authorDescription || "No Description"}</div>
    `

    function createBlogPost(post) {
        const { title, thumbnail, createdAt, content, authorName } = post;
        const thumb = thumbnail ? thumbnail[0].url : "https://ik.imagekit.io/blitz/website/blog/default.png"
        return `
        <div class="image-box">
                                        <figure class="image"><img src="${thumb || "https://ik.imagekit.io/blitz/website/blog/default.png"}" alt=""></figure>
                                    </div>
                                    <div class="lower-content">
                                        <div class="post-date">${new Date(createdAt).toLocaleDateString()}</div>
                                        <h3>${title}</h3>
                                        <ul class="post-info">
                                            <li>by <a href="blog.html#">${authorName}</a></li>
                                        </ul>
                                        <p>${content}</p>
                                    </div>
        `
    };

})