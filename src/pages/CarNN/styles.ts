import styled from "styled-components";

export const CanvasContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100vw;
`;

export const CarCanvas = styled.canvas`
  background-color: gray;
`;

export const NetworkCanvas = styled.canvas`
  background-color: black;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;

export const MainContainer = styled.div`
  display: flex;
  gap: 5rem;
`;

export const InfoDisplay = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;
