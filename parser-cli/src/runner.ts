/*
 * Copyright 2022-2023 VMware, Inc.
 * SPDX-License-Identifier: MIT
 */

import fsPromise from "fs/promises";
import { program } from "commander";
import { parse } from "csv-parse";
import { parseCsv } from "parser";

const writeJsonFromCsv = async (
  inFile: string,
  outFile: string,
  sanitize: boolean
) => {
  const csv = await fsPromise.readFile(inFile).then((f) => parsePromise(f));

  const transformedData = parseCsv(csv, sanitize);
  let data = JSON.stringify(transformedData, null, 2);
  await fsPromise.writeFile(outFile, data);
};

const options = program
  .requiredOption("-f, --file <f>", "CSV file to parse")
  .option("-o, --output <o>", "JSON file to output")
  .option("-s, --sanitize", "Sanitize output to mask private information")
  .parse(process.argv)
  .opts();

const parsePromise = (buffer: Buffer) =>
  new Promise<string[][]>((resolve) => {
    parse(buffer, { delimiter: "," }, function (err, rows) {
      resolve(rows);
    });
  });

writeJsonFromCsv(
  options.file,
  options.output || "employees.json",
  options.sanitize
).catch(console.error);
