this.body.addEventListener("pageLoaded", async (data) => {
    const faqDiv = document.getElementById("faq-container");

    const faqData = this.transData(data, "faq");

    const converter = new showdown.Converter();

    faqDiv.innerHTML = faqData.slice(0, 4).map((faq) => {
        return `
    <div class="question-block col-lg-6 col-md-12 col-sm-12">
	<div class="inner-box">
    <div class="icon-box">
    <span class="icon flaticon-question"></span>
    </div>
    <h3>${faq.fields.title}</h3>
    <div class="text">${converter.makeHtml(faq.fields.content)}</div>
    </div>
    </div>
    `
    }).join("\n");

});