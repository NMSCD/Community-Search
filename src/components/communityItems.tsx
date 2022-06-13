import type { Component } from 'solid-js';

import list from '../assets/data/communityList.json';
import { CommunityListItem } from '../contracts/communityList';
import { CommunityCard } from './community/communityCard';

export const CommunityItems: Component = () => {
    const communityList: Array<CommunityListItem> = list;
    const sortedCommunityList = communityList.sort((a, b) => a.sort - b.sort);

    return (
        <div id="main">
            <div class="inner">
                <header>
                    <h1>Find some awesome NMS communities!</h1>
                    <p>There were too many NMS related websites, so we created another NMS related website to link to all of them!</p>
                </header>
                <br />
                <div class="row gtr-uniform">
                    <div class="col-7 col-12-xsmall" style="padding-left: 1em">
                        <input type="text" placeholder="Search" />
                    </div>
                    <div class="col-5 col-12-xsmall">
                        <select name="demo-category" id="demo-category">
                            <option value="">- Category -</option>
                            <option value="1">Manufacturing</option>
                            <option value="1">Shipping</option>
                            <option value="1">Administration</option>
                            <option value="1">Human Resources</option>
                        </select>
                    </div>
                </div>
                <br />
                <div class="row community-cards">
                    {
                        sortedCommunityList.map(item => (
                            <CommunityCard item={item} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
