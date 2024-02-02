import React from "react";
import { FooterTextContainer, StyledFooter } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <StyledFooter>
      <FooterTextContainer>
        <p style={{ color: "gray" }}>(v0.9)</p>
        <p>Made with</p>
        <FontAwesomeIcon icon={faHeart} />
        <p>by</p>
        <a
          href="https://github.com/yantavares/maze-visualization-playground"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "beige", fontWeight: 500 }}
        >
          yantavares
        </a>
        <p>on GitHub</p>
      </FooterTextContainer>
    </StyledFooter>
  );
};
export default Footer;
