# Tide To Crunch CSV Converter

A CLI tool for converting a Tide CSV to the Crunch format

## Installation

Run `npm link` from inside the directory.

## Usage

```
Options:
  -V, --version        output the version number
  -i, --input <type>   The CSV from the Tide App
  -r, --rows [type]    Rows to keep
  -o, --output [type]  Name of the outputted file [marble] (default: "output.csv")
  -h, --help           output usage information
```

### Convert a file

```sh
crunchtime index.js -i tide.csv -r 2 -o crunch.csv
```
