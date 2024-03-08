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
      after: ").subscribe(audience)"
    },
    solution: "woodwinds:toot"
  },
  {
    instructions: `
<p>Now try to make the strings play "twang".</p>
<ul>
  <li><code>strings</code> is the name of the string instruments</li>
  <li><code>play</code> takes a single argument that represents the noise that should be played</li>
</ul>
`,
    code: {
      before: "click$.pipe(",
      lines: 1,
      after: ").subscribe(audience)"
    },
    solution: "strings:twang"
  },
]
