/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
process.env["FORCE_COLOR"] = "0";
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
};
