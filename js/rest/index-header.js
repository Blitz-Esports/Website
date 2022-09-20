this.body.addEventListener("pageLoaded", async (iData) => {

	const headerDiv = document.getElementById("header-container");
	const bannerCarousel = document.getElementsByClassName("banner-carousel");

	const headerData = this.transData(iData, "header");

	const data = headerData.map((hData, i) => {
		const { fields } = hData;
		const { URL: url, Title: title, "Button Text": buttonText, Thumbnail: thumbnail } = fields;

		return `
               <div class="slide-item">
					<div class="image-layer" id="header-thumbnail-1"
						style="background-image:url(${thumbnail})">
					</div>

					<div class="auto-container">
						<div class="content-box">
							${title ? `<h2 id="header-title-1">${title}</h2>` : ""}
							${buttonText ? `
							<div class="btn-box"><a id="header-button-url-1"
									href="${url}" target="_blank"
									class="theme-btn btn-style-one"><span class="btn-title"
										id="header-button-text-1">${buttonText}</span></a>
							</div>
							` : ""}
						</div>
					</div>
				</div>
        `
	});

	headerDiv.innerHTML = data.join("\n");


	$(".banner-carousel").owlCarousel({
		video: true,
		loop: true,
		margin: 0,
		nav: true,
		smartSpeed: 500,
		autoplay: 6000,
		navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 1
			},
			800: {
				items: 1
			},
			1024: {
				items: 1
			}
		}
	});

});