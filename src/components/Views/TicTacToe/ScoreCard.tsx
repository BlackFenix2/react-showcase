import * as React from "react";
import {
  Card,
  CardContent,
  Button,
  ListItem,
  List,
  Fade,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

interface Props {
  clearScore: () => void;
  scoreClicked?: (boxOrder: number[]) => void;
  stats: ScoreStat[];
}

interface ScoreStat {
  winner: string;
  totalMoves: number;
  boxOrder: number[];
}

const ScoreCard: React.FC<Props> = (props) => {
  const [active, setActive] = React.useState("");

  const filterList = (stats: ScoreStat[], content: string): ScoreStat[] => {
    if (content === "Draws") {
      return stats.filter((x) => x.winner === "draw");
    }
    if (content === "X Wins") {
      return stats.filter((x) => x.winner === "X");
    }
    if (content === "O Wins") {
      return stats.filter((x) => x.winner === "O");
    }
    return stats;
  };

  const activeChange = (_event: React.MouseEvent<HTMLElement>, content: string | null) => {
    if (!content || content === active) {
      setActive("");
    } else {
      setActive(content);
    }
  };
  return (
    <Card>
      <CardContent>
        <h2>Score Card</h2>
        <Button color="secondary" onClick={props.clearScore}>
          Clear Score
        </Button>

        <ToggleButtonGroup exclusive size="large" value={active} onChange={activeChange}>
          <ToggleButton value="Draws">{`Draws  ${props.stats.filter((x) => x.winner === "draw").length}`}</ToggleButton>
          <ToggleButton value="X Wins">{`X Wins  ${props.stats.filter((x) => x.winner === "X").length}`}</ToggleButton>
          <ToggleButton value="O Wins">{`O Wins  ${props.stats.filter((x) => x.winner === "O").length}`}</ToggleButton>
        </ToggleButtonGroup>
      </CardContent>

      <CardContent>
        {filterList(props.stats, active).map((value, index) => (
          <ScoreCardItem key={index} {...value} gameNumber={index + 1} scoreClicked={props.scoreClicked} />
        ))}

        <Button onClick={props.clearScore}>Clear Score</Button>
      </CardContent>
    </Card>
  );
};

interface ScoreCardItemProps extends ScoreStat {
  gameNumber: number;
  scoreClicked?: (boxOrder: number[]) => void;
}

const ScoreCardItem: React.FC<ScoreCardItemProps> = (props) => (
  <Fade in>
    <List>
      <ListItem>
        Game:
        {props.gameNumber}
      </ListItem>
      <ListItem>
        Total Moves:
        {props.totalMoves}
      </ListItem>
      <ListItem>
        Board Order:
        {props.boxOrder}
      </ListItem>
      <ListItem>
        Winner:
        {props.winner}
      </ListItem>
      {props.scoreClicked && <Button onClick={() => props.scoreClicked?.(props.boxOrder)}>board</Button>}
      <Divider />
    </List>
  </Fade>
);

export default ScoreCard;
