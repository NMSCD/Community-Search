const fs = require('fs');
const util = require('util');
const Handlebars = require('handlebars');

const pjson = require('../package.json');

const dateHelper = require('../handlebar/helpers/date.helper.js');
const loudHelper = require('../handlebar/helpers/loud.helper.js');
const urlrefHelper = require('../handlebar/helpers/urlref.helper.js');
const versionHelper = require('../handlebar/helpers/version.helper.js');

const readFile = util.promisify(fs.readFile);

async function generateOtherFiles() {
    process.env['NODE_ENV'] = pjson.version;
    Handlebars.registerHelper('date', dateHelper);
    Handlebars.registerHelper('loud', loudHelper);
    Handlebars.registerHelper('urlref', urlrefHelper);
    Handlebars.registerHelper('version', versionHelper);
    
    const projectDataContents = await readFile('./data/project.json', 'utf8');
    const projectData = JSON.parse(projectDataContents);

    const publicFolder = '../public/';
    const files = [
        { template: './handlebar/index.html.hbs', dest: '../index.html'},
        { template: './handlebar/humans.txt.hbs', dest: publicFolder + 'humans.txt'},
        { template: './handlebar/opensearch.xml.hbs', dest: publicFolder + 'opensearch.xml'},
        { template: './handlebar/manifest.json.hbs', dest: publicFolder + 'manifest.json'},
        { template: './handlebar/site.webmanifest.hbs', dest: publicFolder + 'site.webmanifest'},
        { template: './handlebar/sitemap.xml.hbs', dest: publicFolder + 'sitemap.xml'},
        { template: './handlebar/web.config.hbs', dest: publicFolder + 'web.config'},
    ]

    for (const fileObj of files) {
        const template = await readFile(fileObj.template, 'utf8');
        const templateFunc = Handlebars.compile(template);
        const templateData = {
            ...projectData,
            allItems: []
        };
        const compiledTemplate = templateFunc(templateData);
        fs.writeFile(fileObj.dest, compiledTemplate, ['utf8'], () => { });
    }
}

generateOtherFiles();
