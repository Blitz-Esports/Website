this.body.addEventListener("pageLoaded", async (data) => {

    // Get the content div
    const contentDiv = document.getElementById('content-container');

    // Fetch content data
    const contentData = this.transData(data, "content");

    contentDiv.innerHTML = contentData.slice(0 , 3).map((data, i) => {
        const { url, thumbnail, title } = data;

        if (i === 0) {
            return `
        <!-- Column -->
						<div class="column col-lg-6 col-md-12 col-sm-12">
							
							<!-- Gallery Block -->
							<div class="gallery-block">
								<div class="inner-box wow fadeInLeft animated" data-wow-delay="0ms" data-wow-duration="1500ms" style="visibility: visible; animation-duration: 1500ms; animation-delay: 0ms; animation-name: fadeInLeft;">
									<div class="image">
										<img src="https://aggregator.blitzesports.org/resize/${thumbnail}%3Ft%3D${Date.now()}?h=570&w=530&crop=true" alt="">
										<div class="overlay-box">
											<div class="overlay-inner">
												<a href="${url}" class="lightbox-image play-box"><span class="flaticon-play-button"><i class="ripple"></i></span></a>
												<div class="content">
													<div class="title">Latest Video</div>
													<h2><a href="${url}" class="lightbox-image">${title}</a></h2>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							
						</div>
        `
        }
        else if(i === 1) {
            
            return `
            <!-- Column -->
						<div class="column col-lg-6 col-md-12 col-sm-12">
							
							<!-- Gallery Block Two -->
							<div class="gallery-block-two">
								<div class="inner-box wow fadeInRight animated" data-wow-delay="0ms" data-wow-duration="1500ms" style="visibility: visible; animation-duration: 1500ms; animation-delay: 0ms; animation-name: fadeInRight;">
									<div class="image hvr-bob">
										<img src="https://aggregator.blitzesports.org/resize/${thumbnail}%3Ft%3D${Date.now()}?h=290&w=570&crop=true" alt="">
										<div class="overlay-box">
											<a href="${url}" class="lightbox-image overlay-link"></a>
											<h3><span class="icon flaticon-play-button"></span>${title}</h3>
										</div>
									</div>
								</div>
							</div>
							
							<!-- Gallery Block Two -->
							<div class="gallery-block-two">
								<div class="inner-box wow fadeInRight animated" data-wow-delay="0ms" data-wow-duration="1500ms" style="visibility: visible; animation-duration: 1500ms; animation-delay: 0ms; animation-name: fadeInRight;">
									<div class="image hvr-bob">
										<img src="https://aggregator.blitzesports.org/resize/${contentData[2]?.thumbnail}%3Ft%3D${Date.now()}?h=290&w=570&crop=true" alt="">
										<div class="overlay-box">
											<a href="${contentData[2]?.url}" class="lightbox-image overlay-link"></a>
											<h3><span class="icon flaticon-play-button"></span>${contentData[2]?.title}</h3>
										</div>
									</div>
								</div>
							</div>
							
						</div>
            `
        }

    }).join("\n");

})
