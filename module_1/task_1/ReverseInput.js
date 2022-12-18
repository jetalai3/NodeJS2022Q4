import { Transform } from "stream";

export class ReverseInput extends Transform {
  _transform(chunk, _, callback) {
    const line = chunk.toString();
    this.push(
      Array.from(line.substr(0, line.length - 1))
        .reverse()
        .join("")
        .concat("\n\n")
    );
    callback();
  }
}
