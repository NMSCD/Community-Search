import { Box, Center, Image, Spinner } from '@hope-ui/solid';
import { Component, createSignal, For, onMount, Show } from 'solid-js';
import { createSlider } from 'solid-slider';

interface IProps {
    name: string;
    banners: Array<string>;
}

export const CommunityBannerSlider: Component<IProps> = (props: IProps) => {
    const [isVisible, setIsVisible] = createSignal<boolean>(true);
    const [
        slider,
        {
            current,
            moveTo,
        }
    ] = createSlider(
        { loop: true },
    );

    onMount(() => {
        setTimeout(() => {
            setIsVisible(false);
        }, 1000);
    });

    return (
        <Box class="slider-container">
            <Show when={isVisible()}>
                <Center class="slider-loader">
                    <Spinner size="lg" />
                </Center>
            </Show>
            <div use:slider>
                <For each={props.banners}>
                    {banner => (
                        <Image src={banner} alt={props.name + ' banner'} width="100%" />
                    )}
                </For>
            </div>
            <Show when={(props.banners?.length ?? 0) > 1}>
                <br />
                <div style={{ "text-align": "center" }}>
                    <For each={props.banners}>
                        {(_, index) => (
                            <div class={`slide-index ${index() === current() ? 'is-active' : ''}`} onClick={() => moveTo(index())}>&nbsp;</div>
                        )}
                    </For>
                </div>
            </Show>
        </Box>
    );
};
