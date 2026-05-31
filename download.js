const fs = require('fs');
const https = require('https');

const fetchSjcetImage = async () => {
    try {
        const response = await fetch('https://en.wikipedia.org/w/api.php?action=query&titles=St._Joseph%27s_College_of_Engineering_and_Technology,_Palai&prop=pageimages&pithumbsize=1000&format=json');
        const data = await response.json();

        const pages = data.query.pages;
        let imageUrl = '';
        for (let page in pages) {
            if (pages[page].thumbnail) {
                imageUrl = pages[page].thumbnail.source;
            }
        }

        if (imageUrl) {
            console.log('Downloading from: ' + imageUrl);
            const options = { headers: { 'User-Agent': 'BusPassApp/1.0 (user@example.com)' } };
            https.get(imageUrl, options, (res) => {
                const file = fs.createWriteStream('frontend/public/bg.jpg');
                res.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log('Download completed');
                });
            });
        } else {
            console.log('Thumbnail not found via API, trying direct wikimedia link');
            const directUrl = 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Sjcet.jpg';
            const options = { headers: { 'User-Agent': 'BusPassApp/1.0 (user@example.com)' } };
            https.get(directUrl, options, (res) => {
                if (res.statusCode === 200) {
                    const file = fs.createWriteStream('frontend/public/bg.jpg');
                    res.pipe(file);
                    file.on('finish', () => { file.close(); console.log('Direct download completed'); });
                } else {
                    console.log('Direct link failed with status:', res.statusCode);
                }
            });
        }
    } catch (e) {
        console.error(e);
    }
}

fetchSjcetImage();
