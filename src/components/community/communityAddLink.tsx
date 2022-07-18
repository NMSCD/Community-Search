import { Component } from 'solid-js';
import { submitCommunitySearchItem } from '../../constants/airTable';
import { BasicLink } from '../common/link';

interface IProps {
}

export const CommunityAddLink: Component<IProps> = (props: IProps) => {

    return (
        <BasicLink id="container-floating" href={submitCommunitySearchItem} additionalClassNames="noselect">
            <div id="floating-button">
                <p class="plus">+</p>
            </div>
        </BasicLink>
    );
};