export const submitCommunitySearchItem = 'https://airtable.com/shrhZOQrrp9a9zoJk';
export const submitCommunitySearchItemEmbed = 'https://airtable.com/embed/shrhZOQrrp9a9zoJk?backgroundColor=cyan';

const tagColours = {
    'Reddit': '#ffdaf6',
    'Discord': '#EDE2FE',
    'Amino': '#C2F5E9',
    'Civilization': '#FFEAB6',
    'Wiki': '#EEEEEE',
    'Youtube': '#FEE2D5',
    'Website': '#CFDFFF',
    'App': '#D1F7C4',
    'Facebook': '#EDE2FE',
    'Company': '#FFEAB6',
    'Forum': '#FFDCE5',
    'Game': '#D0F0FD',
}

export const getTagColour = (key: string) => {
    const defined = (tagColours as any)[key];
    if (defined == null) return '#e5e5e5';
    return defined;
}