import styled from "styled-components";

export const EmptySquare = styled.button`
  margin: 0;
  cursor: pointer;
  height: 1.8rem;
  width: 1.8rem;
  background-color: whitesmoke;
  border-radius: 0;
  border: 1px solid lightgray;
`;

export const VisitedSquare = styled.button`
  margin: 0;
  cursor: pointer;
  height: 1.8rem;
  width: 1.8rem;
  background-color: red;
  border-radius: 0;
  border: 1px solid lightgray;
`;

export const BlockedSquare = styled.button`
  margin: 0;
  cursor: pointer;
  height: 1.8rem;
  width: 1.8rem;
  background-color: green;
  border-radius: 0;
  border: 1px solid lightgray;
`;

export const HomeSquare = styled.button`
  margin: 0;
  cursor: not-allowed;
  height: 1.8rem;
  width: 1.8rem;
  background-color: whitesmoke;
  border-radius: 0;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GoalSquare = styled.button`
  margin: 0;
  cursor: not-allowed;
  height: 1.8rem;
  width: 1.8rem;
  background-color: whitesmoke;
  border-radius: 0;
  border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MazeButton = styled.button`
  width: 10rem;
  justify-self: center;
  align-self: center;
  border: 2px solid green;
`;

export const BackButton = styled.button`
  width: fit-content;
  justify-self: center;
  align-self: center;
  border: 2px solid gray;
`;

export const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

export const EndText = styled.p`
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  margin: 0;
  padding: 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
