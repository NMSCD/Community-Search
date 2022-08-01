const fs = require('fs');
const util = require('util');
const Handlebars = require('handlebars');

const pjson = require('../../package.json');

const dateHelper = require('../handlebar/helpers/date.helper.js');
const loudHelper = require('../handlebar/helpers/loud.helper.js');
const urlrefHelper = require('../handlebar/helpers/urlref.helper.js');
const versionHelper = require('../handlebar/helpers/version.helper.js');

const readFile = util.promisify(fs.readFile);

function getLink(links) {
    let localLink = links?.[0];

    const markdownLinkRegex = new RegExp(/^\[(.+)\]\((.+)\)/);
    const markdownRegexArr = markdownLinkRegex.exec(localLink);
    if ((markdownRegexArr?.length ?? 0) > 2) {
        localLink = markdownRegexArr[2];
    }

    return localLink ?? '/';
}

async function generateItemPage() {
    process.env['NODE_ENV'] = pjson.version;
    Handlebars.registerHelper('date', dateHelper);
    Handlebars.registerHelper('loud', loudHelper);
    Handlebars.registerHelper('urlref', urlrefHelper);
    Handlebars.registerHelper('version', versionHelper);

    const projectDataString = await readFile('./data/project.json', 'utf8');
    const projectData = JSON.parse(projectDataString);

    const allCommListItemsString = await readFile('../src/assets/data/communityList.json', 'utf8');
    const allCommListItems = JSON.parse(allCommListItemsString);

    const template = await readFile('./handlebar/itemDetailPage.hbs', 'utf8');
    const templateFunc = Handlebars.compile(template);

    for (const commListItem of allCommListItems) {
        const templateData = {
            ...projectData,
            data: { ...commListItem },
            link: getLink(commListItem.links),
        };
        const html = templateFunc(templateData);
        const fileName = (commListItem.customId != null && commListItem.customId.length > 0)
            ? commListItem.customId
            : commListItem.id;
        fs.writeFile(`../public/link/${fileName}.html`, html, ['utf8'], () => { });
    }
}

generateItemPage();
