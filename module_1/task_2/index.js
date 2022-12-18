const path = require("path");
const fs = require("fs");
const csvToJson = require("csvtojson");
const { parseLine } = require("./util");

const csvFilePath = path.resolve(__dirname, "csv/mock.csv");
const outputPath = path.resolve(__dirname, "temp/result.txt");

csvToJson()
  .fromFile(csvFilePath)
  .subscribe(
    (line) => {
      return new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(outputPath, { flags: "a" });

        writeStream.on("error", (err) => {
          console.log("error: " + err);
          reject();
        });

        const parsedLine = parseLine(line);
        resolve(writeStream.write(JSON.stringify(parsedLine) + '\n'));
      });
    },
    (err) => {
      console.error("error: " + err);
    }
  );