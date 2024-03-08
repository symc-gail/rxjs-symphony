export interface Level {
  instructions: string;
  code: {
    before: string;
    lines: number;
    after: string;
  },
  solution: string;
}

export interface LevelStatus {
  completed: boolean;
  code: string;
}
