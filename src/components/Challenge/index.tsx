import React from "react";
import { ChallengeContainer, ChallengeImage, ChallengeTitle } from "./styles";
import { useNavigate } from "react-router-dom";

const Challenge = ({ name, info, img, url }) => {
  const navigate = useNavigate();
  return (
    <ChallengeContainer onClick={() => navigate(url)}>
      <ChallengeTitle>{name}</ChallengeTitle>
      <ChallengeImage src={img} alt={name} />
      <p>{info}</p>
    </ChallengeContainer>
  );
};
export default Challenge;
