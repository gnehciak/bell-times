const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const query = "Cabramatta High School logo";
  await page.goto(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`, { waitUntil: 'networkidle2' });
  
  // click the first image
  try {
      await page.evaluate(() => {
          document.querySelector('a[jsname="sTFXNe"]').click();
      });
  } catch(e) {
      // sometimes the selector is different
      try {
          await page.evaluate(() => {
              document.querySelectorAll('img')[1].parentElement.click();
          });
      } catch(e) {}
  }
  
  await new Promise(r => setTimeout(r, 2000));
  
  const imgUrl = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img[src^="http"]'));
      // Find the first image that is not a thumbnail and not an icon
      const largeImgs = imgs.filter(img => {
          const w = img.naturalWidth || img.width;
          const h = img.naturalHeight || img.height;
          return w > 150 && h > 150 && !img.src.includes('encrypted-tbn0.gstatic.com');
      });
      return largeImgs.length > 0 ? largeImgs[0].src : null;
  });
  
  console.log("Found URL:", imgUrl);
  await browser.close();
})();
