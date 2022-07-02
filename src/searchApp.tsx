import { Box } from '@hope-ui/solid';
import type { Component } from 'solid-js';
import { Header } from './components/common/header';
import { CommunityItems } from './components/communityItems';

export const SearchApp: Component = () => {
  return (
    <Box id="wrapper">
      <Header />

      <CommunityItems />

      {/* <Footer /> */}
    </Box>
  );
};
