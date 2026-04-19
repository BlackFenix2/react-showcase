import { observer } from "mobx-react-lite";
import * as React from "react";
import { Layer, Stage } from "react-konva";
import birdStore from "@/state/stores/games/birdStore";
import Background from "./Background";
import Bird from "./Bird";
import PipeList from "./PipeList";

interface Props {
  height: number;
  width: number;
  debug?: boolean;
}

const KonvaStage = Stage as unknown as React.ComponentType<React.PropsWithChildren<Props>>;

const Board = observer((props: Props) => {
  const BirdStore = React.useContext(birdStore);

  return (
    <KonvaStage width={props.width} height={props.height}>
      <Layer>
        <Background width={props.width} height={props.height} />

        <Bird x={BirdStore.Bird.x} y={BirdStore.Bird.y} rotation={BirdStore.Bird.rotation} debug={props.debug} />

        <PipeList list={BirdStore.PipeList} debug={props.debug} />
      </Layer>
    </KonvaStage>
  );
});

export default Board;
