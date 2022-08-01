import { Box, Button, Center, Flex, Image, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Text, notificationService } from '@hope-ui/solid';
import { Component, For, Match, Show, Switch } from 'solid-js';
import { CommunityListItem } from '../../contracts/communityList';
import { BasicLink } from '../common/link';
import { CommunityBannerSlider } from './communityBannerSlider';
import { CommunityTagsChips } from './communityTagsChips';


interface IProps {
    item: CommunityListItem;
    onClose: () => void;
}

export const CommunityCardModal: Component<IProps> = (props: IProps) => {

    const renderSingleLink = (link: string) => {
        let localLink = link;
        let cleanLink = 'Unsupported link';
        let linkComment = '';

        const markdownLinkRegex = new RegExp(/^\[(.+)\]\((.+)\)/);
        const markdownRegexArr = markdownLinkRegex.exec(link);
        if ((markdownRegexArr?.length ?? 0) > 2) {
            linkComment = `(${markdownRegexArr![1]})`;
            localLink = markdownRegexArr![2]
        }

        const linkRegex = new RegExp('^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)');
        const preCleanLink = localLink
            .replaceAll('https://', '')
            .replaceAll('http://', '')
            .replaceAll('www.', '')
            .replaceAll('/index.html', '')
            .replaceAll('.html', '');
        const regexArr = linkRegex.exec(preCleanLink);
        cleanLink = ((regexArr?.length ?? 0) > 0) ? regexArr![0] : 'test:' + preCleanLink;

        return (
            <li style={{ maxWidth: '100%' }}>
                <BasicLink href={localLink} title={props.item.name} additionalClassNames="max-lines-1">
                    <span>{cleanLink}</span>
                    {
                        (linkComment.length > 0) &&
                        <span class="comment">{linkComment}</span>
                    }
                </BasicLink>
            </li>
        );
    }

    const getShareableLink = () => {
        const fileName = (props.item.customId != null && props.item.customId.length > 0)
            ? props.item.customId
            : props.item.id;

        const shareableUrl = `https://community.nmscd.com/link/${fileName}.html`;

        navigator?.clipboard?.writeText?.(shareableUrl)?.then?.(() => {
            notificationService.show({
                status: 'info',
                title: 'Link copied',
                description: shareableUrl,
                duration: 5000,
            });
        });
    }

    const numBanners = props.item.banners?.length ?? 0;
    return (
        <ModalContent>
            <ModalCloseButton />
            <ModalHeader className="noselect">
                <Flex>
                    <Image src={props.item.icon} alt={props.item.name + ' banner'} borderRadius="3px" height="25px" width="25px" mr="10px" />
                    <Center flex="1">
                        <Text textAlign="left" width="100%">{props.item.name}</Text>
                    </Center>
                </Flex>
            </ModalHeader>
            <ModalBody>
                <Box className="banner noselect">
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
                    <Box className="actions">
                        <Center>
                            <Image src="/assets/img/share.svg" alt="share" onClick={getShareableLink} />
                        </Center>
                    </Box>
                </Box>
                <Show when={props.item.desc != null}>
                    <Box pt="0.5em">
                        <small class="noselect">Description:</small>
                        <p>{props.item.desc}</p>
                    </Box>
                </Show>
                <Show when={(props.item.links?.length ?? 0) > 0}>
                    <Box pt="1em">
                        <small class="noselect">Links:</small>
                        <Box pl="1.5em">
                            <ul>
                                <For each={props.item.links}>
                                    {renderSingleLink}
                                </For>
                            </ul>
                        </Box>
                    </Box>
                </Show>
                <Box pt="1em">
                    <small class="noselect">Tags:</small>
                    <CommunityTagsChips tags={props.item.tags} />
                </Box>
            </ModalBody>
            <ModalFooter>
                <Button onClick={props.onClose}>Close</Button>
            </ModalFooter>
        </ModalContent>
    );
}
