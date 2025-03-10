import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colors } from "../../../constantsColors";

interface Timer {
  id: string;
  time: number;
  title: string;
  isRunning: boolean;
}

interface Stopwatch {
  id: string;
  time: number;
  title: string;
  isRunning: boolean;
}

export const TimerComponent: React.FC = () => {
  const [view, setView] = useState<"timer" | "stopwatch">("timer");

  const [timers, setTimers] = useState<Timer[]>([
    { id: "1", time: 0, title: "Timer 1", isRunning: false },
  ]);

  const [stopwatches, setStopwatches] = useState<Stopwatch[]>([
    { id: "1", time: 0, title: "Stopwatch 1", isRunning: false },
  ]);

  const [confirmingIndex, setConfirmingIndex] = useState<number | null>(null);

  useEffect(() => {
    const intervals = timers.map((timer) => {
      if (timer.isRunning && timer.time > 0) {
        return setInterval(() => {
          setTimers((prev) =>
            prev.map((t) =>
              t.id === timer.id
                ? {
                    ...t,
                    time: Math.max(t.time - 1, 0),
                    isRunning: t.time === 1 ? false : t.isRunning,
                  }
                : t
            )
          );
        }, 1000);
      }
      return null;
    });
    return () => {
      intervals.forEach(
        (interval) =>
          interval && clearInterval(interval as ReturnType<typeof setInterval>)
      );
    };
  }, [timers]);

  useEffect(() => {
    const intervals = stopwatches.map((sw) => {
      if (sw.isRunning) {
        return setInterval(() => {
          setStopwatches((prev) =>
            prev.map((s) => (s.id === sw.id ? { ...s, time: s.time + 1 } : s))
          );
        }, 1000);
      }
      return null;
    });
    return () => {
      intervals.forEach(
        (interval) =>
          interval && clearInterval(interval as ReturnType<typeof setInterval>)
      );
    };
  }, [stopwatches]);

  const handleTimerTitleChange = (id: string, newTitle: string) => {
    setTimers((prev) =>
      prev.map((timer) =>
        timer.id === id ? { ...timer, title: newTitle } : timer
      )
    );
  };

  const adjustTime = (id: string, seconds: number) => {
    setTimers((prev) =>
      prev.map((timer) =>
        timer.id === id
          ? { ...timer, time: Math.max(timer.time + seconds, 0) }
          : timer
      )
    );
  };

  const toggleTimer = (id: string) => {
    setTimers((prev) =>
      prev.map((timer) =>
        timer.id === id
          ? {
              ...timer,
              isRunning: timer.time > 0 ? !timer.isRunning : timer.isRunning,
            }
          : timer
      )
    );
  };

  const addTimer = () => {
    setTimers((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        time: 0,
        title: `Timer ${prev.length + 1}`,
        isRunning: false,
      },
    ]);
  };

  const handleStopwatchTitleChange = (id: string, newTitle: string) => {
    setStopwatches((prev) =>
      prev.map((sw) => (sw.id === id ? { ...sw, title: newTitle } : sw))
    );
  };

  const toggleStopwatch = (id: string) => {
    setStopwatches((prev) =>
      prev.map((sw) =>
        sw.id === id ? { ...sw, isRunning: !sw.isRunning } : sw
      )
    );
  };

  const resetStopwatch = (id: string) => {
    setStopwatches((prev) =>
      prev.map((sw) =>
        sw.id === id ? { ...sw, time: 0, isRunning: false } : sw
      )
    );
  };

  const addStopwatch = () => {
    setStopwatches((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        time: 0,
        title: `Stopwatch ${prev.length + 1}`,
        isRunning: false,
      },
    ]);
  };

  const deleteTimer = (id: string) => {
    setTimers((prev) => prev.filter((timer) => timer.id !== id));
  };

  const deleteStopwatch = (id: string) => {
    setStopwatches((prev) => prev.filter((sw) => sw.id !== id));
  };

  const showDeleteTooltip = (index: number) => {
    setConfirmingIndex(index);
  };

  const hideDeleteTooltip = () => {
    setConfirmingIndex(null);
  };

  const confirmDeleteTimer = (index: number) => {
    deleteTimer(timers[index].id);
    hideDeleteTooltip();
    setConfirmingIndex(null);
  };

  const confirmDeleteStopWatch = (index: number) => {
    deleteStopwatch(stopwatches[index].id);
    hideDeleteTooltip();
    setConfirmingIndex(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <TimerComponentWrapper>
      <div className="headerRow">
        <div className="headerBtn" onClick={() => setView("timer")}>
          Timer
        </div>
        <div className="headerBtn" onClick={() => setView("stopwatch")}>
          Stopwatch
        </div>
      </div>

      {view === "timer" && (
        <div className="contentDiv">
          {timers.map((timer, index) => (
            <div key={timer.id} className="timerSection">
              <input
                type="text"
                className="titleInput"
                value={timer.title}
                onChange={(e) =>
                  handleTimerTitleChange(timer.id, e.target.value)
                }
                onBlur={(e) =>
                  handleTimerTitleChange(timer.id, e.target.value.trim())
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.currentTarget.blur();
                }}
              />
              <button
                className="deleteBtn"
                onClick={() => showDeleteTooltip(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="red"
                  className="trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </button>
              {confirmingIndex === index && (
                <div className="deleteTooltip">
                  <button onClick={() => confirmDeleteTimer(index)}>
                    Delete
                  </button>
                  <button onClick={hideDeleteTooltip}>Cancel</button>
                </div>
              )}
              <h2
                className={
                  timer.time > 0 && timer.time > 120
                    ? "timerDisplay"
                    : timer.time > 0 && timer.time <= 120 && timer.time > 60
                    ? "timerDisplay timerDisplayWarning"
                    : timer.time > 0 && timer.time <= 60
                    ? "timerDisplay timerDisplayDanger"
                    : "timerDisplay"
                }
              >
                {formatTime(timer.time)}
              </h2>
              <button
                className={timer.isRunning ? "timerStopBtn" : "timerStartBtn"}
                onClick={() => toggleTimer(timer.id)}
              >
                {timer.isRunning ? "Pause" : "Start"}
              </button>
              <div className="timerControls">
                <button
                  className="timerControlsBtn"
                  onClick={() => adjustTime(timer.id, 10)}
                >
                  +0:10
                </button>
                <button
                  className="timerControlsBtn"
                  onClick={() => adjustTime(timer.id, 60)}
                >
                  +1:00
                </button>
                <button
                  className="timerControlsBtn"
                  onClick={() => adjustTime(timer.id, 300)}
                >
                  +5:00
                </button>
                <button
                  className="timerControlsBtn"
                  onClick={() => adjustTime(timer.id, 1800)}
                >
                  +30:00
                </button>
              </div>
              <div className="timerControls">
                <button
                  className="timerControlsBtn"
                  onClick={() => adjustTime(timer.id, -10)}
                >
                  -0:10
                </button>
                <button
                  className="timerControlsBtn"
                  onClick={() => adjustTime(timer.id, -60)}
                >
                  -1:00
                </button>
                <button
                  className="timerControlsBtn"
                  onClick={() => adjustTime(timer.id, -300)}
                >
                  -5:00
                </button>
              </div>
            </div>
          ))}
          <button className="addTimerBtn" onClick={addTimer}>
            Add Timer
          </button>
        </div>
      )}

      {view === "stopwatch" && (
        <div className="contentDiv">
          {stopwatches.map((sw, index) => (
            <div key={sw.id} className="stopwatchSection">
              <input
                type="text"
                className="titleInput"
                value={sw.title}
                onChange={(e) =>
                  handleStopwatchTitleChange(sw.id, e.target.value)
                }
                onBlur={(e) =>
                  handleStopwatchTitleChange(sw.id, e.target.value.trim())
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.currentTarget.blur();
                }}
              />
              <button
                className="deleteBtn"
                onClick={() => showDeleteTooltip(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="red"
                  className="trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </button>
              {confirmingIndex === index && (
                <div className="deleteTooltip">
                  <button onClick={() => confirmDeleteStopWatch(index)}>
                    Delete
                  </button>
                  <button onClick={hideDeleteTooltip}>Cancel</button>
                </div>
              )}
              <h2 className="stopwatchDisplay">{formatTime(sw.time)}</h2>
              <button
                className={
                  sw.isRunning ? "stopwatchStopBtn" : "stopwatchStartBtn"
                }
                onClick={() => toggleStopwatch(sw.id)}
              >
                {sw.isRunning ? "Pause" : "Start"}
              </button>
              <button
                className="resetBtn"
                onClick={() => resetStopwatch(sw.id)}
              >
                Reset
              </button>
            </div>
          ))}
          <button className="addStopwatchBtn" onClick={addStopwatch}>
            Add Stopwatch
          </button>
        </div>
      )}
    </TimerComponentWrapper>
  );
};

const TimerComponentWrapper = styled.div`
  .headerRow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 3px;
    margin-left: 1px;
    margin-right: 1px;
  }

  .headerBtn {
    cursor: pointer;
    padding: 10px 20px;
    background-color: ${colors.primaryBlue};
    color: white;
    border-radius: 5px;
    font-size: 18px;
    user-select: none;
    transition: background-color 0.3s;
  }

  .headerBtn:hover {
    background-color: ${colors.primaryBlueHover};
  }

  .contentDiv {
    height: 320px;
    overflow-y: auto;
  }

  .timerSection,
  .stopwatchSection {
    margin-top: 15px;
    text-align: center;
  }

  .titleInput {
    font-size: 25px;
    text-align: center;
    border: none;
    background: none;
    outline: none;
    font-weight: bold;
    width: 200px;
    color: ${colors.success};
    margin-left: 20px;
  }

  .titleInputWarning {
    color: ${colors.warning};
  }

  .titleInputDanger {
    color: ${colors.lightDanger};
  }

  .deleteBtn {
    cursor: pointer;
    background: none;
    border: none;
  }

  .deleteTooltip {
    position: absolute;
    left: 75%;
    transform: translateX(-50%);
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
    z-index: 10;
    width: fit-content;
  }

  .deleteTooltip button {
    margin-left: 4px;
    background: #555;
    color: #fff;
    border: none;
    padding: 10px 18px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 12px;
    width: 100%;
  }

  .timerDisplay,
  .stopwatchDisplay {
    font-size: 40px;
    font-weight: bold;
    margin: 5px 0;
  }

  .timerDisplayWarning {
    color: ${colors.warning};
  }

  .timerDisplayDanger {
    color: ${colors.lightDanger};
  }

  .timerControls {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  .stopwatchStartBtn,
  .timerStartBtn {
    width: 100px;
    margin-right: 8px;
    margin-top: 5px;
    padding: 8px 15px;
    font-size: 18px;
    border-radius: 5px;
    background-color: ${colors.success};
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${colors.successHover};
    }
  }
  .stopwatchStopBtn,
  .timerStopBtn {
    width: 100px;
    margin-right: 8px;
    margin-top: 5px;
    padding: 8px 15px;
    font-size: 18px;
    border-radius: 5px;
    background-color: ${colors.warning};
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${colors.warningHover};
    }
  }
  .timerControlsBtn {
    cursor: pointer;
    padding: 5px 10px;
    margin: 0 5px;
    border: none;
    border-radius: 5px;
    background-color: ${colors.secondaryBlue};
    color: white;
    font-size: 16px;
    transition: background-color 0.3s;
  }

  .timerControlsBtn:hover {
    background-color: ${colors.secondaryBlueHover};
  }

  .addTimerBtn,
  .addStopwatchBtn {
    display: block;
    margin: 15px auto;
    padding: 10px 20px;
    font-size: 18px;
    border-radius: 5px;
    background-color: ${colors.treeColor};
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .addTimerBtn:hover,
  .addStopwatchBtn:hover {
    background-color: ${colors.treeColorHover};
  }

  .resetBtn {
    width: 100px;
    margin-left: 8px;
    margin-top: 5px;
    padding: 8px 15px;
    font-size: 18px;
    border-radius: 5px;
    background-color: ${colors.lightDanger};
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .resetBtn:hover {
    background-color: ${colors.danger};
  }
`;

export default TimerComponent;
