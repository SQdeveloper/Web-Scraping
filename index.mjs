import { chromium } from "playwright";

const browser = await chromium.launch(
    {headless: true}
)

const page = await browser.newPage()

await page.goto(
    'https://www.nike.com.pe/productos/calzado/urbano'
)

const products = await page.$$eval(
    '.product',
    (results)=> (
        results.map((el) => {
            const title = el
                .querySelector('.product-title')
                ?.innerText

            if(!title) return null

            const image = el
                .querySelector('.tile-image')
                .getAttribute('src')

            const price = el
                .querySelector('.price .sales .value')
                ?.innerText;
            
            // const link = el
            //     .querySelector('link')
            //     .getAttribute('href')

            return { title, image, price }
        }
    ))
)

console.log(products);
await browser.close();