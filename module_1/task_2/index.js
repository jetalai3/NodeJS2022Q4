import fs from "fs";
import path from "path";
import csvToJson from "csvtojson";
import parseLine from "./util";

const csvFilePath = path.resolve(__dirname, "csv/mock.csv");
const outputPath = path.resolve(__dirname, "temp/result.txt");

Promise.all([
  fs.promises.mkdir(path.dirname(csvFilePath), { recursive: true }),
  fs.promises.mkdir(path.dirname(outputPath), { recursive: true }),
]).then(() => 
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
        resolve(writeStream.write(JSON.stringify(parsedLine) + "\n"));
      });
    },
    (err) => {
      console.error("error: " + err);
    }
  )
)
