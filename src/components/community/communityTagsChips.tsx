import { SelectTagCloseButton } from '@hope-ui/solid';
import { Component, For, Show } from 'solid-js';
import chipColours from '../../assets/data/chipColours.json';

interface IProps {
    tags: Array<string>;
    removeTag?: (tag: string) => void;
}

export const CommunityTagsChips: Component<IProps> = (props: IProps) => {
    return (
        <div class="community-tags">
            <For each={props.tags}>
                {tag => (
                    <span class={'chip noselect ' + tag} style={getChipColour(tag)}>
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

export const getChipColour = (tag: string): string => {
    const foundSetting = chipColours.find(chip => chip.name == tag);
    if (foundSetting == null) return '';

    return 'background-color: ' + foundSetting.colour;
}