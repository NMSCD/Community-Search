import { Box, Center, Image, Spinner } from '@hope-ui/solid';
import { Component, For } from 'solid-js';
import { createSlider } from 'solid-slider';

interface IProps {
    name: string;
    banners: Array<string>;
}

export const CommunityBannerSlider: Component<IProps> = (props: IProps) => {
    const [
        slider,
        {
            current,
            moveTo,
        }
    ] = createSlider(
        { loop: true },
    );

    return (
        <Box class="slider-container">
            <Center class="slider-loader">
                <Spinner size="lg" />
            </Center>
            <div use:slider>
                <For each={props.banners}>
                    {banner => (
                        <Image src={banner} alt={props.name + ' banner'} width="100%" />
                    )}
                </For>
            </div>
            <br />
            <div style={{ "text-align": "center" }}>
                <For each={props.banners}>
                    {(_, index) => (
                        <div class={`slide-index ${index() === current() ? 'is-active' : ''}`} onClick={() => moveTo(index())}>&nbsp;</div>
                    )}
                </For>
            </div>
        </Box>
    );
};