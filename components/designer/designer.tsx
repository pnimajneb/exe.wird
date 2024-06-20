import React, { useEffect, useState } from "react";

interface DesignerProps {
  changeColor: (color: string) => void;
  showFrontDesigner: boolean;
  setShowFrontDesigner: (value: boolean) => void;
  frontCanvas: React.RefObject<any>;
  backCanvas: React.RefObject<any>;
}

export const DesignerComponent: React.FC<DesignerProps> = (
  props: DesignerProps
) => {
  const {
    changeColor,
    showFrontDesigner,
    setShowFrontDesigner,
    frontCanvas,
    backCanvas,
  } = props;

  const [frontDesignerState, setFrontDesignerState] = useState(null);
  const [backDesignerState, setBackDesignerState] = useState(null);

  const saveCurrentCanvasState = () => {
    if (showFrontDesigner && frontCanvas.current) {
      setFrontDesignerState(frontCanvas.current.toJSON());
    } else if (!showFrontDesigner && backCanvas.current) {
      setBackDesignerState(backCanvas.current.toJSON());
    }
  };

  const loadCanvasState = () => {
    if (showFrontDesigner && frontCanvas.current && frontDesignerState) {
      frontCanvas.current.loadFromJSON(
        frontDesignerState,
        frontCanvas.current.renderAll.bind(frontCanvas.current)
      );
    } else if (!showFrontDesigner && backCanvas.current && backDesignerState) {
      backCanvas.current.loadFromJSON(
        backDesignerState,
        backCanvas.current.renderAll.bind(backCanvas.current)
      );
    }
  };

  useEffect(() => {
    if (frontCanvas.current) {
      loadCanvasState();
    }
  }, [frontCanvas.current]);

  useEffect(() => {
    if (backCanvas.current) {
      loadCanvasState();
    }
  }, [backCanvas.current]);

  const toggleDesigner = () => {
    saveCurrentCanvasState();
    setShowFrontDesigner(!showFrontDesigner);
  };

  return (
    <div className="border-neutral-600 border-2 rounded-[2px]">
      <div>
        <div style={{ display: showFrontDesigner ? "flex" : "none" }}>
          <canvas ref={frontCanvas} id="frontCanvas" />
        </div>
        <div style={{ display: showFrontDesigner ? "none" : "flex" }}>
          <canvas ref={backCanvas} id="backCanvas" />
        </div>
      </div>
      <button onClick={toggleDesigner}>switch</button>
    </div>
  );
};
