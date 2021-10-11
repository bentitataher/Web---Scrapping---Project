const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless : true})
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto('https://www.wiki.tn/c/pc-portable-120.html?id_category=120&n=60');
    const ordinateurs = await page.evaluate(() => {
        let ordinateurs = [];
        let elements = document.querySelectorAll('#product_list > div');
        for (element of elements){
            ordinateurs.push({
                constructeur : element.querySelector('img.img_manuf')?.alt,
                produit : element.querySelector('a.product-name')?.textContent,
                prix : element.querySelector('span.price')?.textContent,
                dispo : element.querySelector('span.available-now')?.textContent
            })
        }
        return ordinateurs;
    })
    console.log(ordinateurs);
    await browser.close();
})();