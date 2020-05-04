const puppeteer = require('puppeteer');

async function doScroll(filename) {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    await page.goto('https://www.benline.co.uk');
    // await page.setViewport({
    //     width: 500,
    //     height: 2000
    // });

    await autoScroll(page);

    await page.screenshot({
        path: `${filename}.png`,
        fullPage: true
    });

    await browser.close();
}

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}


module.exports = {
    doScroll
}