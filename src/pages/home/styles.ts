import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

export const WholePage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4rem;
`;

export const ChallengesContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  width: 80%;
`;

export const MainHeader = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 1.2rem;
  color: transparent;
  background-image: linear-gradient(90deg, aliceblue, lightblue);
  background-clip: text;
  -webkit-background-clip: text;
`;

export const Language = styled.i`
  font-size: 2.4rem;
  color: transparent;
  background-image: linear-gradient(90deg, #007acc, #00bacc);
  background-clip: text;
  -webkit-background-clip: text;
`;
