import { ReverseInput } from "./ReverseInput";

process.stdin.pipe(new ReverseInput()).pipe(process.stdout);
