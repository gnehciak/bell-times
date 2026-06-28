const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto(`https://www.google.com/search?tbm=isch&q=Cabramatta+High+School+logo+crest`, { waitUntil: 'networkidle2' });
  const srcs = await page.evaluate(() => Array.from(document.querySelectorAll('img')).map(i => i.src));
  console.log(srcs.slice(0, 10));
  await browser.close();
})();
