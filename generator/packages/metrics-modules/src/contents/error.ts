import { container, text } from "@takumi-rs/helpers";
import { errorForeground, p } from "@/styles";

interface ErrorTextProps {
  textContent?: string;
}

export default function ErrorText({ textContent }: ErrorTextProps = {}) {
  const defaultText = "Unable to fetch data at the moment.";

  return container({
    children: [
      text(textContent ?? defaultText, {
        ...p,
        ...errorForeground,
      }),
    ],
  });
}
