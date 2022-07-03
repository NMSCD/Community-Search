import { Box, Center, createDisclosure, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Heading, Image } from '@hope-ui/solid';
import type { Component } from 'solid-js';
import { HamburgerIcon } from '../icon/hamburgerIcon';
import { BasicLink } from './link';
import { site } from '../../constants/site';

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
                    <Image boxSize="75px" padding="0.5em" src="/assets/img/logo.png" />
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
                        <br />
                        <p>-&nbsp;<BasicLink href={site.nmscd.website} title={site.nmscd.nickName}>{`${site.nmscd.nickName} homepage`}</BasicLink></p>
                        <p>-&nbsp;<BasicLink href={site.nmscd.projectsPage} title={`${site.nmscd.nickName} projects`}>{`Other ${site.nmscd.nickName} projects`}</BasicLink></p>
                        <p>-&nbsp;<BasicLink href={site.nmscd.github} title={`${site.nmscd.nickName} Github Org`}>{`${site.nmscd.nickName} Github Organisation`}</BasicLink></p>
                        <br />
                    </DrawerBody>
                    <DrawerFooter>
                        <p style="text-align: right">
                            <span>v1.0.2</span><br />
                            Built by <BasicLink href={site.assistantNMS.website} title={site.assistantNMS.nickName}>{site.assistantNMS.nickName}</BasicLink>
                        </p>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Box>
    );
}
