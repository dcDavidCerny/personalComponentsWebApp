import { useEffect, useState } from "react";
import { WindowComponent } from "./Components/WindowComponent";
import styled from "styled-components";
import CalculatorComponent from "./Components/SubComponentsForDifferentWindows/CalculatorComponent/Calculator";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    console.log("isOpen", isOpen);
  }, [isOpen]);

  return (
    <>
      <AppWrapper>
        <div onClick={handleOpen} className="testClickableElementDiv">
          Calculator
        </div>
        <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
          {isOpen && (
            <WindowComponent
              title="Calculator"
              defaultPosition={{ x: 500, y: 100 }}
              defaultSize={{ width: 320, height: 537 }}
              defaultMinSize={{ width: 320, height: 537 }}
              defaultMaxSize={{ width: 320, height: 537 }}
              closable={true}
              resizable={false}
              onClose={handleClose}
              className="calculatorWindow"
            >
              <CalculatorComponent />
            </WindowComponent>
          )}
        </div>
      </AppWrapper>
    </>
  );
}

export default App;

const AppWrapper = styled.div`
  .testClickableElementDiv {
    padding: 0.5rem;
    background-color: #000000;
    border: 1px solid #ccc;
    color: white;
    border-radius: 3px;
    width: 100px;

    .testClickableElementSpan {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;
    }
  }

  .calculatorWindow {
    padding: 0;
    margin: 0;
  }
`;
