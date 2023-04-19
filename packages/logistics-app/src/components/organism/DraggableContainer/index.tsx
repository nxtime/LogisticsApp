import { ReactNode, useState } from "react";
import "./styles.sass";
import { windowsStore } from "../../../stores/Windows.store";
import { observer } from "mobx-react-lite";

interface IProps {
  children: ReactNode;
}

const DraggableContainer = ({ children }: IProps) => {
  const { dragging } = windowsStore;

  console.log("Current dragging state: ", dragging);
  return (
    <div className={`draggable-container ${dragging ? "dragging" : ""}`}>
      {children}
    </div>
  );
};

export default observer(DraggableContainer);
