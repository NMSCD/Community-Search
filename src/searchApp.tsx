import type { Component } from 'solid-js';
import { Footer } from './components/common/footer';
import { Header } from './components/common/header';
import { CommunityItems } from './components/communityItems';

export const SearchApp: Component = () => {
  return (
    <div id="wrapper">
      <Header />

      <CommunityItems />

      <Footer />
    </div>
  );
};
