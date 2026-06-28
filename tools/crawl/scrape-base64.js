const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const query = "Cabramatta High School logo crest";
  await page.goto(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`, { waitUntil: 'networkidle2' });
  
  const imgSrc = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      for (const img of imgs) {
          if (img.src && img.src.startsWith('data:image/jpeg;base64,')) {
              return img.src;
          }
          if (img.src && img.src.startsWith('data:image/png;base64,')) {
              return img.src;
          }
      }
      return null;
  });
  
  if (imgSrc) {
      const base64Data = imgSrc.replace(/^data:image\/\w+;base64,/, "");
      fs.writeFileSync('logos/cabramatta.png', base64Data, 'base64');
      console.log('Saved logos/cabramatta.png');
  } else {
      console.log('No base64 image found');
  }
  
  await browser.close();
})();
