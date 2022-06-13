import { Box, Container, Divider, Flex, Heading, Input, Modal, ModalOverlay, Select, SelectContent, SelectIcon, SelectListbox, SelectOption, SelectOptionIndicator, SelectOptionText, SelectPlaceholder, SelectTrigger, SelectValue, SimpleGrid, Text } from '@hope-ui/solid';
import { Component, createSignal, For } from 'solid-js';
import list from '../assets/data/communityList.json';
import { CommunityListItem } from '../contracts/communityList';
import { CommunityCard } from './community/communityCard';
import { CommunityCardModal } from './community/communityCardModal';


export const CommunityItems: Component = () => {
    const [selectedItem, setSelectedItem] = createSignal<CommunityListItem>();

    const communityList: Array<CommunityListItem> = list;
    const sortedCommunityList = communityList.sort(function (a, b) {
        const textA = a.name.toUpperCase();
        const textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    return (
        <Box id="main" pb="10em">
            <Container pt="10em" pb="5em">
                <div class="background star1"></div>
                <div class="background star2"></div>
                <div class="background star3"></div>
                <Heading size="5xl" pb="0.5em">Find some awesome NMS communities!</Heading>
                <Text size="2xl">There were too many NMS related websites, so we created another NMS related website to link to all of them!</Text>
            </Container>
            <Container pb="7em">
                <Divider color="grey" />
            </Container>
            <Container
                class="community-cards"
                backgroundColor="rgb(65, 65, 65)"
                borderRadius="15px"
                zIndex={1}
            >
                <Flex color="white" mb="1em">
                    <Box flex="7">
                        <Input placeholder="Search" />
                    </Box>
                    <Box ml="10px" />
                    <Box flex="5">
                        <Select>
                            <SelectTrigger>
                                <SelectPlaceholder>Choose a framework</SelectPlaceholder>
                                <SelectValue />
                                <SelectIcon />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectListbox>
                                    <For each={["React", "Angular", "Vue", "Svelte", "Solid"]}>
                                        {item => (
                                            <SelectOption value={item}>
                                                <SelectOptionText>{item}</SelectOptionText>
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
                    <For each={sortedCommunityList}>
                        {item => (
                            <CommunityCard item={item} openModal={() => {
                                console.log('setSelectedItem(item)', item);
                                setSelectedItem(item);
                            }} />
                        )}
                    </For>
                </SimpleGrid>
            </Container>
            <Modal opened={selectedItem() != null} onClose={() => setSelectedItem()}>
                <ModalOverlay />
                <CommunityCardModal item={selectedItem()!} onClose={() => setSelectedItem()} />
            </Modal>
        </Box>
    );
}
