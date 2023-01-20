this.body.addEventListener("pageLoaded", async (data) => {

    // Get the blog posts div
    const blogPostsDiv = document.getElementById('blog-container');

    // Fetch the blog posts
    const blogPostsData = this.transData(data, "blog/posts");

    blogPostsData.slice(0, 3).forEach((blogPost, i) => {
        const post = createBlogPost(blogPost, i);
        blogPostsDiv.innerHTML += post;
    });

    function createBlogPost(post, i) {
        const { url, feature_image , published_at , title , feature_image_alt} = post;
        return `
                <!-- News Block -->
				<div class="news-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay="${i + (i * 300)}ms" data-wow-duration="1500ms">
					<div class="inner-box hvr-bob">
						<div class="image">
							<a href="${url}" target="_blank" rel="noopener"><img src="${feature_image}" alt="${feature_image_alt}" /></a>
						</div>
						<div class="lower-content">
							<div class="post-date">${new Date(published_at).toLocaleDateString('en-GB')}</div>
							<h3><a href="${url}" target="_blank" rel="noopener">${title}</a></h3>
						</div>
					</div>
				</div>
                `
    };

})