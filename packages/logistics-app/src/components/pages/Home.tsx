import { Responsive, WidthProvider } from "react-grid-layout";
import { windowsStore } from "../../stores/Windows.store";
import { observer } from "mobx-react-lite";
import "../organism//DraggableContainer/styles.sass";
import "./styles/GridLayout.scss";
import useWindowDimensions from "../../hooks/useWindowDimensions";

// data-grid={{ x: 4, y: 0, w: 1, h: 2 }}

const ResponsiveGridLayout = WidthProvider(Responsive);

const Home = () => {
  const { windows, getLayouts } = windowsStore;

  const { width, height } = useWindowDimensions();

  const layouts = getLayouts;

  console.log("Windows: ", windows);

  return (
    <>
      <ResponsiveGridLayout
        className="flex-1 w-full h-full grid gap-4 draggable-container transition-all"
        layouts={layouts}
        rowHeight={32}
        isBounded
        cols={{
          lg: (width - 160) / 32,
          md: (width - 160) / 32,
          sm: 16,
          xs: 8,
          xxs: 4
        }}
        margin={[0, 0]}
        draggableHandle=".draggable-window--handler"
        onLayoutChange={(layout, newLayouts) => {
          windowsStore.setLayouts = newLayouts;
        }}
        resizeHandles={["se", "sw"]}
      >
        {windows.map(({ Component, id }) => (
          <div key={id}>
            <Component windowId={id} />
          </div>
        ))}
      </ResponsiveGridLayout>
      {/* <DraggableContainer>
        <DraggableWindow title="Isso é um teste" />
        <DraggableWindow title="Outro titulo" />
      </DraggableContainer> */}
    </>
  );
};

export default observer(Home);
