interface Controls {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  keyDownHandler(e: KeyboardEvent): void;
}

class Controls {
  constructor(type: string) {
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;

    switch (type) {
      case "PLAYER":
        this.#addKeyboardListeners();
        break;

      case "NPC":
        this.up = true;
        break;

      default:
        break;
    }
  }

  // private method
  #addKeyboardListeners() {
    document.onkeydown = (e) => {
      switch (e.key) {
        case "ArrowLeft":
        case "a":
          this.left = true;
          break;
        case "ArrowRight":
        case "d":
          this.right = true;
          break;
        case "ArrowUp":
        case "w":
          this.up = true;
          break;
        case "ArrowDown":
        case "s":
          this.down = true;
          break;
      }
    };

    document.onkeyup = (e) => {
      switch (e.key) {
        case "ArrowLeft":
        case "a":
          this.left = false;
          break;
        case "ArrowRight":
        case "d":
          this.right = false;
          break;
        case "ArrowUp":
        case "w":
          this.up = false;
          break;
        case "ArrowDown":
        case "s":
          this.down = false;
          break;
      }
    };
  }
}

export default Controls;
