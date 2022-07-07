this.body.addEventListener("pageLoaded", async () => {

    // Get the blog posts div
    const blogPostsDiv = document.getElementById('blog-container');

    // Fetch the blog posts
    const blogPostsData = await this.graphql(`
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

    blogPostsDiv.innerHTML = blogPostsData.map((blogPost , index) => {
        const post = createBlogPost(blogPost , index);
        return post;
    }).join('\n');
    
    function createBlogPost(post , i) {
        const { id, title, thumbnail, createdAt } = post;
        const thumb = thumbnail[0] ? thumbnail[0].url : undefined;
        if(i % 4 === 0) i = 0
        return `
                <!-- News Block -->
				<div class="news-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay="${i + (i * 300)}ms">
					<div class="inner-box hvr-bob">
						<div class="image">
							<a href="blog.html?id=${id}"><img src="${thumb || "https://ik.imagekit.io/blitz/website/blog/default.png"}" alt="" /></a>
						</div>
						<div class="lower-content">
							<div class="post-date">${new Date(createdAt).toLocaleDateString()}</div>
							<h3><a href="blog.html?id=${id}">${title}</a></h3>
						</div>
					</div>
				</div>
                `
    };

})