export interface CommunityListItem {
    id: string;
    name: string;
    icon: string;
    banners?: Array<string>;
    tags: Array<string>;
    links: Array<string>;
    sort?: number;
    desc?: string;
    group?: string;
    customId?: string;
    children?: Array<CommunityListItem>;
}