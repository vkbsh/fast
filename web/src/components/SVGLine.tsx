import { Side } from "lib/game";

type Props = {
  sides: Side[];
  stroke?: string;
  strokeWidth?: number;
};

export default function SVGLine({
  sides,
  stroke = "#000",
  strokeWidth = 3,
}: Props) {
  if (!sides?.length) return null;

  return (
    <div className="relative w-full h-full">
      <svg className="absolute top-0 left-0 w-full h-full">
        {sides.map((side) => {
          const [x1, y1, x2, y2] = getLineCoords(side);

          return (
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              key={side}
              style={{ stroke, strokeWidth }}
            />
          );
        })}
      </svg>
    </div>
  );
}

const getLineCoords = (side: Side): string[] => {
  switch (side) {
    case "left":
      return ["50%", "50%", "0%", "50%"];
    case "top":
      return ["50%", "50%", "50%", "0%"];
    case "right":
      return ["50%", "50%", "100%", "50%"];
    case "bottom":
      return ["50%", "50%", "50%", "100%"];
    default:
      return ["50%", "50%", "50%", "50%"];
  }
};
