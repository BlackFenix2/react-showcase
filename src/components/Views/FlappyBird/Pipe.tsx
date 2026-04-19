import * as React from "react";
import { Image as KonvaImage } from "react-konva";
import useImage from "use-image";

interface Props {
  x: number;
  y: number;
  width: number;
  height: number;
  rotate?: boolean;
  debug?: boolean;
}

const Pipe: React.FC<Props> = (props) => {
  const [image] = useImage(
    props.rotate
      ? "https://raw.githubusercontent.com/olivajames110/jimmyoliva/master/pages/projects/flappy_bird/images/pipeSouth.png"
      : "https://raw.githubusercontent.com/olivajames110/jimmyoliva/master/pages/projects/flappy_bird/images/pipeNorth.png",
  );

  return (
    <KonvaImage
      x={props.x}
      y={props.y}
      width={props.width}
      height={props.height}
      image={image}
      stroke={props.debug ? "Red" : ""}
    />
  );
};

export default Pipe;
