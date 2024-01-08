"use client";

import { Noto_Sans } from 'next/font/google'
import React from 'react';
import { CssBaseline } from '@mui/material';
import { blue, grey } from "@mui/material/colors";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const notoSans = Noto_Sans({ weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], subsets: ['latin'], preload: false })

const innerTheme = createTheme({
  typography: {
    fontFamily: notoSans.style.fontFamily,
    h5: {
      fontWeight: 500,
      fontSize: 22,
      lineHeight: '28px'
    }
  },
  palette: {
    primary: {
      main: blue[500],
    },
    error: {
      main: '#F03D3D'
    }
  },
  breakpoints: {
    values: {
      xl: 1440,
      lg: 1140,
      md: 900,
      sm: 600,
      xs: 0
    }
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: grey[400],
          '& svg': {
            fontSize: 21.34
          }
        }
      }
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          width: 'fit-content',
          '& .MuiFormControlLabel-label': {
            fontSize: 14,
            lineHeight: '20px'
          },
          '& .MuiButtonBase-root': {
            padding: '4px'
          }
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            borderRadius: '10px',
            backgroundColor: '#ffffff'
          },

          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: '4px',
            height: '4px'
          },

          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: '5px',
            backgroundColor: grey[300]
          }
        }
      }
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        separator: {
          '& svg': {
            height: 16,
            width: 16
          }
        },
        li: {
          '& p': {
            color: grey[700],
            lineHeight: '20px'
          },
          '&:last-of-type': {
            '& p': {
              color: grey[400]
            }
          }
        }
      }
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          margin: 0
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiPagination: {
      styleOverrides: {
        ul: {
          '& > li': {
            '&:not(:first-child):not(:last-child)': {
              '& > button': {
                borderRadius: 0
              }
            },
            '&:first-child': {
              '& > button': {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0
              }
            },
            '&:last-child': {
              '& > button': {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0
              }
            }
          }
        }
      }
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          backgroundColor: grey[100],
          lineHeight: '40px',
          fontSize: 14,
          fontWeight: 500,
          color: '#000000'
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: ({ theme }) => [
          theme.unstable_sx({
            backgroundColor: grey[100],
            '& th': {
              px: 1,
              py: 1.25,
              fontWeight: 500,
              color: theme.palette.text.primary,
              lineHeight: '20px',
              borderBottom: 0,
              letterSpacing: '0.1px'
            }
          })
        ]
      }
    },
    MuiTabs: {
      styleOverrides: {
        root: ({ theme }) => [
          theme.unstable_sx({
            minHeight: 40,
            background: grey[100],
            '& .MuiTabs-scroller': {
              padding: theme.spacing(0.5, 0.75),
            },
            '& .MuiTabs-indicator': {
              display: 'none'
            },
            overflow: 'auto'
          })
        ]
      }
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => [
          theme.unstable_sx({
            textTransform: 'none',
            padding: theme.spacing(1, 2),
            lineHeight: 1.71429,
            minHeight: 40,
            color: grey[500],
            fontWeight: 700,
            '&.Mui-selected': {
              backgroundColor: theme.palette.common.white,
              color: theme.palette.primary.main,
              borderRadius: theme.shape.borderRadius * 0.375,
              borderBottom: 'none',
              boxShadow: theme.shadows[1]
            }
          })
        ]
      }
    }
  },
});

const AppThemeProvider = (props: { children: React.ReactNode }) => {
  return <ThemeProvider theme={innerTheme}>
    <>
      <CssBaseline />
      {props.children}
    </>
  </ThemeProvider>;
}
export default AppThemeProvider
