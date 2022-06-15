const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

async function generateFullJson() {
    const siteDataContents = await readFile('./data/site.json', 'utf8');
    const siteData = JSON.parse(siteDataContents);

    const cspContents = await readFile('./data/csp.json', 'utf8');
    const cspContent = JSON.parse(cspContents);
    const headerList = cspContent.options.map(opt =>
        opt.name +
        ((opt.values != null && opt.values.length > 0) ? ' ' : '') +
        opt.values.join(' ')
    );
    const header = headerList.join('; ') + ';';

    const siteDataFull = {
        ...siteData,
        headers: [
            // Enable the line below to get CSP
            // ...cspContent.headers.map(csp => ({ "name": csp, "value": header })),
            ...siteData.headers,
        ]
    };
    
    fs.writeFile(`./data/project.json`, JSON.stringify(siteDataFull), ['utf8'], () => { });
}


generateFullJson();
