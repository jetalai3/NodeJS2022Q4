const { ReverseInput } = require("./ReverseInput");

process.stdin.pipe(new ReverseInput()).pipe(process.stdout);