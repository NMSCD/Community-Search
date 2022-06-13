import classNames from 'classnames';
import { Component, createSignal } from 'solid-js';
import { getTagColour } from '../../constants/airTable';

import { CommunityListItem } from '../../contracts/communityList';

interface IProps {
    item: CommunityListItem;
}

export const CommunityCard: Component<IProps> = (props: IProps) => {


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
        <div class="col-3 community-card-bg">
            <div class={classNames('community-card', { 'pointer': props.item.link?.length > 0 })}>
                <div class="community-top">
                    <div class="community-icon">
                        <img src={props.item.icon} alt={props.item.name} />
                    </div>
                    <div class="community-title">
                        <div class="community-title-content">
                            {props.item.name}
                        </div>
                    </div>
                </div>
                {
                    props.item.desc &&
                    <div class="community-desc">
                        {props.item.desc}
                    </div>
                }
                <div class="community-tags">
                    {
                        props.item.tags.map(tag => (
                            <span class="chip" style={{ "background-color": getTagColour(tag) }}>{tag}</span>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
