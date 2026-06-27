const fs = require('fs');
const https = require('https');
const path = require('path');
const cheerio = require('/tmp/node_modules/cheerio');

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

function fetchHtml(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'SchoolTimetableBot/1.0 (contact: test@example.com)' } }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                const redirectUrl = url.startsWith('https://en.wikipedia.org') && res.headers.location.startsWith('/')
                    ? `https://en.wikipedia.org${res.headers.location}`
                    : res.headers.location;
                return resolve(fetchHtml(redirectUrl));
            }
            if (res.statusCode !== 200) {
                return reject(new Error(`Status code: ${res.statusCode}`));
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

const { exec } = require('child_process');

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        // use standard curl without spoofing User-Agent
        exec(`curl -s -L -o "${dest}" "${url}"`, (error, stdout, stderr) => {
            if (error) {
                fs.unlink(dest, () => {});
                return reject(error);
            }
            // check if file is an HTML error page using 'file' command
            const { execSync } = require('child_process');
            try {
                const fileType = execSync(`file "${dest}"`).toString();
                if (fileType.includes('HTML document') || fileType.includes('empty')) {
                    fs.unlink(dest, () => {});
                    return reject(new Error('File is an HTML error page or empty'));
                }
            } catch (e) {
                // ignore
            }
            resolve();
        });
    });
}

async function getWikipediaLogo(schoolName) {
    const searchName = schoolName.replace(/ /g, '_');
    const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(searchName)}`;
    
    try {
        const html = await fetchHtml(url);
        const $ = cheerio.load(html);
        
        let imgUrl = null;
        // Search in infobox
        $('.infobox img, .infobox-image img').each((i, el) => {
            const src = $(el).attr('src');
            if (src && !src.toLowerCase().includes('wikipedia-logo') && !src.toLowerCase().includes('ambox') && !src.toLowerCase().includes('question_book') && !src.toLowerCase().includes('maps.wikimedia.org')) {
                imgUrl = src;
                return false; // break loop
            }
        });
        
        if (imgUrl) {
            if (imgUrl.includes('/thumb/')) {
                // convert //upload.wikimedia.org/wikipedia/en/thumb/9/9f/Baulkham_Hills_High_School_logo.png/250px-Baulkham_Hills_High_School_logo.png
                // to //upload.wikimedia.org/wikipedia/en/9/9f/Baulkham_Hills_High_School_logo.png
                imgUrl = imgUrl.replace('/thumb/', '/');
                imgUrl = imgUrl.substring(0, imgUrl.lastIndexOf('/'));
            }
            if (imgUrl.startsWith('//')) {
                imgUrl = 'https:' + imgUrl;
            } else if (imgUrl.startsWith('/')) {
                imgUrl = 'https://en.wikipedia.org' + imgUrl;
            }
            return imgUrl;
        }
    } catch (e) {
        // console.error(`Error fetching Wikipedia for ${schoolName}: ${e.message}`);
    }
    return null;
}

async function main() {
    let downloaded = 0;
    let missing = 0;
    
    for (const school of schools) {
        console.log(`Processing: ${school.name}...`);
        
        // Check if already downloaded
        const existing = fs.readdirSync(logosDir).find(f => f.startsWith(`${school.id}.`));
        if (existing) {
            console.log(`  -> Already have logo for ${school.name} (${existing})`);
            continue;
        }
        
        // try to find logo
        const logoUrl = await getWikipediaLogo(school.name);
        if (logoUrl) {
            const ext = logoUrl.split('.').pop().split('?')[0].toLowerCase();
            const safeExt = ['png', 'jpg', 'jpeg', 'svg'].includes(ext) ? ext : 'png';
            const dest = path.join(logosDir, `${school.id}.${safeExt}`);
            
            try {
                await downloadImage(logoUrl, dest);
                console.log(`  -> Downloaded ${logoUrl} to ${dest}`);
                downloaded++;
            } catch (e) {
                console.log(`  -> Failed to download ${logoUrl}: ${e.message}`);
                missing++;
            }
        } else {
            console.log(`  -> No logo found for ${school.name}`);
            missing++;
        }
        
        // delay to be nice
        await new Promise(r => setTimeout(r, 2000));
    }
    
    console.log(`Done! Downloaded ${downloaded} logos. Missing ${missing}.`);
}

main();
