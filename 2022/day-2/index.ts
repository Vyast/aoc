import { readFileSync } from "fs";
import { join } from "path";

type Label = "Rock" | "Paper" | "Scissors";
type Opponent_Key = "A" | "B" | "C";
type My_Key = "X" | "Y" | "Z";
type Outcome = "loss" | "draw" | "win";

const first_column: Record<Opponent_Key, Label> = {
  A: "Rock",
  B: "Paper",
  C: "Scissors",
};

const second_column: Record<My_Key, Label> = {
  X: "Rock",
  Y: "Paper",
  Z: "Scissors",
};

const scores: Record<Label, 1 | 2 | 3> = {
  Rock: 1,
  Paper: 2,
  Scissors: 3,
};

const outcomes: Record<Outcome, 0 | 3 | 6> = {
  loss: 0,
  draw: 3,
  win: 6,
};

const rigged_match: Record<My_Key, Outcome> = {
  X: "loss",
  Y: "draw",
  Z: "win",
};

const input = readFileSync(join(__dirname, "./input.txt"), "utf-8").split("\n");

const guide = input.map((line) => line.split(" "));

export const parts = {
  1: () => {
    let total_score = 0;

    for (const round of guide) {
      const [opponent, me] = round;

      const opponent_value = first_column[opponent as Opponent_Key];
      const my_value = second_column[me as My_Key];

      let outcome: Outcome = "loss";

      if (opponent_value === "Rock") {
        if (my_value === "Paper") {
          outcome = "win";
        } else if (my_value === "Rock") {
          outcome = "draw";
        }
      } else if (opponent_value === "Paper") {
        if (my_value === "Scissors") {
          outcome = "win";
        } else if (my_value === "Paper") {
          outcome = "draw";
        }
      } else if (opponent_value === "Scissors") {
        if (my_value === "Rock") {
          outcome = "win";
        } else if (my_value === "Scissors") {
          outcome = "draw";
        }
      }

      const match_points = outcomes[outcome];
      const value_points = scores[my_value];

      total_score += match_points + value_points;
    }

    console.log("ANSWER:", total_score);
  },
  2: () => {
    let total_score = 0;

    for (const round of guide) {
      const [opponent, me] = round;

      const my_key = me as My_Key;
      const opponent_key = opponent as Opponent_Key;

      const rigged_outcome = rigged_match[my_key];
      const opponent_value = first_column[opponent_key];

      let my_value: Label = "Paper";

      if (opponent_value === "Rock") {
        if (rigged_outcome === "draw") {
          my_value = "Rock";
        } else if (rigged_outcome === "win") {
          my_value = "Paper";
        } else if (rigged_outcome === "loss") {
          my_value = "Scissors";
        }
      } else if (opponent_value === "Paper") {
        if (rigged_outcome === "draw") {
          my_value = "Paper";
        } else if (rigged_outcome === "win") {
          my_value = "Scissors";
        } else if (rigged_outcome === "loss") {
          my_value = "Rock";
        }
      } else if (opponent_value === "Scissors") {
        if (rigged_outcome === "draw") {
          my_value = "Scissors";
        } else if (rigged_outcome === "win") {
          my_value = "Rock";
        } else if (rigged_outcome === "loss") {
          my_value = "Paper";
        }
      }

      const match_points = outcomes[rigged_outcome];
      const value_points = scores[my_value];

      total_score += match_points + value_points;
    }

    console.log("ANSWER:", total_score);
  },
};
