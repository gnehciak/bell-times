const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  const query = "Cabramatta High School logo";
  await page.goto(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`, { waitUntil: 'networkidle2' });
  
  await page.screenshot({ path: 'google_images.png' });
  
  await browser.close();
})();
