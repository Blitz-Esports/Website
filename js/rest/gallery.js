this.body.addEventListener("pageLoaded", async () => {

    // Get the gallery div
    const galleryDiv = document.getElementById('gallery-container');

    // Fetch the blog posts
    const galleryData = await this.graphql(
        `
        query MyQuery {
            gallery {
              creationDate
              image
              id
            }
          }          
        `
    );

    galleryData.forEach((galleryImage, index) => {
        const post = createGalleryH(galleryImage, index);
        galleryDiv.innerHTML += post;
    });

    function createGalleryH(gData, i) {
        const { id, image } = gData;
        const { url } = image[0];
        const resize = false;
        const fUrl = resize ? `https://imageproxy.blitzesports.org/-/rs:fit:370:368/plain/${url}` : url;
        // if (i % 4 === 0) i = 0
        return `
        <!--Gallery Item-->
        <div class="gallery-item col-lg-4 col-md-6 col-sm-12 wow fadeInLeft" data-wow-delay="${i + (i * 300)}ms">
            <div class="inner-box">
                <figure class="image-box">
                    <img src="${fUrl}" alt="${id}">
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