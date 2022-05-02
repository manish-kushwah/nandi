import styled from "styled-components";

import { COLORS } from "@theme/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  width: 100%;

  > .content {
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
    display: flex;
  }
`;

export const PlayArea = styled.div`
  height: inherit;
  width: inherit;
  position: relative;
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: scroll;
  height: calc(100vh - 56px);

  @media (max-width: 768px) {
    height: calc(100vh - 210px);
  }
`;
