export interface CommunityListItem {
    id: string;
    name: string;
    icon: string;
    banners?: Array<string>;
    tags: Array<string>;
    link: Array<string>;
    sort?: number;
    desc?: string;
    group?: string;
    children?: Array<CommunityListItem>;
}