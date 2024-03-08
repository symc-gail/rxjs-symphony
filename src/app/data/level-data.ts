import { Level } from "../interfaces/level";

export const levelData: Level[] = [
  {
    instructions: `
<p>
  Welcome to Rxjs Symphony, a game where you make music by learning about Rxjs! Make the woodwinds play a note
  when you click the screen using the <code>mergeMap</code> operator.
</p>
<ul>
  <li><code>mergeMap</code> takes a function with one input that returns an observable</li>
  <li><code>woodwinds</code> has a method <code>play</code> that, when called, returns an observable and plays a note</li>
</ul>
    `,
    code: {
      before: "click$.pipe(",
      lines: 1,
      after: ").subscribe()"
    },
    solution: "mergeMap(_ => woodwinds.play())"
  },
  {
    instructions: `This is level 2`,
    code: {
      before: "foo",
      lines: 3,
      after: "bar"
    },
    solution: "lalala"
  },
  {
    instructions: `This is level 3`,
    code: {
      before: "foo",
      lines: 3,
      after: "bar"
    },
    solution: "lalala"
  },
  {
    instructions: `This is level 4`,
    code: {
      before: "foo",
      lines: 3,
      after: "bar"
    },
    solution: "lalala"
  },
]
