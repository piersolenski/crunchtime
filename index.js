const fs = require('fs');
const removeEmptyLines = require('remove-blank-lines');
const papaparse = require('papaparse');
const dateFns = require('date-fns');
const program = require('commander');
const pjson = require('./package.json');
const path = require('path');

program
  .version(pjson.version)
  .option('-i, --input <type>', 'The CSV from the Tide App')
  .option('-r, --rows [type]', 'Rows to keep')
  .option('-o, --output [type]', 'Name of the outputted file [marble]', 'output.csv')
  .parse(process.argv);

const FORMAT = 'DD/MM/YYYY';

const currentPath = process.cwd();

const convertDate = (date, format) => dateFns.format(dateFns.parse(date), format);

const keepRows = (arr, n) => arr.splice(0, n);

const convertToJSON = csv => papaparse.parse(removeEmptyLines(csv), { header: true, });

const convertToCSV = json => papaparse.unparse(json);

const crunchify = arr => arr.map(row => ({
  Date: convertDate(row['Timestamp'], FORMAT),
  Reference: row['Reference'],
  Amount: row['Amount'],
  Balance: row['Cleared balance'],
}));

const init = input => fs.readFile(input, 'utf8', (err, data) => {
  if (err) return console.log('File does not exist!');
  const rows = convertToJSON(data).data;
  const crunchifiedJSON = keepRows(crunchify(rows), program.rows || rows.length);
  const csv = convertToCSV(crunchifiedJSON);
  const dir = path.dirname(input);

  fs.writeFile(`${dir}/${program.output}`, csv, 'utf8', (err, msg) => {
    if (err) return console.log(err);
    console.log(`File written to ${program.output}`);
  });
});

init(program.input);