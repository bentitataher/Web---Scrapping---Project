const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless : true})
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto('https://www.tunisianet.com.tn/702-ordinateur-portable?page=26');
    const ordinateurs = await page.evaluate(() => {
        let ordinateurs = [];
        let elements = document.querySelectorAll('div.item-product');
        for (element of elements){
            ordinateurs.push({
                constructeur : element.querySelector('img.manufacturer-logo')?.alt,
                produit : element.querySelector('h2.product-title')?.textContent,
                description : element.querySelector('div.listds>a>p')?.textContent,
                prix : element.querySelector('span.price')?.textContent,
                dispo : element.querySelector('span.in-stock')?.textContent,
                dispo : element.querySelector('span.later-stock')?.textContent,
            })
        }
        return ordinateurs;
    })
    console.log(ordinateurs);
    await browser.close();
})();