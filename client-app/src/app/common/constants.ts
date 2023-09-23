/** 
 * Value Object for the Color Code, we'll just have to push the `key` value
 * when updating the profile.
 */
export const COLOR_CODE = {
    red: {
        key: 'RED',
        value: 'Taken but still fun.'
    },
    green: {
        key: 'GREEN',
        value: 'Single ready to mingle.'
    },
    yellow: {
        key: 'YELLOW',
        value: 'Here to party and meet new people.'
    },
    blue: {
        key: 'BLUE',
        value: 'Looking for couple friends.'
    },
    gray: {
        key: 'GRAY',
        value: 'Still figuring it out.'
    }
} as const;

export type ValueOf<T> = T[keyof T];