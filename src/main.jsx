import React from 'react';
import ReactDOM from 'react-dom/client';
import {ChakraProvider, ColorModeScript, extendTheme} from '@chakra-ui/react';
import App from './App.jsx';
import './index.css';

const theme = extendTheme({
    config: {
        initialColorMode: 'dark',
        useSystemColorMode: false,
    },
    colors: {
        yellow: {
            50: '#fffae5',
            100: '#fef0b8',
            200: '#fde68a',
            300: '#facc15',
            400: '#eab308',
            500: '#ca8a04',
            600: '#a16207',
            700: '#854d0e',
            800: '#713f12',
            900: '#3f2206',
        },
        gray: {
            850: '#151d2e',
            900: '#0f172a',
            950: '#090d16',
        }
    },
    styles: {
        global: {
            body: {
                bg: 'gray.900',
                color: 'white',
            },
        },
    },
});

export default theme;

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
        <ChakraProvider theme={theme}>
            <App/>
        </ChakraProvider>
    </React.StrictMode>
);