import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import { colors } from "../constantsColors";

export interface WindowProps {
  title?: string;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  defaultMinSize?: { width: number; height: number };
  defaultMaxSize?: { width: number; height: number };
  closable?: boolean;
  onClose?: () => void;
  resizable?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const WindowComponent = ({
  title,
  defaultPosition = { x: 100, y: 100 },
  defaultSize = { width: 400, height: 300 },
  defaultMinSize = { width: 200, height: 150 },
  defaultMaxSize = { width: 1200, height: 1000 },
  closable = false,
  resizable = true,
  onClose,
  children,
  className,
  style,
}: WindowProps) => {
  const [size, setSize] = useState(defaultSize);
  const [position, setPosition] = useState(defaultPosition);
  const [isDraggingOrResizing, setIsDraggingOrResizing] = useState(false);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDraggingOrResizing(true);
      const startX = e.clientX;
      const startY = e.clientY;
      const startPos = { ...position };

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const newX = startPos.x + (moveEvent.clientX - startX);
        const newY = startPos.y + (moveEvent.clientY - startY);
        setPosition({ x: newX, y: newY });
      };

      const handleMouseUp = () => {
        setIsDraggingOrResizing(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [position]
  );

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDraggingOrResizing(true);
    const startX = e.clientX;
    const startY = e.clientY;
    const startSize = { ...size };

    const handleResizeMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.min(
        Math.max(
          startSize.width + (moveEvent.clientX - startX),
          defaultMinSize.width
        ),
        defaultMaxSize.width
      );
      const newHeight = Math.min(
        Math.max(
          startSize.height + (moveEvent.clientY - startY),
          defaultMinSize.height
        ),
        defaultMaxSize.height
      );
      setSize({ width: newWidth, height: newHeight });
    };

    const handleResizeMouseUp = () => {
      setIsDraggingOrResizing(false);
      document.removeEventListener("mousemove", handleResizeMouseMove);
      document.removeEventListener("mouseup", handleResizeMouseUp);
    };

    document.addEventListener("mousemove", handleResizeMouseMove);
    document.addEventListener("mouseup", handleResizeMouseUp);
  };

  useEffect(() => {
    if (isDraggingOrResizing) {
      document.body.style.userSelect = "none";
    } else {
      document.body.style.userSelect = "";
    }

    return () => {
      document.body.style.userSelect = "";
    };
  }, [isDraggingOrResizing]);

  return (
    <WindowComponentWrapper
      x={position.x}
      y={position.y}
      width={size.width}
      height={size.height}
    >
      <div className="windowTitle" onMouseDown={handleMouseDown}>
        <div className="titleSpanDiv">
          <span className="titleSpan">{title}</span>
        </div>
        {closable && (
          <button className="closeBtn" onClick={onClose}>
            X
          </button>
        )}
      </div>
      <div className="window-content">{children}</div>

      {resizable && (
        <>
          <div
            className="resizeHandleBottomRight"
            onMouseDown={handleResizeMouseDown}
          />
          <div
            className="resizeHandleBottomLeft"
            onMouseDown={handleResizeMouseDown}
          />
          <div
            className="resizeHandleTopRight"
            onMouseDown={handleResizeMouseDown}
          />
          <div
            className="resizeHandleTopLeft"
            onMouseDown={handleResizeMouseDown}
          />
        </>
      )}
    </WindowComponentWrapper>
  );
};

const WindowComponentWrapper = styled.div<{
  x: number;
  y: number;
  width: number;
  height: number;
}>`
  position: absolute;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: ${colors.backgroundColorBlueDefault};
  border: 3px solid ${colors.backgroundColorBlueDefault};
  color: white;
  font-size: 1rem;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);

  .windowTitle {
    background-color: ${colors.windowTitleColor};
    color: #fff;
    font-size: 1.2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .titleSpan {
      margin-left: 5px;
    }

    .closeBtn {
      background-color: ${colors.secondaryBlue};
      color: white;
      border: none;
      cursor: pointer;
      padding: 5px 10px;
      transition: background-color 0.33s;

      &:hover {
        background-color: ${colors.lightDanger};
      }
    }
  }

  .resizeHandleBottomRight {
    width: 15px;
    height: 15px;
    position: absolute;
    right: 0;
    bottom: 0;
    cursor: se-resize;
    opacity: 0;
  }
  .resizeHandleBottomLeft {
    width: 15px;
    height: 15px;
    position: absolute;
    left: 0;
    bottom: 0;
    cursor: se-resize;
    opacity: 0;
  }
  .resizeHandleTopRight {
    width: 5px;
    height: 5px;
    position: absolute;
    right: 0;
    top: 0;
    cursor: se-resize;
    opacity: 0;
  }
  .resizeHandleTopLeft {
    width: 5px;
    height: 5px;
    position: absolute;
    left: 0;
    top: 0;
    cursor: se-resize;
    opacity: 0;
  }
`;
