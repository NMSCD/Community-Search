import { HopeProvider, HopeThemeConfig } from '@hope-ui/solid';
import { Component, createEffect, onMount } from 'solid-js';
import { setChakraToDarkMode } from './helper/documentHelper';

interface IProps {
  children: any;
}

export const CustomThemeProvider: Component<IProps> = (props: IProps) => {

  // onMount(() => {
  //   setChakraToDarkMode();
  // });

  const config: HopeThemeConfig = {
    initialColorMode: 'dark',
    darkTheme: {
      colors: {
        primary5: '#00ffff',
        neutral7: '#00ffff',
        neutral9: '#9ba1a6',
      }
    }
  }

  return (
    <HopeProvider config={config}>
      {props.children}
    </HopeProvider>
  );
}

