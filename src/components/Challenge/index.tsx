import React from "react";
import { ChallengeContainer, ChallengeImage, ChallengeTitle } from "./styles";
import { useNavigate } from "react-router-dom";

const Challenge = ({ name, info, img, url }) => {
  const navigate = useNavigate();
  return (
    <ChallengeContainer onClick={() => (url ? navigate(url) : {})}>
      <ChallengeTitle>{name}</ChallengeTitle>
      {img && <ChallengeImage src={img} alt={name} />}
      <p>{info}</p>
    </ChallengeContainer>
  );
};
export default Challenge;
