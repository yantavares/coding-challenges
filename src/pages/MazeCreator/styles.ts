import styled from "styled-components";

export const MazeCreatorContainer = styled.div`
  display: flex;
  height: 100%;
  place-items: center;
  gap: 2rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 15rem;
  flex-direction: column;
  gap: 0.4rem;
`;

export const ButtonInfoContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  font-size: 0.8rem;
  width: 100%;
`;

export const InfoLink = styled.a`
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.2rem;
  transition: 0.3s ease-in-out;

  &:hover {
    color: blue;
  }
`;

export const StyledDiv = styled.div`
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const StyledLabel = styled.label`
  margin-bottom: 10px;
  font-size: 1rem;
  font-weight: bold;
`;

export const StyledInput = styled.input`
  width: 90%;
  box-shadow: unset;
  font-size: 1rem;
  &:focus {
    border-color: blue;
    outline: none;
  }
`;

export const DonwloadUploadContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const UploadInput = styled.input`
  width: 100%;
  padding: 9px; /* Padding for a better button-like appearance */
  background-color: #505050; /* A typical button color, but you can choose any */
  color: white; /* Text color */
  border: none; /* Removes the default border */
  border-radius: 5px; /* Rounded corners for a modern look */
  cursor: pointer; /* Changes the cursor to indicate it's clickable */
  text-align: center;
  font-size: 13px; /* Adjust font size as needed */
  transition: background-color 0.3s ease; /* Smooth transition for hover effect */

  &:hover {
    background-color: #606060; /* Darker shade on hover */
  }

  &:focus {
    outline: none; /* Removes the default focus outline */
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5); /* Adds a subtle focus effect */
  }

  /* Hide the default file input text */
  &::-webkit-file-upload-button {
    visibility: hidden;
  }
  &::before {
    content: "Upload"; /* Custom text */
    display: inline-block;
    background-color: #505050;
    color: white;
    border-radius: 5px;
    outline: none;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    text-align: center;
    font-size: 1rem;
  }

  &:hover::before {
    background-color: #606060;
  }
`;

export const SaveButton = styled.button`
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  display: flex;
  width: 100%;
  font-size: 0.8rem;
`;
