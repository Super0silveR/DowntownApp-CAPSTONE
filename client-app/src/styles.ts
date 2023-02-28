declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string;
        },
        font: {
            title: string;
        }
    }

    // allow configuration using `createTheme`
    interface ThemeOptions {
        status?: {
            danger?: string;
        },
        font?: {
            title?: string;
        }
    }
}

export { };