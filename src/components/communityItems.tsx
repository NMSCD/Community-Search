import { Box, Container, Divider, Flex, Heading, Input, Modal, ModalOverlay, Select, SelectContent, SelectIcon, SelectListbox, SelectOption, SelectOptionIndicator, SelectOptionText, SelectPlaceholder, SelectTagCloseButton, SelectTrigger, SelectValue, SimpleGrid, Text } from '@hope-ui/solid';
import { Component, createMemo, createSignal, For } from 'solid-js';
import communityList from '../assets/data/communityList.json';
import manualList from '../assets/data/communityList.json';
import { getTagColour } from '../constants/airTable';
import { themeColours } from '../constants/colour';
import { CommunityListItem } from '../contracts/communityList';
import { CommunityAddLink } from './community/communityAddLink';
import { CommunityCard } from './community/communityCard';
import { CommunityCardModal } from './community/communityCardModal';
import { CommunityTagsChips } from './community/communityTagsChips';


export const CommunityItems: Component = () => {
    const [searchText, setSearchText] = createSignal<string>();
    const [selectedTags, setSelectedTags] = createSignal<Array<string>>();
    const [selectedItem, setSelectedItem] = createSignal<CommunityListItem>();

    const combinedCommunityList: Array<CommunityListItem> = [
        ...manualList,
        ...communityList
    ];
    const allTags = [...new Set(communityList.flatMap(ci => ci.tags))];
    const sortedCommunityList = combinedCommunityList.sort(function (a, b) {
        const textA = a.name.toUpperCase();
        const textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    const filteredList = createMemo(() => sortedCommunityList.filter(ci => {
        if (searchText() != null) {
            if (ci.name.toUpperCase().includes(searchText()!?.toUpperCase())) return true;
            if ((ci.desc?.length ?? 0) > 0) {
                if (ci.desc!.toUpperCase().includes(searchText()!?.toUpperCase())) return true;
            }
            const matchingLinks = ci.links.filter(link => link.toUpperCase().includes(searchText()!?.toUpperCase()));
            if (matchingLinks.length > 0) return true;
        }

        if (selectedTags() != null && selectedTags()!?.length > 0) {
            const multipleExist = (selectedTags() ?? []).every(value => {
                return ci.tags.includes(value);
            });
            return multipleExist;
        }

        if ((searchText() == null || searchText() == '') && (selectedTags() == null || selectedTags()?.length == 0)) return true;

        return false;
    }), [searchText(), selectedTags()]);

    const removeTag = (tag: string) => {
        setSelectedTags((prev) => {
            const newTags = (prev ?? [])?.filter(item => item != tag);
            return newTags;
        });
    }

    return (
        <Box id="main" pb="10em">
            <Container pt="10em" pb="5em">
                <div class="background-bg"></div>
                <div class="background star1"></div>
                <div class="background star2"></div>
                <div class="background star3"></div>
                <Heading size="5xl" pb="0.5em">Find some awesome NMS communities!</Heading>
                <Text size="2xl">There were too many NMS related websites, so we created another NMS related website to link to all of them!</Text>
            </Container>
            <Container pb="7em">
                <Divider style={{ color: themeColours.primary }} />
            </Container>
            <Container
                class="community-cards"
                borderRadius="15px"
                zIndex={1}
            >
                <Flex color="white" mb="1em">
                    <Box flex="7">
                        <Input placeholder="Search" value={searchText()} onInput={(e: any) => setSearchText(e?.target?.value)} />
                    </Box>
                    <Box ml="10px" />
                    <Box flex="5">
                        <Select multiple={true} value={selectedTags()} onChange={value => setSelectedTags(value)}>
                            <SelectTrigger>
                                <SelectPlaceholder>Tags to show</SelectPlaceholder>
                                <SelectValue>
                                    {tags =>
                                        <CommunityTagsChips tags={tags.selectedOptions.map(so => so.textValue)} removeTag={removeTag} />
                                    }
                                </SelectValue>
                                <SelectIcon />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectListbox>
                                    <For each={allTags}>
                                        {tag => (
                                            <SelectOption class="community-tags" value={tag}>
                                                <SelectOptionText class="chip" style={{ "background-color": getTagColour(tag) }}>{tag}</SelectOptionText>
                                                <SelectOptionIndicator />
                                            </SelectOption>
                                        )}
                                    </For>
                                </SelectListbox>
                            </SelectContent>
                        </Select>
                    </Box>
                </Flex>
                <SimpleGrid columns={5} gap="$3" mb="1em">
                    <For each={filteredList()}>
                        {item => (
                            <CommunityCard item={item} openModal={() => setSelectedItem(item)} />
                        )}
                    </For>
                </SimpleGrid>
            </Container>
            <CommunityAddLink />
            <Modal
                size="xl"
                trapFocus={false}
                opened={selectedItem() != null}
                onClose={() => setSelectedItem()}
            >
                <ModalOverlay />
                <CommunityCardModal item={selectedItem()!} onClose={() => setSelectedItem()} />
            </Modal>
        </Box>
    );
}
