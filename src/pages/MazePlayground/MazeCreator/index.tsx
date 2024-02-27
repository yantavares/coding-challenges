import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Maze from "../../../components/Maze";
import AlgSelector from "./AlgSelector";
import {
  ButtonContainer,
  DonwloadUploadContainer,
  MazeCreatorContainer,
  SaveButton,
  StyledDiv,
  StyledInput,
  StyledLabel,
  UploadInput,
} from "./styles";

const MazeCreator = () => {
  const [boardState, setBoardState] = useState<string[][]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [algorithm, setAlgorithm] = useState("DFS");

  const [size, setSize] = useState(16);

  const handleSize = (e: any) => {
    setSize(parseInt(e.target.value, 10));
  };

  const input = document.getElementById("quantity") as HTMLInputElement;

  input?.addEventListener("input", function () {
    if (Number(this.value) < 4) {
      this.value = "4";
    }
    if (Number(this.value) > 30) {
      this.value = "30";
    }
  });

  const exportBoard = () => {
    const boardStr = JSON.stringify(boardState);
    const blob = new Blob([boardStr], { type: "text/plain" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "board.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const importBoard = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const text = e.target.result;
        try {
          const newBoard = JSON.parse(text);
          setBoardState(newBoard);
        } catch (error) {
          console.error("Error parsing the file", error);
        }
      };

      reader.readAsText(file);
    } else {
      console.log("No file selected");
    }
  };

  return (
    <MazeCreatorContainer>
      <Maze
        board={boardState}
        setBoard={setBoardState}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        algorithm={algorithm}
        size={size}
      />
      <StyledDiv>
        <StyledLabel htmlFor="quantity">Size:</StyledLabel>
        <StyledInput
          type="number"
          id="quantity"
          name="quantity"
          min="4"
          max="30"
          value={size}
          onChange={handleSize}
          disabled={isRunning}
        />
      </StyledDiv>
      <ButtonContainer>
        <AlgSelector
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          isRunning={isRunning}
        />
        <p>Save / Import board</p>
        <DonwloadUploadContainer>
          <SaveButton onClick={exportBoard} disabled={isRunning}>
            <FontAwesomeIcon icon={faSave} />
            Save Board
          </SaveButton>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UploadInput
              type="file"
              onChange={importBoard}
              disabled={isRunning}
              style={{ cursor: isRunning ? "not-allowed" : "pointer" }}
            />
          </div>
        </DonwloadUploadContainer>
      </ButtonContainer>
    </MazeCreatorContainer>
  );
};
export default MazeCreator;
