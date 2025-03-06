import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface Note {
  id: string;
  text: string;
}

export const NotesComponent: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      try {
        return JSON.parse(storedNotes) as Note[];
      } catch (error) {
        console.error("Error parsing notes from localStorage", error);
      }
    }
    return [{ id: "1", text: "" }];
  });

  const [selectedNoteIndex, setSelectedNoteIndex] = useState<number>(0);
  const [scrollOffset, setScrollOffset] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const visibleNotes = notes.slice(scrollOffset, scrollOffset + 3);
  const selectedNote = notes[selectedNoteIndex];

  const handleNoteTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedText = e.target.value;
    setNotes((prevNotes) => {
      const newNotes = [...prevNotes];
      newNotes[selectedNoteIndex] = {
        ...newNotes[selectedNoteIndex],
        text: updatedText,
      };
      return newNotes;
    });
  };

  const handleCreateNote = () => {
    setNotes((prevNotes) => {
      const newNote: Note = {
        id: Date.now().toString(),
        text: "",
      };
      const updatedNotes = [newNote, ...prevNotes];
      // LOL, I was looking for some answer how to set selectedNote after creating new note -- It was so damn ezzy
      setSelectedNoteIndex(0);
      return updatedNotes;
    });
  };

  const handleScrollLeft = () => {
    if (scrollOffset > 0) {
      setScrollOffset((prevOffset) => prevOffset - 1);
    }
  };

  const handleScrollRight = () => {
    if (scrollOffset + 3 < notes.length) {
      setScrollOffset((prevOffset) => prevOffset + 1);
    }
  };

  const handleDeleteNote = (
    noteIndex: number,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    setNotes((prevNotes) => {
      const newNotes = prevNotes.filter((_, i) => i !== noteIndex);
      if (selectedNoteIndex === noteIndex) {
        setSelectedNoteIndex(
          newNotes.length > 0 ? Math.max(noteIndex - 1, 0) : 0
        );
      } else if (selectedNoteIndex > noteIndex) {
        setSelectedNoteIndex((prev) => prev - 1);
      }
      if (scrollOffset > 0 && newNotes.length - scrollOffset < 3) {
        setScrollOffset(Math.max(scrollOffset - 1, 0));
      }
      return newNotes;
    });
  };

  const handleSelectNote = (noteIndex: number) => {
    setSelectedNoteIndex(noteIndex);
  };

  const leftHiddenCount = scrollOffset;

  const rightHiddenCount = Math.max(0, notes.length - (scrollOffset + 3));

  return (
    <NotesComponentWrapper>
      <div className="notesComponentDiv">
        <div className="notesHeaderDiv">
          <div
            className="smallerBtn scrollBtn scrollLeftBtn"
            onClick={handleScrollLeft}
          >
            {leftHiddenCount > 0 && (
              <sub className="leftHiddenCount hiddenCount">
                {leftHiddenCount > 9 ? "9+" : leftHiddenCount}
              </sub>
            )}
            {"<"}
          </div>
          {visibleNotes.map((note, idx) => {
            const overallIndex = scrollOffset + idx;
            const noteTitle = note.text.split("\n")[0] || "Untitled";
            return (
              <div
                key={note.id}
                className={`noteElementBtn ${
                  overallIndex === selectedNoteIndex
                    ? "activeNoteElementBtn"
                    : ""
                }`}
                onClick={() => handleSelectNote(overallIndex)}
                onContextMenu={(e) => handleDeleteNote(overallIndex, e)}
              >
                {noteTitle}
              </div>
            );
          })}
          <div className="rightSideHeaderPart">
            <div
              className="smallerBtn scrollBtn scrollRightBtn"
              onClick={handleScrollRight}
            >
              {">"}
              {rightHiddenCount > 0 && (
                <sub className="rightHiddenCount hiddenCount">
                  {rightHiddenCount > 9 ? "9+" : rightHiddenCount}
                </sub>
              )}
            </div>
            <div className="smallerBtn addNoteBtn" onClick={handleCreateNote}>
              +
            </div>
          </div>
        </div>
        <div className="notesTextAreaDiv">
          {selectedNote ? (
            <textarea
              value={selectedNote.text}
              onChange={handleNoteTextChange}
              placeholder="Type your note here (first line will be the title)..."
              className="notesTextArea"
            />
          ) : (
            <div className="noNoteSelectedDiv">No note selected... </div>
          )}
        </div>
      </div>
    </NotesComponentWrapper>
  );
};

const NotesComponentWrapper = styled.div`
  .notesHeaderDiv {
    margin-top: 2px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .rightSideHeaderPart {
    display: flex;
    flex-direction: row;
  }

  .noteElementBtn {
    cursor: pointer;
    width: 110px;
    height: 45px;
    background-color: #5299d3;
    border: 1px solid #000000;
    border-radius: 5px;
    padding: 2px;
    margin: 1px;
    font-size: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s ease;
  }

  .activeNoteElementBtn {
    border-bottom: 1px solid lime;
  }

  .noteElementBtn:hover {
    background-color: #66a5d8;
  }

  .smallerBtn {
    position: relative;
    top: 3px;
    cursor: pointer;
    width: 45px;
    height: 45px;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
    border-radius: 10px;
    background-color: #8d8d8d;
    margin: 1px;
    user-select: none;
  }

  .scrollBtn {
    background-color: #208af3;
    transition: 0.3s ease;
  }

  .scrollBtn:hover {
    background-color: #0662bf;
  }

  .hiddenCount {
    font-size: 16px;
    color: yellow;
    font-weight: 900;
  }

  .leftHiddenCount {
    position: relative;
    bottom: 5px;
    right: 3px;
  }

  .rightHiddenCount {
    position: relative;
    bottom: 5px;
    left: 3px;
  }

  .addNoteBtn {
    background-color: #5ce65c;
    transition: 0.3s ease;
  }

  .addNoteBtn:hover {
    background-color: #17db17;
  }

  .noNoteSelectedDiv {
    display: flex;
    justify-content: center;
    font-size: 30px;
  }

  .notesTextAreaDiv {
    margin-top: 3px;
    margin-left: 1px;
  }

  .notesTextArea {
    outline: none;
    width: 453px;
    height: 313px;
    resize: none;
    background-color: #00747a;
    color: #ffffff;
    font-size: 1rem;
  }

  .notesTextArea::placeholder {
    color: #ffffff;
    font-size: 1rem;
  }
`;
