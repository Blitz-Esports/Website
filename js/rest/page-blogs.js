this.body.addEventListener("pageLoaded", async (data) => {

    // Get the blog posts div
    const blogPostsDiv = document.getElementById('blog-container');

    // Fetch the blog posts
    const blogPostsData = this.transData(data, "blog");

    blogPostsDiv.innerHTML = blogPostsData.map((blogPost, index) => {
        const post = createBlogPost(blogPost, index);
        return post;
    }).join('\n');

    function createBlogPost(post, i) {
        const { id, Title, Thumbnail, "Created At": createdAt } = post;
        if (i % 4 === 0) i = 0
        return `
                <!-- News Block -->
				<div class="news-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay="${i + (i * 300)}ms">
					<div class="inner-box hvr-bob">
						<div class="image">
							<a href="blog?id=${id}"><img src="${Thumbnail || "https://ik.imagekit.io/blitz/website/blog/default.png"}" alt="" /></a>
						</div>
						<div class="lower-content">
							<div class="post-date">${new Date(createdAt).toLocaleDateString()}</div>
							<h3><a href="blog?id=${id}">${Title}</a></h3>
						</div>
					</div>
				</div>
                `
    };

})