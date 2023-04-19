import { Icon } from "@iconify/react";
import "./styles.sass";
import { useRef } from "react";
import Draggable from "react-draggable";
import { windowsStore } from "../../../stores/Windows.store";
import { Resizable, ResizableBox } from "react-resizable";
import { observer } from "mobx-react-lite";

interface IProps {
  title?: string;
  changeHover?: () => void;
}

const DraggableWindow = ({ title = "No title", changeHover }: IProps) => {
  const snapToGrid = 32;
  const { changeDragging } = windowsStore;
  const window = useRef<HTMLDivElement>(null);
  return (
    <Draggable
      // axis="x"
      handle=".draggable-window--handler"
      defaultPosition={{ x: 0, y: 0 }}
      cancel=".draggable-window--container .btn"
      // position={null}
      bounds="parent"
      grid={[snapToGrid, snapToGrid]}
      scale={1}
      onStart={() => changeDragging(true)}
      // onDrag={this.handleDrag}
      onStop={() => changeDragging(false)}
    >
      <ResizableBox
        height={256}
        width={256}
        minConstraints={[256, 256]}
        onResize={() => changeDragging(true)}
        onResizeStop={() => changeDragging(false)}
        draggableOpts={{ grid: [snapToGrid, snapToGrid] }}
        // maxConstraints={}
        resizeHandles={["sw", "se", "nw", "ne", "w", "e", "n", "s"]}
      >
        <div className="draggable-window" ref={window}>
          <header className="draggable-window--handler">
            <h2>{title}</h2>
            <div className="flex">
              <button className="btn btn-ghost btn-sm btn-square">
                <Icon icon="material-symbols:minimize-rounded" />
              </button>
              <button className="btn btn-ghost btn-sm btn-square">
                <Icon icon="tabler:maximize" />
              </button>
              <button className="btn btn-ghost btn-sm btn-square">
                <Icon icon="material-symbols:close-rounded" />
              </button>
            </div>
          </header>
          <div className="draggable-window--container">Hello World</div>
        </div>
      </ResizableBox>
    </Draggable>
  );
};

export default DraggableWindow;
