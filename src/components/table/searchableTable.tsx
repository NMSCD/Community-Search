import type { Component } from 'solid-js';

import list from '../../assets/data/communityList.json';
import lookup from '../../assets/data/communityLookup.json';
import { CommunityListItem } from '../../contracts/communityList';
import { SearchTableRow } from './searchableTableRow';

export const SearchTable: Component = () => {
    // const listWithGroups: Array<CommunityListItem> = list.filter(lwg => lwg.group != null);
    // const groups = (listWithGroups ?? []).reduce((groups: any, item) => ({
    //     ...groups,
    //     [item.group!]: [...(groups[item.group!] || []), item]
    // }), {});

    // const communityList: Array<CommunityListItem> = [];
    // const listWithoutGroups: Array<CommunityListItem> = list.filter(lwg => lwg.group == null);
    // for (const listItem of listWithoutGroups) {
    //     communityList.push({ ...listItem });
    // }
    // for (const groupKey of Object.keys(groups)) {
    //     const items: Array<CommunityListItem> = groups[groupKey];
    //     const lookUpItemIndex = lookup.findIndex(l => l.id === groupKey);
    //     const lookUpItem = lookup[lookUpItemIndex];

    //     communityList.push({
    //         id: lookUpItem.id,
    //         name: lookUpItem.name,
    //         icon: lookUpItem.icon,
    //         tags: items.flatMap(i => i.tags),
    //         link: '',
    //         sort: items[0].sort,
    //         children: items,
    //     });
    // }

    const communityList: Array<CommunityListItem> = list;
    const sortedCommunityList = communityList.sort((a, b) => a.sort - b.sort);

    /*
    
    id: string;
    name: string;
    icon: string;
    tags: Array<string>;
    link: string;
    sort: number;
    desc?: string;
    group?: string;
    children?: Array<CommunityListItem>;
     */

    return (
        <div id="main">
            <div class="inner">
                <header>
                    <h1>Find some awesome NMS communities!</h1>
                    <p>There were too many NMS related websites, so we created another NMS related website to link to all of them!</p>
                </header>
                <br />
                <div class="table-wrapper">
                    <table class="alt">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Tags</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sortedCommunityList.map(item => (
                                    <SearchTableRow item={item} />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
