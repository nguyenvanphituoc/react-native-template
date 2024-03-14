import fs from 'fs-extra';
//
const coverageSummary = JSON.parse(
  fs.readFileSync('coverage/coverage-summary.json', 'utf8'),
);
const {lines, statements, functions, branches} = coverageSummary.total;

const averageCoverage =
  (lines.pct + statements.pct + functions.pct + branches.pct) / 4;

console.log(`Average coverage: ${averageCoverage}%`);
