/* @refresh reload */
import { render } from 'solid-js/web';
import { SearchApp } from './searchApp';
import { CustomThemeProvider } from './themeProvider';

// import './scss/main.scss';
import './scss/custom.scss';


render(() =>
    <CustomThemeProvider>
        <SearchApp />
    </CustomThemeProvider>,
    document.getElementById('community-search') as HTMLElement
);
