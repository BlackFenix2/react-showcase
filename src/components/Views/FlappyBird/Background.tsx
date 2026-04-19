import * as React from "react";
import { Image as KonvaImage } from "react-konva";
import useImage from "use-image";

interface Props {
  width: number;
  height: number;
}

const Background: React.FC<Props> = (props) => {
  const [image] = useImage(
    "https://raw.githubusercontent.com/olivajames110/jimmyoliva/master/pages/projects/flappy_bird/images/bg.png",
  );
  return <KonvaImage width={props.width} height={props.height} image={image} />;
};

export default Background;
