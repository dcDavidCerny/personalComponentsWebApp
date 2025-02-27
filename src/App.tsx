import { use, useEffect, useState } from "react";
import { WindowComponent } from "./Components/WindowComponent";
import styled from "styled-components";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [superBtn, setSuperBtn] = useState(false);
  const handleCloseOrOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    console.log("isOpen", isOpen);
  }, [isOpen]);

  {
    /* handleSuperBtn */
  }
  const handleSuperBtn = () => {
    setSuperBtn(!superBtn);
  };
  useEffect(() => {
    if (superBtn) {
      setTimeout(() => {
        setIsOpen(!isOpen);
      }, 100);
    }
  }, [isOpen, superBtn]);
  {
    /* handleSuperBtn */
  }

  return (
    <>
      <AppWrapper>
        <div onClick={handleCloseOrOpen} className="testClickableElementDiv">
          HIiiiiiii
        </div>
        {/* handleSuperBtn */}
        <div onClick={handleSuperBtn} className="testClickableElementDiv">
          SUPER BTN
        </div>
        {/* handleSuperBtn */}
        <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
          {isOpen && (
            <WindowComponent
              title="Sample Window"
              defaultPosition={{ x: 500, y: 100 }}
              defaultSize={{ width: 1000, height: 500 }}
              closable={true}
              onClose={handleCloseOrOpen}
              className="custom-window"
            >
              <div style={{ padding: "1rem" }}>
                <p>This is a sample window content.</p>
              </div>
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
`;
