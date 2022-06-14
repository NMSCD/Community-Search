import { Box, Center } from '@hope-ui/solid';
import classNames from 'classnames';
import { Component, For, Show } from 'solid-js';
import { getTagColour } from '../../constants/airTable';
import { CommunityListItem } from '../../contracts/communityList';

interface IProps {
    item: CommunityListItem;
    openModal: () => void;
}

export const CommunityCard: Component<IProps> = (props: IProps) => {

    return (
        <Box class="community-card-bg" onClick={() => props.openModal()}>
            <Box class={classNames('community-card', { 'pointer': props.item.link?.length > 0 })}>
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
                    props.item.desc && (
                        <Center class="community-desc-center">
                            <div class="community-desc">
                                {props.item.desc}
                            </div>
                        </Center>
                    )
                }
                <div class="community-tags">
                    <For each={props.item.tags}>
                        {tag => (
                            <span class="chip" style={{ "background-color": getTagColour(tag) }}>{tag}</span>
                        )}
                    </For>
                </div>
                {/* <Show when={(props.item.link?.length ?? 0) > 0}>
                    <div class="community-link">
                        <BasicLink href={props.item.link[0]}>⬈</BasicLink>
                    </div>
                </Show> */}
            </Box>
        </Box>
    );
}
