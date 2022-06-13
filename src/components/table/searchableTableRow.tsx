import { Component, createSignal } from 'solid-js';
import { getTagColour } from '../../constants/airTable';

import { CommunityListItem } from '../../contracts/communityList';

interface IProps {
    item: CommunityListItem;
}

export const SearchTableRow: Component<IProps> = (props: IProps) => {
    const [isExpanded, setIsExpanded] = createSignal(false);

    const renderDescripOrChildrenCount = (localItem: CommunityListItem) => {
        if (localItem.desc != null) {
            return (
                <div class="community-desc">{localItem.desc}</div>
            );
        }
        if ((localItem.children?.length ?? 0) > 0) {
            return (
                <div class="community-desc">{`${localItem.children?.length} sub items`}</div>
            );
        }
        return (<div class="community-desc"></div>);
    }

    const renderExpandAction = () => {
        if (isExpanded()) {
            return (<span class="pointer" onclick={() => setIsExpanded(false)}>➖</span>);
        }
        return (<span class="pointer" onclick={() => setIsExpanded(true)}>➕</span>);
    }

    return (
        <>
            <tr class="community-row">
                <td>
                    <div class="community-name-img">
                        <img src={props.item.icon} title={props.item.name} class="community-img" />
                        <div class="content"><span>{props.item.name}</span></div>
                    </div>
                </td>
                <td>{renderDescripOrChildrenCount(props.item)}</td>
                <td>
                    <div class="community-tags">
                        {
                            props.item.tags.map(tag => (
                                <span class="chip" style={{ "background-color": getTagColour(tag) }}>{tag}</span>
                            ))
                        }
                    </div>
                </td>
                <td class="community-actions">
                    {
                        (props.item.children ?? []).length > 0
                            ? (renderExpandAction())
                            : <a href={props.item.link} title={props.item.name} target="_blank" rel="noopener noreferrer">🔗</a>
                    }
                </td>
            </tr>
            {
                (props.item.children ?? []).map(child => (
                    <tr class="community-sub-row">
                        <td>
                            <div class="community-name-img">
                                <div class="content"><span>{child.name}</span></div>
                            </div>
                        </td>
                        <td>{renderDescripOrChildrenCount(child)}</td>
                        <td>
                            <div class="community-tags">
                                {
                                    child.tags.map(tag => (
                                        <span class="chip" style={{ "background-color": getTagColour(tag) }}>{tag}</span>
                                    ))
                                }
                            </div>
                        </td>
                        <td class="community-actions">
                            <a href={child.link} title={child.name} target="_blank" rel="noopener noreferrer">🔗</a>
                        </td>
                    </tr>
                ))
            }
        </>
    );
}
