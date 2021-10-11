const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless : true})
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto('https://www.mytek.tn/informatique/ordinateurs-portables/pc-portable.html?product_list_limit=all');
    const ordinateurs = await page.evaluate(() => {
        let ordinateurs = [];
        let elements = document.querySelectorAll('ol.products>div>table>tbody>tr.item');
        for (element of elements){
            ordinateurs.push({
                produit : element.querySelector('a.product-item-link').textContent,
                // description : element.querySelector('div.description').textContent,
                prix : element.querySelector('span.price').textContent,
                disponibilité : element.querySelector('div.stock span').textContent
                
            })
        }
        return ordinateurs;
    })
    console.log(ordinateurs);
    await browser.close();
})();