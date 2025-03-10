import { useEffect, useState } from "react";
import { WindowComponent } from "./Components/WindowComponent";
import styled from "styled-components";
import CalculatorComponent from "./Components/SubComponentsForDifferentWindows/CalculatorComponent/Calculator";
import { NotesComponent } from "./Components/SubComponentsForDifferentWindows/NotesComponent/Notes";
import "./App.css";
import { TimerComponent } from "./Components/SubComponentsForDifferentWindows/TimerComponent/Timer";
import { TranslatorComponent } from "./Components/SubComponentsForDifferentWindows/TranslatorComponent/Translator";

function App() {
  const [isCalculatorWindowOpen, setIsCalculatorWindowOpen] = useState(false);
  const [isNotesWindowOpen, setIsNotesWindowOpen] = useState(false);
  const [isTimerWindowOpen, setIsTimerWindowOpen] = useState(false);
  const [isTranslatorWindowOpen, setIsTranslatorWindowOpen] = useState(false);
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

  const handleTimerWindowOpen = () => {
    if (!isTimerWindowOpen) {
      setIsTimerWindowOpen(true);
    }
  };

  const handleTranslatorWindowOpen = () => {
    if (!isTranslatorWindowOpen) {
      setIsTranslatorWindowOpen(true);
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

  const handleTimerWindowClose = () => {
    if (isTimerWindowOpen) {
      setIsTimerWindowOpen(false);
    }
  };

  const handleTranslatorWindowClose = () => {
    if (isTranslatorWindowOpen) {
      setIsTranslatorWindowOpen(false);
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
        <div
          onClick={handleTimerWindowOpen}
          className="testClickableElementDiv"
        >
          Timer
        </div>
        <div
          onClick={handleTranslatorWindowOpen}
          className="testClickableElementDiv"
        >
          Translator
        </div>

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
          >
            <CalculatorComponent />
          </WindowComponent>
        )}

        {isNotesWindowOpen && (
          <WindowComponent
            title="Notes"
            defaultPosition={{ x: 500, y: 100 }}
            defaultSize={{ width: 490, height: 403 }}
            defaultMinSize={{ width: 490, height: 403 }}
            defaultMaxSize={{ width: 490, height: 403 }}
            closable={true}
            resizable={false}
            onClose={handleNotesWindowClose}
          >
            <NotesComponent />
          </WindowComponent>
        )}

        {isTimerWindowOpen && (
          <WindowComponent
            title="Timer"
            defaultPosition={{ x: 500, y: 100 }}
            defaultSize={{ width: 461, height: 403 }}
            defaultMinSize={{ width: 465, height: 403 }}
            defaultMaxSize={{ width: 461, height: 403 }}
            closable={true}
            resizable={false}
            onClose={handleTimerWindowClose}
          >
            <TimerComponent />
          </WindowComponent>
        )}
        {isTranslatorWindowOpen && (
          <WindowComponent
            title="Translator"
            defaultPosition={{ x: 500, y: 100 }}
            defaultSize={{ width: 950, height: 500 }}
            defaultMinSize={{ width: 950, height: 500 }}
            defaultMaxSize={{ width: 950, height: 500 }}
            closable={true}
            resizable={false}
            onClose={handleTranslatorWindowClose}
          >
            <TranslatorComponent />
          </WindowComponent>
        )}
      </AppWrapper>
    </>
  );
}

export default App;

const AppWrapper = styled.div`
  overflow-x: hidden;
  height: 100vh;
  .testClickableElementDiv {
    padding: 0.5rem;
    background-color: #08415c;
    border: 1px solid #ccc929;
    color: white;
    border-radius: 7px;
    width: 100px;
    transition: 0.5s ease;
    cursor: pointer;
    margin-top: 10px;
    /* transition: border 5s ease; */

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
