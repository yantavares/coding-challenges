import React from "react";
import { ChallengeContainer, ChallengeImage } from "./styles";
import { useNavigate } from "react-router-dom";

const Challenge = ({ name, info, img, url }) => {
  const navigate = useNavigate();
  return (
    <ChallengeContainer onClick={() => navigate(url)}>
      <h2>{name}</h2>
      <ChallengeImage src={img} alt="name" />
      <p>{info}</p>
    </ChallengeContainer>
  );
};
export default Challenge;
