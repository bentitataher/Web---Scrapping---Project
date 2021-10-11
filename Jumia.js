const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless : true})
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto('https://www.jumia.com.tn/pc-portables/');
    const ordinateurs = await page.evaluate(() => {
        let ordinateurs = [];
        let elements = document.querySelectorAll('article.prd');
        for (element of elements){
            ordinateurs.push({
                produit : element.querySelector('h3.name')?.textContent,
                prix : element.querySelector('div.prc')?.textContent
            })
        }
        return ordinateurs;
    })
    console.log(ordinateurs);
    await browser.close();
})();