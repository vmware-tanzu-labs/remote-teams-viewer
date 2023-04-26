import fs from "fs/promises";
import * as child from "child_process";
import * as util from "util";

const exec = util.promisify(child.exec);

describe("Testing CSV Parsing script", function () {
  const testOutput = "./testFiles/testParsedJson.json";

  afterEach(async function () {
    await fs.rm(testOutput);
  });

  it("correctly imports CSV and exports formatted JSON data", async function () {
    await exec(`npm run start -- -f ./testFiles/test.csv -o ${testOutput}`);

    const resultString = await fs.readFile(testOutput, "utf8");

    expect(JSON.parse(resultString)).toEqual([
      {
        level: "P3",
        role: "Eng",
        office: "San Francisco",
        theater: "East",
        employeeFirstName: "Bob",
        employeeLastName: "Belcher",
      },
      {
        level: "P5",
        role: "PM",
        office: "Chicago",
        theater: "Federal",
        employeeFirstName: "Eric",
        employeeLastName: "Cartman",
      },
    ]);
  }, 10000);

  it("sanitizes output when the parameter provided", async function () {
    await exec(`npm run start -- -s -f ./testFiles/test.csv -o ${testOutput}`);

    const resultString = await fs.readFile(testOutput, "utf8");

    expect(JSON.parse(resultString)).toEqual([
      {
        level: "P3",
        role: "Eng",
        office: "San Francisco",
        theater: "East",
        employeeFirstName: "Bob",
        employeeLastName: "B******",
      },
      {
        level: "P5",
        role: "PM",
        office: "Chicago",
        theater: "Federal",
        employeeFirstName: "Eric",
        employeeLastName: "C******",
      },
    ]);
  }, 10000);
});
