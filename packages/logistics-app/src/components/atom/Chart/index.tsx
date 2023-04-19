import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import useMeasure from "react-use-measure";

interface IProps {
  data: [number | string, number][];
  width: number;
  height: number;
}

interface IChartProps {
  name?: string;
  data?: [string | number, number][];
}

const dummyData: [number, number][] = [
  [20, 0],
  [50, 30],
  [100, 50],
  [150, 150],
  [200, 100]
];

export const Chart = ({
  name = "Default Chart",
  data = dummyData
}: IChartProps) => {
  let [ref, bounds] = useMeasure();

  return (
    <div className="relative h-80 w-full text-teal-200" ref={ref}>
      {bounds.width > 0 && (
        <ChartInner data={data} width={bounds.width} height={bounds.height} />
      )}
    </div>
  );
};

const Tooltip = ({ disabled, x, y, data, width, height }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [initializied, setInitialized] = useState(false);
  const [bounds, setBounds] = useState<any>({});

  useEffect(() => {
    setBounds({
      bounds: ref.current?.getBoundingClientRect(),
      offsetWidth: ref.current?.offsetWidth,
      offsetHeight: ref.current?.offsetHeight
    });
  }, [initializied]);

  if (ref.current === null && !disabled && !initializied) setInitialized(true);

  if (x + bounds.offsetWidth > width) {
    x -= bounds.offsetWidth + 40;
  } else {
    x += 20;
  }

  if (y + bounds.offsetHeight > height) {
    y -= bounds.offsetHeight + 100;
  } else {
    y += 0;
  }

  return (
    <div
      ref={ref}
      className={`${
        disabled
          ? "opacity-0 select-none invisible z-[-1]"
          : "opacity-100 visible"
      } text-white absolute top-0 left-0 bg-neutral p-4 rounded-btn shadow-lg ring-1 ring-transparent hover:ring-yellow-400 transition duration-500 group`}
      style={{ transform: `translate(${x}px, ${y}px)` }}
    >
      <h2 className="text-2xl font-medium">Informações: </h2>
      <h2>{data?.[0]}</h2>
      <div>{data?.[1]}</div>
    </div>
  );
};

function kFormatter(num: number) {
  return Math.abs(num) > 999
    ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1) as any) + "k"
    : Math.sign(num) * Math.abs(num);
}

let currentIndex = 0;

const ChartInner = ({ data, width, height }: IProps) => {
  const [currentOnHover, setCurrentOnHover] = useState<any>(null);

  let xScale: any;

  if (typeof data[0][0] === "number") {
    xScale = d3
      .scaleLinear()
      .domain(
        d3.extent((data as any).map((d: [string, number]) => d[0])) as any
      )
      .range([48, width - 32]);
  } else {
    console.log("Executing the string route");
    xScale = d3
      .scaleLinear()
      .domain(d3.extent((data as any).map((_: any, i: number) => i)) as any)
      .range([48, width - 32]);
  }

  let yScale = d3
    .scaleLinear()
    .domain(d3.extent(data.map((d) => d[1])) as any)
    .range([height - 32, 16]);

  let line = d3
    .line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]));

  let d = line(data.map((d, i) => [i, d[1]])) as string;

  return (
    <>
      <svg
        className="bg-base-200 p-4 rounded-btn ring-1 ring-transparent hover:ring-yellow-400 transition duration-500 group"
        viewBox={`0 0 ${width} ${height}`}
      >
        <path
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="group-hover:text-red-400 group-hover:duration-500 transition-colors group-hover:stroke-2"
        />
        {yScale.ticks().map(
          (tick, tickIndex) =>
            (tickIndex % 10 || tickIndex === 0) && (
              <g key={tick} transform={`translate(0, ${yScale(tick)})`}>
                <line
                  x2={width}
                  className="text-teal-200/20"
                  stroke="currentColor"
                />
                <text
                  x={4}
                  y={-16}
                  dominantBaseline="start"
                  textAnchor="center"
                  className={`text-zinc-200 group-hover:text-yellow-200 ${
                    tickIndex === 0 ? "font-black" : ""
                  }`}
                  fill="currentColor"
                >
                  {kFormatter(tick)}
                </text>
              </g>
            )
        )}
        {xScale.ticks().map((tick: string, tickIndex: number) => {
          // console.log(data?.[tickIndex]?.[0]);
          const wordOffset = (data?.[tickIndex]?.[0] as any)?.length ?? 0;

          return (
            <g
              key={tick}
              transform={`translate(${
                xScale(tickIndex) - wordOffset * 4
              }, 320)`}
            >
              <text
                x={0}
                y={0}
                // y={height / yScale.ticks().length / 6}
                dominantBaseline="start"
                textAnchor="center"
                className={`text-zinc-200 group-hover:text-yellow-200 ${
                  tickIndex === 0 ? "font-black" : ""
                }`}
                fill="currentColor"
              >
                {data?.[tickIndex]?.[0]}
              </text>
            </g>
          );
        })}

        {data.map((d, index) => (
          <circle
            key={index}
            r="10"
            fill="currentColor"
            onMouseEnter={() => {
              setCurrentOnHover(d);
              currentIndex = index;
            }}
            onMouseLeave={() => setCurrentOnHover(null)}
            className="text-neutral stroke-4 stroke-base-200 hover:text-primary transition hover:cursor-pointer hover:stroke-white"
            stroke="white"
            cx={xScale(typeof d[0] === "number" ? d[0] : index)}
            // cx={xScale(d[0])}
            cy={yScale(d[1])}
          />
        ))}
      </svg>
      <Tooltip
        disabled={currentOnHover === null}
        x={xScale(currentIndex ?? 0)}
        y={yScale(currentOnHover?.[1])}
        data={currentOnHover}
        width={width}
        height={height}
      />
    </>
  );
};
