/* @refresh reload */
import { render } from 'solid-js/web';
import { SearchApp } from './searchApp';

import './scss/main.scss';
import './scss/custom.scss';

render(() => <SearchApp />,
    document.getElementById('community-search') as HTMLElement
);
