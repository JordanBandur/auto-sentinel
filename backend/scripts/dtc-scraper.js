const axios = require('axios');
const fs = require('fs');
const cliProgress = require('cli-progress');
const sanitizeHtml = require('sanitize-html');
const { decode } = require('html-entities');

const base_url = "https://www.obd-codes.com/";

// Helper function to generate valid DTC code URLs
const generateDTCUrls = () => {
  const dtcUrls = [];
  const ranges = [
    'P0000 through P0099',
    // Uncomment additional ranges as needed
    // 'P0100 through P0199',
    // 'P0200 through P0299',
    // 'P0300 through P0399',
    // 'P0400 through P0499',
    // 'P0500 through P0599',
    // 'P0600 through P0699',
    // 'P0700 through P0799',
    // 'P0800 through P0899',
    // 'P0900 through P0999',
    // 'P0A00 through P0A99',
    // 'P0B00 through P0B99',
    // 'P0C00 through P0C99',
    // 'P2000 through P2099',
    // 'P2100 through P2199',
    // 'P2200 through P2299',
    // 'P2300 through P2399',
    // 'P2400 through P2499',
    // 'P2500 through P2599',
    // 'P2600 through P2699',
    // 'P2700 through P2799',
    // 'P2800 through P2899',
    // 'P2900 through P2999',
    // 'P3000 through P3499',
  ];

  for (const range of ranges) {
    const [start, end] = range.match(/P\w+/g);
    const startNum = parseInt(start.slice(1), 16);
    const endNum = parseInt(end.slice(1), 16);
    for (let i = startNum; i <= endNum; i++) {
      const code = `P${i.toString(16).toUpperCase().padStart(4, '0')}`;
      dtcUrls.push(`${base_url}${code}`);
    }
  }
  return dtcUrls;
};

const dtc_urls = generateDTCUrls();

const checkPageExists = async (url) => {
  try {
    const response = await axios.head(url);
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

const sanitizeAndDecode = (input) => {
  const sanitized = sanitizeHtml(input, { allowedTags: [], allowedAttributes: {} });
  return decode(sanitized.replace(/\\/g, '')).replace(/\n/g, ' ');
};

const scrapeDTCInfo = async (url) => {
  try {
    const response = await axios.get(url);
    let html = response.data;

    // Replace double quotes with single quotes in the h1 content
    html = html.replace(/<h1>(.*?)<\/h1>/, (match, p1) => {
      return `<h1>${p1.replace(/"/g, "'")}</h1>`;
    });

    const dtcInfo = {};
    const regexCode = /<h1>(.*?)<\/h1>/;
    const regexDescription = /<h2>What does that mean\?<\/h2>\s*<p>(.*?)<\/p>/;
    const regexSymptoms = /<h2>(Symptoms|Potential Symptoms)<\/h2>\s*(<ul>(.*?)<\/ul>|<p>(.*?)<\/p>|(.*?)(?=<h2>|\z))/s;
    const regexCauses = /<h2>.*(Causes).*<\/h2>\s*(<ul>(.*?)<\/ul>|<p>(.*?)<\/p>|(.*?)<\/td>)/s;
    const regexDiagnostic = /<h2>.*?(Diagnostic|Repair Procedures|Possible Solutions).*?<\/h2>\s*(<ul>(.*?)<\/ul>|<p>(.*?)<\/p>|(.*?)<\/td>)/s;

    dtcInfo.code = html.match(regexCode) ? sanitizeAndDecode(html.match(regexCode)[1]) : '';
    dtcInfo.description = html.match(regexDescription) ? sanitizeAndDecode(html.match(regexDescription)[1]) : '';
    dtcInfo.symptoms = html.match(regexSymptoms) ? sanitizeAndDecode(html.match(regexSymptoms)[3] || html.match(regexSymptoms)[4] || html.match(regexSymptoms)[5]).replace(/, /g, ', ') : '';
    dtcInfo.causes = html.match(regexCauses) ? sanitizeAndDecode(html.match(regexCauses)[3] || html.match(regexCauses)[4] || html.match(regexCauses)[5]).replace(/, /g, ', ') : '';
    dtcInfo.diagnostic = html.match(regexDiagnostic) ? sanitizeAndDecode(html.match(regexDiagnostic)[3] || html.match(regexDiagnostic)[4] || html.match(regexDiagnostic)[5]).replace(/, /g, ', ') : '';


    return dtcInfo;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error.message);
    return null;
  }
};

const scrapeAndSaveDTCs = async () => {
  console.log('Starting the DTC scraping process...');

  const dtcData = [];
  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  progressBar.start(dtc_urls.length, 0);

  const batchSize = 10;
  for (let i = 0; i < dtc_urls.length; i += batchSize) {
    const batchPromises = dtc_urls.slice(i, i + batchSize).map(async url => {
      if (await checkPageExists(url)) {
        return scrapeDTCInfo(url);
      } else {
        return null;
      }
    });

    const results = await Promise.all(batchPromises);

    results.forEach(result => {
      if (result && result.code) {
        dtcData.push(result);
      }
    });

    progressBar.update(i + batchSize);
  }

  progressBar.stop();
  console.log('DTC scraping process completed successfully.');

  // Save data to a file
  const dtcDataString = JSON.stringify(dtcData, null, 2).replace(/\\"/g, "'");
  fs.writeFileSync('dtcData.json', dtcDataString);
  console.log('DTC data saved to dtcData.json');
};

scrapeAndSaveDTCs();
