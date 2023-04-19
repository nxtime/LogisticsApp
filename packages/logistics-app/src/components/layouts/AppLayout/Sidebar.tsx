import { Link } from "react-router-dom";
import Window from "../../organism/Window";
import { windowsStore } from "../../../stores/Windows.store";
import { Chart } from "../../atom/Chart";

const layouts = [
  {
    label: "Pessoas",
    component: (props: any) => (
      <Window title="Pessoas" {...props}>
        <Chart
          name="Gráficos"
          data={[
            ["Camila", 77.8],
            ["José", 10],
            ["Maria", 30]
          ]}
        />
      </Window>
    )
  },
  {
    label: "Carros",
    component: (props: any) => (
      <Window title="Carros" {...props}>
        <Chart
          name="Gráficos"
          data={[
            ["Civic", 37200],
            ["Onix", 17600],
            ["hb20", 22800]
          ]}
        />
      </Window>
    )
  },

  {
    label: "Users",
    component: (props: any) => <Window title="Users" {...props} />
  },
  {
    label: "Spacing",
    component: (props: any) => (
      <Window title="Spacing" variant="spacing" {...props} />
    )
  }
];

const Sidebar = () => {
  const { addWindow } = windowsStore;
  return (
    <aside className="w-64 bg-neutral p-4 flex flex-col gap-8 items-center">
      <ul className="flex flex-col gap-1  w-full">
        <li>
          <h2 className="text-2xl font-bold text-center">Layouts</h2>
        </li>
        {layouts.map(({ label, component: Component }) => (
          <li key={label} className="w-full">
            <button
              onClick={() => {
                addWindow(Component);
              }}
              className="btn btn-xl btn-ghost capitalize w-full"
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
