import styled from "styled-components";

export const ChallengeContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.18);
  border-radius: 0.5rem;
  margin-top: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  width: 40%;
  min-width: 16rem;
  max-width: 20rem;
  height: 28rem;
  transition: all 100ms ease-in-out;
  opacity: 0.9;

  :hover {
    opacity: 0.72;
  }
`;

export const ChallengeImage = styled.img`
  width: 100%;
  height: 15rem;
  object-fit: cover;
  border-radius: 0.5rem;
`;
