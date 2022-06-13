import { Box, Center, createDisclosure, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Heading, Image } from '@hope-ui/solid';
import type { Component } from 'solid-js';
import { HamburgerIcon } from '../icon/hamburgerIcon';

export const Header: Component = () => {
    const { isOpen, onOpen, onClose } = createDisclosure();

    return (
        <Box
            pb="5px"
            class="header"
            backgroundColor="rgba(255,255,255,0.1)"
            borderBottomLeftRadius="15px"
            borderBottomRightRadius="15px"
        >
            <Flex>
                <Center pl="1em">
                    <Image boxSize="75px" padding="0.5em" src="/assets/img/rocket.png" />
                </Center>
                <Box pl="1em" flex="1">
                    <Center height="100%">
                        <Heading level={1} size="3xl">NMS Community Search</Heading>
                    </Center>
                </Box>
                <Center mr="2em">
                    <HamburgerIcon fontSize="2.5em" class="pointer" onClick={onOpen} />
                </Center>
            </Flex>

            <Drawer
                opened={isOpen()}
                placement="right"
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>

                    <DrawerBody>

                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
}
