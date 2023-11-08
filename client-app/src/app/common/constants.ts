/** 
 * Value Object for the Color Code, we'll just have to push the `key` value
 * when updating the profile.
 */
export const COLOR_CODE = {
    red: {
        text: 'RED',
        value: 'Taken but still fun.',
        code: '#red'
    },
    green: {
        text: 'GREEN',
        value: 'Single ready to mingle.',
        code: '#green'
    },
    yellow: {
        text: 'YELLOW',
        value: 'Here to party and meet new people.',
        code: '#yellow'
    },
    blue: {
        text: 'BLUE',
        value: 'Looking for couple friends.',
        code: '#blue'
    },
    gray: {
        text: 'GRAY',
        value: 'Still figuring it out.',
        code: '#gray'
    }
} as const;

export const ColorCodeEnum = [
    {
        text: 'Red',
        value: '1',
        description: 'Taken but still fun.',
        code: '#C60C30'
    },
    {
        text: 'Green',
        value: '2',
        description: 'Single ready to mingle.',
        code: '#00693E'
    },
    {
        text: 'Yellow',
        value: '3',
        description: 'Here to party and meet new people.',
        code: '#FFC72C'
    },
    {
        text: 'Blue',
        value: '4',
        description: 'Looking for couple friends.',
        code: '#005A9C'
    },
    {
        text: 'Gray',
        value: '5',
        description: 'Still figuring it out.',
        code: '#6f6f6f'
    }
];

export const GetColor = (value: string) => {
    return ColorCodeEnum.find(x => x.value === value);
}

export type ValueOf<T> = T[keyof T];