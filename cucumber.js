process.env["FORCE_COLOR"] = "0";
process.env["COLOR"] = "0";
let common = [
  "src/features/**/*.feature", // Specify our feature files
  "--require-module ts-node/register", // Load TypeScript module
  "--require src/step-definitions/**/*.ts", // Load step definitions
  "--format progress-bar", // Load custom formatter
  "--format html:reports/cucumber-report.html", // html report
  "--format json:reports/cucumber-report.json", // json report
].join(" ");

module.exports = {
  default: common,
};
