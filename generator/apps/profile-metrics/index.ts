import { render } from "./render";
import { parseArgs } from "util";

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    output: {
      type: "string",
    },
  },
  strict: true,
  allowPositionals: true,
});
const { output } = values;

await render(output);
