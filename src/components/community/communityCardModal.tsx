import { Box, Button, Center, Flex, Image, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Text } from '@hope-ui/solid';
import { Component, For, Match, Show, Switch } from 'solid-js';
import { Slider, SliderButton, SliderProvider } from "solid-slider";
import { getTagColour } from '../../constants/airTable';
import { CommunityListItem } from '../../contracts/communityList';
import { BasicLink } from '../common/link';
import { CommunityBannerSlider } from './communityBannerSlider';


interface IProps {
    item: CommunityListItem;
    onClose: () => void;
}

export const CommunityCardModal: Component<IProps> = (props: IProps) => {

    const renderSingleLink = (link: string) => {
        const cleanLink = link
            .replaceAll('https://', '')
            .replaceAll('http://', '')
            .replaceAll('www.', '')
            .replaceAll('/index.html', '')
            .replaceAll('.html', '');
        return (
            <li style={{ maxWidth: '100%' }}>
                <BasicLink href={link} title={props.item.name} additionalClassNames="max-lines-1">{cleanLink}</BasicLink>
            </li>
        );
    }

    const numBanners = props.item.banners?.length ?? 0;
    return (
        <ModalContent>
            <ModalCloseButton />
            <ModalHeader>
                <Flex>
                    <Image src={props.item.icon} alt={props.item.name + ' banner'} borderRadius="3px" width="25px" mr="10px" />
                    <Center flex="1">
                        <Text textAlign="left" width="100%">{props.item.name}</Text>
                    </Center>
                </Flex>
            </ModalHeader>
            <ModalBody>
                <Switch>
                    <Match when={numBanners > 0}>
                        <CommunityBannerSlider
                            name={props.item.name}
                            banners={props.item.banners!}
                        />
                    </Match>
                    <Match when={numBanners <= 0}>
                        <Center>
                            <Image src={props.item.icon} alt={props.item.name + ' icon'} maxHeight="100px" />
                        </Center>
                    </Match>
                </Switch>
                <Show when={props.item.desc != null}>
                    <Box pt="1em">
                        <small>Description:</small>
                        <p>{props.item.desc}</p>
                    </Box>
                </Show>
                <Show when={(props.item.link?.length ?? 0) > 0}>
                    <Box pt="1em">
                        <small>Links:</small>
                        <Box pl="1.5em">
                            <ul>
                                <For each={props.item.link}>
                                    {renderSingleLink}
                                </For>
                            </ul>
                        </Box>
                    </Box>
                </Show>
                <Box pt="1em">
                    <small>Tags:</small>
                    <div class="community-tags">
                        <For each={props.item.tags}>
                            {tag => (
                                <span class="chip" style={{ "background-color": getTagColour(tag) }}>{tag}</span>
                            )}
                        </For>
                    </div>
                </Box>
            </ModalBody>
            <ModalFooter>
                <Button onClick={props.onClose}>Close</Button>
            </ModalFooter>
        </ModalContent>
    );
}
