const fs = require('fs');
const util = require('util');
const Airtable = require('airtable');
const axios = require('axios');

require('dotenv').config();

const tables = {
    Main: {
        name: 'Main',
        view: 'VisibleCommunities',
        json: 'communityList.json',
        records: [
            {
                source: 'Name',
                target: 'name',
            },
            {
                source: 'Icon',
                target: 'icon',
                mapping: (v) => v?.[0]?.url ?? '',
            },
            {
                source: 'Banners',
                target: 'banners',
                mapping: (v) => v?.flatMap(inner => (inner?.url ?? '').split(',')).filter(item => item?.length > 0),
            },
            {
                source: 'Description',
                target: 'desc',
            },
            {
                source: 'Grouping',
                target: 'group',
                mapping: (v) => v?.[0],
            },
            {
                source: 'Tags',
                target: 'tags',
            },
            {
                source: 'Links',
                target: 'links',
                mapping: (v) => v.split(',').filter(item => item?.length > 0),
            },
            {
                source: 'CustomId',
                target: 'customId',
            },
            {
                source: 'Sort',
                target: 'sort',
            }
        ]
    },
    // Group: {
    //     name: 'Group',
    //     view: 'AvailableGroups',
    //     json: 'communityLookup.json',
    //     records: [
    //         {
    //             source: 'Name',
    //             target: 'name',
    //         },
    //         {
    //             source: 'Icon',
    //             target: 'icon',
    //             mapping: (v) => v?.[0]?.url ?? '',
    //         },
    //     ],
    // },
};

async function generateJsonFromAirtable() {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appW3eQpG1MlolQ25');

    const tableKeys = Object.keys(tables);
    for (let tableIndex = 0; tableIndex < tableKeys.length; tableIndex++) {
        const tableKey = tableKeys[tableIndex];
        const currentTable = tables[tableKey];

        const allItems = [];
        base(currentTable.name).select({
            view: currentTable.view
        }).eachPage(async function page(records, fetchNextPage) {

            for (const record of records) {
                let obj = {
                    id: record.id,
                };
                for (const rec of currentTable?.records ?? []) {
                    let value;
                    if (rec.mapping != null) {
                        value = rec.mapping(record.get(rec.source));
                    } else {
                        value = record.get(rec.source);
                    }
                    try {
                        obj[rec.target] = value;
                    } catch (ex) {
                        console.log(ex);
                    }
                }

                const newObj = await downloadImagesFromAirtableObject(obj);
                allItems.push(newObj);
            }

            fetchNextPage();
        }, function done(err) {
            if (err) {
                console.error({ err });
                return;
            }

            console.log('write file ' + allItems.length);
            fs.writeFile(`../src/assets/data/${currentTable.json}`, JSON.stringify(allItems), ['utf8'], () => { });
        });
    }
}

async function downloadImagesFromAirtableObject(obj) {
    const baseRelToRootPath = '/assets/img/generated/{0}.png';
    const physicalPath = '../public{1}';

    const rowId = obj.customId ?? obj.id;

    try {
        const relToRootPath = baseRelToRootPath.replace('{0}', rowId);

        await downloadImage(obj.icon, physicalPath.replace('{1}', relToRootPath));
        obj.icon = relToRootPath;

        const newBanners = [];
        for (let bannerIndex = 0; bannerIndex < obj.banners.length; bannerIndex++) {
            const banner = obj.banners[bannerIndex];
            const bannerRelToRootPath = baseRelToRootPath.replace('{0}', `${rowId}-banner${bannerIndex + 1}`);

            await downloadImage(banner, physicalPath.replace('{1}', bannerRelToRootPath));
            newBanners.push(bannerRelToRootPath);
        }
        obj.banners = newBanners;

    } catch (e) {

    }

    return obj;
}


async function downloadImage(url, image_path) {
    const writer = fs.createWriteStream(image_path)

    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });

    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
    })
};

generateJsonFromAirtable();
