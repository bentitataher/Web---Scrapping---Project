const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless : true})
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto('https://spacenet.tn/categorie/18-vente-ordinateur-portable-tunisie');
    const ordinateurs = await page.evaluate(() => {
        let ordinateurs = [];
        let elements = document.querySelectorAll('#box-product-list > div');
        for (element of elements){
            ordinateurs.push({
                // constructeur : element.querySelector('span.price span')?.alt,
                produit : element.querySelector('div.product_name a')?.textContent,
                prix : element.querySelector('div.product-price-and-shipping>span.price')?.textContent,
                // dispo : element.querySelector('')?.textContent
            })
        }
        return ordinateurs;
    })
    console.log(ordinateurs);
    await browser.close();
})();