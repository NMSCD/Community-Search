const fs = require('fs');
const util = require('util');
const Airtable = require('airtable');

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
                source: 'Link',
                target: 'link',
                mapping: (v) => v.split(',').filter(item => item?.length > 0),
            },
            {
                source: 'Sort',
                target: 'sort',
            }
        ]
    },
    Group: {
        name: 'Group',
        view: 'AvailableGroups',
        json: 'communityLookup.json',
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
        ],
    },
};

async function generateFullJson() {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appW3eQpG1MlolQ25');

    const tableKeys = Object.keys(tables);
    for (let tableIndex = 0; tableIndex < tableKeys.length; tableIndex++) {
        const tableKey = tableKeys[tableIndex];
        const currentTable = tables[tableKey];

        const allItems = [];
        base(currentTable.name).select({
            view: currentTable.view
        }).eachPage(function page(records, fetchNextPage) {

            records.forEach(function (record) {
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
                allItems.push(obj);
            });
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


generateFullJson();
