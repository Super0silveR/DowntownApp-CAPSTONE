/** 
 * Value Object for the Color Code, we'll just have to push the `key` value
 * when updating the profile.
 */
export const COLOR_CODE = {
    red: {
        key: 'RED',
        value: 'Taken but still fun.',
        code: '#red'
    },
    green: {
        key: 'GREEN',
        value: 'Single ready to mingle.',
        code: '#green'
    },
    yellow: {
        key: 'YELLOW',
        value: 'Here to party and meet new people.',
        code: '#yellow'
    },
    blue: {
        key: 'BLUE',
        value: 'Looking for couple friends.',
        code: '#blue'
    },
    gray: {
        key: 'GRAY',
        value: 'Still figuring it out.',
        code: '#gray'
    }
} as const;

export type ValueOf<T> = T[keyof T];