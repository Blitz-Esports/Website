this.body.addEventListener("pageLoaded", async (data) => {

    // Get the gallery div
    const galleryDiv = document.getElementById('gallery-container');

    // Fetch the blog posts
    const galleryData = this.transData(data, "gallery");

    galleryData.forEach((galleryImage, index) => {
        const post = createGalleryH(galleryImage, index);
        galleryDiv.innerHTML += post;
    });

    function createGalleryH(gData, i) {
        const { name, url } = gData;
        const fUrl = `${url}`
        // if (i % 4 === 0) i = 0
        return `
        <!--Gallery Item-->
        <div class="gallery-item col-lg-4 col-md-6 col-sm-12 wow fadeInLeft" data-wow-delay="${i + (i * 300)}ms">
            <div class="inner-box">
                <figure class="image-box">
                    <img src="${fUrl}" alt="${name}">
                    <!--Overlay Box-->
                    <div class="overlay-box">
                        <div class="overlay-inner">
                            <div class="content">
                                <a href="${fUrl}" class="link"><span class="icon flaticon-unlink"></span></a>
                                <a href="${fUrl}" data-fancybox="gallery-2" data-caption="" class="link"><span class="icon flaticon-add"></span></a>
                            </div>
                        </div>
                    </div>
                </figure>
            </div>
        </div>
                `
    };

})