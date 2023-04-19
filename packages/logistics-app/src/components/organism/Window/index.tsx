import { Icon } from "@iconify/react";
import "./styles.sass";
import { ReactNode, forwardRef, memo } from "react";
import { windowsStore } from "../../../stores/Windows.store";

interface IProps {
  title?: string;
  children?: ReactNode;
  windowId: string;
  variant?: "default" | "spacing";
  changeHover?: () => void;
}

const Window = forwardRef(
  (
    {
      title = "No title",
      variant = "default",
      changeHover,
      children = "",
      windowId,
      ...props
    }: IProps,
    ref: any
  ) => {
    const { removeWindow } = windowsStore;
    return (
      <div className="draggable-window" data-variant={variant}>
        <header className="draggable-window--top">
          <div className="draggable-window--handler">
            <h2>{title}</h2>
          </div>
          <div className="flex">
            <button className="btn btn-ghost btn-sm btn-square">
              <Icon icon="material-symbols:minimize-rounded" />
            </button>
            <button className="btn btn-ghost btn-sm btn-square">
              <Icon icon="ph:gear-six-fill" />
            </button>
            <button
              onClick={() => {
                removeWindow(windowId);
              }}
              className="btn btn-ghost btn-sm btn-square"
            >
              <Icon icon="material-symbols:close-rounded" />
            </button>
          </div>
        </header>
        <div className="draggable-window--container">{children}</div>
      </div>
    );
  }
);
export default memo(Window);
