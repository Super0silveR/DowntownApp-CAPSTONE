import { createTheme } from "@mui/material/styles";

import red from "@mui/material/colors/red";
import orange from "@mui/material/colors/orange";
//import yellow from "@mui/material/colors/yellow";
import green from "@mui/material/colors/green";
import lightBlue from "@mui/material/colors/lightBlue";
import grey from "@mui/material/colors/grey";
import { deepPurple } from "@mui/material/colors";

const theme = createTheme({
    components: {
        /** 
         * Error with this one when creating/managing Event, but not in Login. 
         * Login contains Adnornments, but not create event. [???]
         * */
        // MuiInputAdornment: {
        //     styleOverrides: {
        //         root: ({ownerState, theme}) => ({
        //             ...(ownerState && {
        //                 color: theme.palette.text.disabled
        //             })
        //         })
        //     }
        // },
        MuiAvatar: {
            styleOverrides: {
                root: ({ownerState, theme}) => ({
                    ...(ownerState['aria-label'] === 'attendees' && {
                        backgroundColor: theme.palette.primary.light,
                        margin:-2
                    }),
                    ...(ownerState['aria-label'] === 'account-avatar' && {
                        margin:-2
                    })
                })
            }
        },
        MuiButton: {
            styleOverrides: {
                root: ({ownerState}) => ({
                    color: theme.palette.common.white,
                    marginRight: '10px',
                    '&:hover': {
                        color: theme.palette.primary.dark,
                        backgroundColor: theme.palette.action.hover
                    },
                    ...(ownerState.color === 'warning' && {
                        color: '#fff'
                     })
                })
            }
        },
        MuiBadge: {
            styleOverrides: {
                badge:  ({theme}) => ({
                    backgroundColor: theme.palette.primary.light,
                    color: "white"
                })
            }
        },
        MuiFab: {
            styleOverrides: {
                root: ({theme}) => ({
                    color: theme.palette.common.white,
                    backgroundColor: theme.palette.primary.main,
                    '&:hover': {
                        color: theme.palette.primary.dark,
                        backgroundColor: theme.palette.primary.light
                    }
                })
            }

        },
        MuiIconButton: {
            styleOverrides: {
                root: ({ownerState, theme}) => ({
                    ...((ownerState['aria-details'] === 'socials' ||
                         ownerState['aria-details'] === 'profile-photos' ||
                         ownerState['aria-details'] === 'base') && {
                        color: theme.palette.common.white,
                        '&:hover': {
                            color: theme.palette.primary.main,
                            backgroundColor: theme.palette.action.hover
                        }
                    }),
                    ...((ownerState['aria-details'] === 'event-actions') && {
                        color: theme.palette.primary.main,
                        '&:hover': {
                            color: theme.palette.primary.dark,
                            backgroundColor: theme.palette.action.hover
                        }
                    })
                })
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: ({ownerState, theme}) => ({
                    ...((ownerState['aria-details'] === 'account-menu-icon') && {
                        color: theme.palette.primary.main,
                        '&:hover': {
                            color: theme.palette.primary.dark,
                            backgroundColor: theme.palette.action.hover
                        }
                    })
                })
                
            }
        },
        MuiToggleButton: {
            styleOverrides: {
                root: ({ownerState, theme}) => ({
                    ...((ownerState['aria-details'] === 'editor-tiptap') && {
                        color: theme.palette.primary.dark,
                        outlineWidth: '2px',
                        '&:hover': {
                            color: theme.palette.primary.main,
                            backgroundColor: theme.palette.action.hover
                        }
                    })
                })
            }
        },
        MuiFilledInput: {
            styleOverrides: {
                root: ({theme}) => ({
                    backgroundColor: theme.palette.primary.light + '18'
                })
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                        fontSize: '1rem'
                }
            }
        },
        MuiStepLabel: {
            styleOverrides: {
                label: {
                    fontSize: 18
                }
            }
        }
    },
    typography: {
        fontFamily: 'Roboto'
    },
    palette: {
        mode: 'light',
        primary: {
            light: '#757ce8',
            main: '#291752',
            dark: '#002884',
        },
        secondary: {
            light: grey[400],
            main: red[700],
            dark: red[900],
            contrastText: grey[50]
        },
        error: {
            light: red[400],
            main: red[700],
            dark: red[300],
            contrastText: grey[800]
        },
        success: {
            main: green[500]
        },
        warning: {
            main: orange[600],
            contrastText: grey[900]
        },
        info: {
            main: lightBlue[500]
        },
        text: {
            primary: grey[900],
            secondary: grey[700],
            disabled: grey[500]
        },
        action: {
            active: red[200],
            disabled: grey[700],
            disabledBackground: grey[300],
            hover: deepPurple[100],
            hoverOpacity: 0.7,
            focus: red[600],
            focusOpacity: 0.92,
            selected: red[300],
            selectedOpacity: 0.08
        },
        background: {
            paper: grey[200],
            
        },
        common: {
            black: grey[900],
            white: grey[200],
        },
        tonalOffset: 0.1,
    }
});

export default theme;