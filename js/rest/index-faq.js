this.body.addEventListener("pageLoaded", async () => {

    const faqDiv = document.getElementById("faq-container");

    const faqData = await this.graphql(`
    query MyQuery {
        faQs {
          author
          id
          content
          title
        }
      }    
    `);

    const converter = new showdown.Converter();

    faqDiv.innerHTML = faqData.slice(0 , 4).map((faq) => {
        return `
    <div class="question-block col-lg-6 col-md-12 col-sm-12">
	<div class="inner-box">
    <div class="icon-box">
    <span class="icon flaticon-question"></span>
    </div>
    <h3>${faq.title}</h3>
    <div class="text">${converter.makeHtml(faq.content)}</div>
    </div>
    </div>
    `
    }).join("\n");

});