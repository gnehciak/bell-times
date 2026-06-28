const fs = require('fs');
const https = require('https');
const path = require('path');

// Mock window to load school data
global.window = {};

// Read data (data.js holds all schools)
const dataJs = fs.readFileSync('./data.js', 'utf8');

// Evaluate it
eval(dataJs);

const schools = window.SCHOOLS;
console.log(`Found ${schools.length} schools.`);

const logosDir = path.join(__dirname, 'logos');
if (!fs.existsSync(logosDir)) {
    fs.mkdirSync(logosDir);
}

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode !== 200) {
                fs.unlink(dest, () => {});
                return reject(new Error(`Status code: ${res.statusCode}`));
            }
            res.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
}

async function main() {
    let downloaded = 0;
    let missing = 0;
    
    for (const school of schools) {
        console.log(`Processing: ${school.name}...`);
        
        let urlDomain = '';
        if (school.source) {
            const urlObj = new URL(school.source);
            urlDomain = urlObj.hostname;
        } else {
            // For verified schools in data.js, guess the domain or search Wikipedia (skip or guess)
            urlDomain = `${school.id.replace('-','')}.schools.nsw.gov.au`;
        }
        
        const logoUrl = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${urlDomain}&size=256`;
        const dest = path.join(logosDir, `${school.id}.png`);
        
        if (fs.existsSync(dest)) {
            console.log(`  -> Already have logo for ${school.name}`);
            continue;
        }
        
        try {
            await downloadImage(logoUrl, dest);
            console.log(`  -> Downloaded favicon to ${dest}`);
            downloaded++;
        } catch (e) {
            console.log(`  -> Failed to download: ${e.message}`);
            missing++;
        }
        
        // short delay to be nice
        await new Promise(r => setTimeout(r, 100));
    }
    
    console.log(`Done! Downloaded ${downloaded} logos. Missing ${missing}.`);
}

main();
