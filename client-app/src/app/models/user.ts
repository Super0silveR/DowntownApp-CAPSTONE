/** Interface that represents the current session user, once logged-in. */
export interface User {
    userName: string;
    displayName: string;
    token: string;
    photo?: string;
}

/** Interface that represents the `simpler user object` returned by the API. */
export interface UserDto {
    userName?: string; 
    displayName?: string;
    bio?: string;
    photo?: string;
}

/** Interface that represents the `data model` for the login and register forms. */
export interface UserFormValues {
    email: string;
    password: string;
    displayName?: string;
    userName?: string;
}