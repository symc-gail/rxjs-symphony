import { Level } from "../interfaces/level";

export const levelData: Level[] = [
  {
    instructions: `
<p>
  Welcome to Rxjs Symphony, a game where you make music by learning about Rxjs! One of the key concepts in Rxjs is
  the <code>Observable</code>. You can <code>subscribe</code> to an Observable to get notified every time it emits a value.
  You can also <code>pipe</code> an Observable, where you pass in operators that run every time the Observable emits.
</p>
<ul>
  <li><code>click$</code> is an Observable that emits "click" every time you click the stage.</li>
  <li><code>map</code> is an operator that transforms the input. For example: <code>map((input) => input + "!")</code> will
    add an exclamation point to the end of the input.</li>
  <li><code>audience</code> is listening to whatever you change, and will tell you when you've got it right!</li>
</ul>
<p>
  Can you tell the audience "Hello Rxjs!" every time you click?
</p>
    `,
    code: {
      before: "click$.pipe(",
      lines: 1,
      after: ").subscribe(audience)"
    },
    solution: "Hello Rxjs!"
  },
  {
    instructions: `
<p>
  Now, lets have the instruments play some music. Make the woodwinds play a note
  when you click the screen using the <code>mergeMap</code> operator.
</p>
<ul>
  <li><code>mergeMap</code> takes a function with one input that returns an observable. For example, <code>mergeMap((input) => someMethodThatReturnsAnObservable(input))</code></li>
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
