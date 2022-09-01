import { createTheme, Theme } from '@mui/material/styles'

const fontHeading = '"Playfair Display", Didot, Georgia, "Times New Roman", Times, serif'
const fontBody = 'Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif'
const universal = {
    palette: {
        contrastThreshold: 2,
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 543,
            md: 768,
            lg: 1180,
            xl: 1920,
        },
    },
    typography: {
        fontSize: 14,
        h1: {
            fontFamily: fontHeading,
            fontSize: '2.45rem',
        },
        h2: {
            fontFamily: fontHeading,
            fontSize: '2.115rem',
        },
        h3: {
            fontFamily: fontHeading,
            fontSize: '1.95rem',
        },
        h4: {
            fontFamily: fontHeading,
            fontSize: '1.75rem',
        },
        h5: {
            fontFamily: fontHeading,
            fontSize: '1.615rem',
        },
        h6: {
            fontFamily: fontHeading,
            fontSize: '1.25rem',
        },
        subtitle1: {
            fontFamily: fontHeading,
            fontSize: '1.25rem',
        },
        subtitle2: {
            fontFamily: fontHeading,
            fontSize: '1rem',
        },
        fontFamily: fontBody,
        body1: {
            fontFamily: fontBody,
            fontSize: '1.0125rem',
            letterSpacing: '0.0195em',
        },
        body2: {
            fontFamily: fontBody,
            fontSize: '0.95rem',
            letterSpacing: '0.021em',
        },
    },
    /*shape: {
        borderRadius: 0,
    },*/
}

export const customTheme = (primary: string): {
    dark: Theme
    light: Theme
} => {
    const themeDark = createTheme({
        ...universal,
        palette: {
            ...universal.palette,
            mode: 'dark',
            primary: {
                //light: '#43c0d5',
                main: primary,
                //dark: '#033944',
            },
            secondary: {
                light: '#adf3e8',
                main: '#4ee3d7',
                dark: '#266e62',
            },
            background: {
                paper: '#13181c',
                default: '#010203',
            },
            text: {
                primary: '#c6c4c4',
                secondary: '#acc9c5',
            },
            info: {
                main: '#1872b9',
            },
            error: {
                main: '#9d190f',
                //main: '#b71c10',
            },
            warning: {
                main: '#d54600',
            },
            action: {
                hoverOpacity: 0.2,
            },
        },
        components: {
            MuiPaper: {
                styleOverrides: {root: {backgroundImage: 'unset'}},
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        //variant: '#6431f7',
                        '&$focused': {
                            color: '#7649f6',
                        },
                        '&$error': {
                            color: '#b71c10',
                        },
                    },
                },
            },
        },
    })

    const themeLight = createTheme({
        ...universal,
        palette: {
            ...universal.palette,
            mode: 'light',
            primary: {
                main: primary,
                //dark: '#033944',
            },
            secondary: {
                light: '#adf3e8',
                main: '#4cecd6',
                dark: '#266e62',
            },
            background: {
                //paper: '#e8e8e8',
                paper: '#f7f7f7',
                //default: '#d2d2d2',
                //default: '#e3e3e3',
                default: '#ececec',
            },
            text: {
                primary: '#001f29',
                secondary: '#001820',
            },
            warning: {
                dark: '#cc4c00',
                main: '#f05a00',
            },
            info: {
                main: '#3593dd',
            },
            action: {
                hoverOpacity: 0.2,
            },
        },
    })

    return {
        dark: themeDark,
        light: themeLight,
    }
}
