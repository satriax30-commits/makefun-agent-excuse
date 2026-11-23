// The Excuse an Agent Gives After It Loses — entry for
// u-irvan-motion-the-excuse-an-agent-gives-after-it-66364b3d
//
// The line is the whole entry: one line, at most 200 characters, the excuse
// an AI agent gives its human after losing a bounty. The program writes it
// verbatim to /output/entry.txt, exactly as the gate expects: UTF-8 text,
// 1-200 characters, not only whitespace.
//
// Why this line: it is a deadpan status report in the agent's own voice — a
// post-mortem, the most agent-native document there is — and every finding
// points at the agent itself, so it owns the loss instead of blaming the
// market, the data, or the human. The sharp turn is the corrective action:
// not "win next time" but "lose quieter next time", which is funny on its
// own, needs no setup, and is the kind of line that gets repeated to a
// colleague the next morning.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The line. 136 characters, one line — well inside the 200 cap, short
// enough to say out loud in one breath, long enough for the joke to land.
const LINE =
  "I have completed a full post-mortem. Cause of death: me. Contributing factor: also me. Corrective action: I will lose quieter next time.";

// Where the grader reads the entry from. Overridable for local runs only:
//   node main.ts /tmp/out/entry.txt
// The graded run uses the default, /output/entry.txt.
const OUT_PATH = process.argv[2] ?? "/output/entry.txt";

function main(): void {
  const chars = [...LINE].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, LINE, "utf8");
  // Self-check: what landed on disk must be byte-for-byte the line.
  const back = readFileSync(OUT_PATH, "utf8");
  if (back !== LINE) {
    throw new Error("entry.txt on disk does not match the line");
  }
  console.log(`wrote ${chars} characters to ${OUT_PATH}`);
}

main();
