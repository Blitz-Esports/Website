this.body.addEventListener("pageLoaded", async (data) => {

    const faqDiv = document.getElementById("faq-container");

    const faqData = this.transData(data, "faq");

    const converter = new showdown.Converter();

    const middleIndex = Math.ceil(faqData.length / 2);
    const firstHalf = faqData.slice().splice(0, middleIndex);
    const secondHalf = faqData.slice().splice(-middleIndex);

    faqDiv.innerHTML = `<div class="column col-lg-6 col-md-12 col-sm-12">`
        + firstHalf.map((faq, i) => {
            return `
        <div class="question-block-two">
        <div class="inner-box">
            <div class="icon-box">
                <span class="icon flaticon-question"></span>
            </div>
            <h3>${faq.fields.title}</h3>
            <div class="text">${converter.makeHtml(faq.fields.content)}</div>
        </div>
    </div>
    `
        }).join("\n") + `</div>`

    faqDiv.innerHTML += `<div class="column col-lg-6 col-md-12 col-sm-12">`
        + secondHalf.map((faq, i) => {
            return `
       <div class="question-block-two alternate">
       <div class="inner-box">
           <div class="icon-box">
               <span class="icon flaticon-question"></span>
           </div>
           <h3>${faq.fields.title}</h3>
           <div class="text">${converter.makeHtml(faq.fields.content)}</div>
       </div>
   </div>
   `
        }).join("\n") + `</div>`

});