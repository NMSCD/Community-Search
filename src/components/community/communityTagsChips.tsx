import { SelectTagCloseButton } from '@hope-ui/solid';
import { Component, For, Show } from 'solid-js';

interface IProps {
    tags: Array<string>;
    removeTag?: (tag: string) => void;
}

export const CommunityTagsChips: Component<IProps> = (props: IProps) => {

    return (
        <div class="community-tags">
            <For each={props.tags}>
                {tag => (
                    <span class={'chip ' + tag}>
                        {tag}
                        <Show when={props.removeTag != null}>
                            <SelectTagCloseButton onClick={() => props.removeTag?.(tag)} />
                        </Show>
                    </span>
                )}
            </For>
        </div>
    );
};