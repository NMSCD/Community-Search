import { HopeProvider, HopeThemeConfig } from '@hope-ui/solid';
import { Component, createEffect, JSX, onMount } from 'solid-js';
import { themeColours } from './constants/colour';
import { setChakraToDarkMode } from './helper/documentHelper';

interface IProps {
  children: JSX.Element;
}

export const CustomThemeProvider: Component<IProps> = (props: IProps) => {

  // onMount(() => {
  //   setChakraToDarkMode();
  // });

  const config: HopeThemeConfig = {
    initialColorMode: 'dark',
    darkTheme: {
      colors: {
        primary5: themeColours.primary,
        neutral7: themeColours.primary,
        neutral9: themeColours.lightGrey,
      }
    }
  }

  return (
    <HopeProvider config={config}>
      {props.children}
    </HopeProvider>
  );
}

