import * as React from "react";

import { Group } from "react-konva";
import PipeModel from "@/state/objects/pipe";
import Pipe from "./Pipe";

interface PipeColumn {
  NorthPipe: PipeModel;
  SouthPipe: PipeModel;
}

interface Props {
  list: PipeColumn[];
  debug?: boolean;
}

const PipeList: React.FC<Props> = (props) =>
  props.list.map((pipeColumn, index) => (
    <Group key={index}>
      <Pipe
        x={pipeColumn.NorthPipe.x}
        y={pipeColumn.NorthPipe.y}
        width={pipeColumn.NorthPipe.width}
        height={pipeColumn.NorthPipe.height}
        debug={props.debug}
      />
      <Pipe
        rotate
        x={pipeColumn.SouthPipe.x}
        y={pipeColumn.SouthPipe.y}
        width={pipeColumn.SouthPipe.width}
        height={pipeColumn.SouthPipe.height}
        debug={props.debug}
      />
    </Group>
  ));

export default PipeList;
