import {createGlobalStyle, keyframes} from "styled-components";

import {COLORS} from "./colors";

export const placeholderShimmer = keyframes`
    0% {
        background-position: -320px 0;
    }
    100% {
        background-position: 320px 0;
    }
`;

export const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
    }
    *, *:before, *:after {
        box-sizing: border-box;
    }

    * {
        padding: 0;
        margin: 0;
    }

    body {
        background: #F1F3F6;
        font-family: Montserrat, Rubik, Roboto, sans-serif !important;
        font-size: 16px;
        font-weight: 400;
        line-height: 1.4;
        color: ${COLORS.primaryTextColor};
        overflow: hidden !important;
        -webkit-font-smoothing: antialiased;
    }

    .shimming {
        animation-duration: 1.5s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: ${placeholderShimmer};
        animation-timing-function: linear;
        background: linear-gradient(to right, ${COLORS.gallery} 2%, ${COLORS.alto} 18%, ${COLORS.gallery} 22%);
        background-size: 1500px 104px;
    }

    a {
        text-decoration: none;
        color: ${COLORS.anchorColor};

        :hover {
            opacity: 0.6;
        }
    }

    .primaryBorderOnHover {
        border: 1px solid #D6D8D9;
    }

    .ellipsis {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .shown {
        height: auto;
    }
    
    .link {
       color: inherit;
    }

    div[class|=styles__HeaderContainer] {
       overflow-x: auto;
    }
`;
