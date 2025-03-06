import { useEffect, useState } from "react";
import { WindowComponent } from "./Components/WindowComponent";
import styled from "styled-components";
import CalculatorComponent from "./Components/SubComponentsForDifferentWindows/CalculatorComponent/Calculator";
import { NotesComponent } from "./Components/SubComponentsForDifferentWindows/NotesComponent/Notes";
import "./App.css";

function App() {
  const [isCalculatorWindowOpen, setIsCalculatorWindowOpen] = useState(false);
  const [isNotesWindowOpen, setIsNotesWindowOpen] = useState(false);
  const handleCalculatorWindowOpen = () => {
    if (!isCalculatorWindowOpen) {
      setIsCalculatorWindowOpen(true);
    }
  };

  const handleNotesWindowOpen = () => {
    if (!isNotesWindowOpen) {
      setIsNotesWindowOpen(true);
    }
  };

  const handleCalculatorWindowClose = () => {
    if (isCalculatorWindowOpen) {
      setIsCalculatorWindowOpen(false);
    }
  };

  const handleNotesWindowClose = () => {
    if (isNotesWindowOpen) {
      setIsNotesWindowOpen(false);
    }
  };

  useEffect(() => {
    console.log("isOpen", isCalculatorWindowOpen);
  }, [isCalculatorWindowOpen]);

  return (
    <>
      <AppWrapper>
        <div
          onClick={handleCalculatorWindowOpen}
          className="testClickableElementDiv"
        >
          Calculator
        </div>
        <div
          onClick={handleNotesWindowOpen}
          className="testClickableElementDiv"
        >
          Notes
        </div>
        <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
          {isCalculatorWindowOpen && (
            <WindowComponent
              title="Calculator"
              defaultPosition={{ x: 500, y: 100 }}
              defaultSize={{ width: 320, height: 537 }}
              defaultMinSize={{ width: 320, height: 537 }}
              defaultMaxSize={{ width: 320, height: 537 }}
              closable={true}
              resizable={false}
              onClose={handleCalculatorWindowClose}
              className="calculatorWindow"
            >
              <CalculatorComponent />
            </WindowComponent>
          )}

          {isNotesWindowOpen && (
            <WindowComponent
              title="Notes"
              defaultPosition={{ x: 500, y: 100 }}
              defaultSize={{ width: 461, height: 403 }}
              defaultMinSize={{ width: 465, height: 403 }}
              defaultMaxSize={{ width: 461, height: 403 }}
              closable={true}
              resizable={true}
              onClose={handleNotesWindowClose}
              className="calculatorWindow"
            >
              <NotesComponent />
            </WindowComponent>
          )}
        </div>
      </AppWrapper>
    </>
  );
}

export default App;

const AppWrapper = styled.div`
  overflow-x: hidden;
  .testClickableElementDiv {
    padding: 0.5rem;
    background-color: #08415c;
    border: 1px solid #ccc929;
    color: white;
    border-radius: 3px;
    width: 100px;
    transition: 0.5s ease;
    cursor: pointer;
    margin-top: 10px;

    .testClickableElementSpan {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;
    }
  }

  .testClickableElementDiv:hover {
    border: 1px solid lime;
  }

  .calculatorWindow {
    padding: 0;
    margin: 0;
  }
`;
