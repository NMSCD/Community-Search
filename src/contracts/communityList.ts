export interface CommunityListItem {
    id: string;
    name: string;
    icon: string;
    tags: Array<string>;
    link: string;
    sort: number;
    desc?: string;
    group?: string;
    children?: Array<CommunityListItem>;
}