import * as React from "react";
import { Image as KonvaImage } from "react-konva";

import useImage from "use-image";

interface Props {
  x: number;
  y: number;
  rotation: number;
  debug?: boolean;
}

const Bird: React.FC<Props> = (props) => {
  const [image] = useImage(
    "https://raw.githubusercontent.com/olivajames110/jimmyoliva/master/pages/projects/flappy_bird/images/bird.png",
  );
  return (
    <KonvaImage
      x={props.x}
      y={props.y}
      width={40}
      height={30}
      image={image}
      rotation={props.rotation * -10}
      stroke={props.debug ? "Red" : ""}
    />
  );
};

export default Bird;
