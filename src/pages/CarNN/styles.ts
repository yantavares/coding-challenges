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
  width: 15rem;
`;

export const InfoDisplayContentRed = styled.p`
  color: #ff0000;
  padding: 0;
  margin: 0;
  font-weight: bold;
  font-size: 1.5rem;
`;

export const InfoDisplayContentYellow = styled.p`
  color: #ffff00;
  padding: 0;
  margin: 0;
  font-weight: bold;
  font-size: 1.5rem;
`;

export const NewBestText = styled.p`
  color: #00ff00;
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  padding: 0;
  margin-left: 0.5rem;
`;
