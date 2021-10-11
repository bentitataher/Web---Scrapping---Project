const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless : true})
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto('https://www.pointm.tn/79-parfum-homme#');
    const ordinateurs = await page.evaluate(() => {
        let ordinateurs = [];
        let elements = document.querySelectorAll('ul#product_list>li.ajax_block_product');
        for (element of elements){
            ordinateurs.push({
                Marque : element.querySelector('span.product-manufacturer-name').textContent,
                produit : element.querySelector('a.product-name').textContent,
                desc : element.querySelector('div.product-category').textContent,
                prix : element.querySelector('span.price').textContent,
            })
        }
        return ordinateurs;
    })
    console.log(ordinateurs);
    await browser.close();
})();