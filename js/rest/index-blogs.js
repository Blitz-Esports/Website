this.body.addEventListener("pageLoaded", async (data) => {

    // Get the blog posts div
    const blogPostsDiv = document.getElementById('blog-container');

    // Fetch the blog posts
    const blogPostsData = this.transData(data, "blog");

    blogPostsData.slice(0, 3).forEach((blogPost, i) => {
        const post = createBlogPost(blogPost, i);
        blogPostsDiv.innerHTML += post;
    });

    function createBlogPost(post, i) {
        const { Title, Thumbnail, "Created At": Created, id } = post;
        return `
                <!-- News Block -->
				<div class="news-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay="${i + (i * 300)}ms" data-wow-duration="1500ms">
					<div class="inner-box hvr-bob">
						<div class="image">
							<a href="blog?id=${id}"><img src="${Thumbnail || "https://ik.imagekit.io/blitz/website/blog/default.png"}" alt="" /></a>
						</div>
						<div class="lower-content">
							<div class="post-date">${new Date(Created).toLocaleDateString()}</div>
							<h3><a href="blog?id=${id}">${Title}</a></h3>
						</div>
					</div>
				</div>
                `
    };

})