# Dedupe-csv
​
A lightweight module designed to be run from the command line. By default, it takes a csv file, removes duplicate lines, and exports the unique lines to a new CSV. Also included, are optional parameters to check for duplicates across a subset of columns and to switch between keeping the first and last duplicates.
​
`dedupe-csv` is based on pandas' `drop_duplicates` function and has the same functionality.
​
## Quick start
​
To use `dedupe-csv` open the terminal on the folder where the file is located.
​
## Options
​
The `dedupe-csv` command accepts the following options:
​
- `file`: Specifies the input CSV file. Replace `"data.csv"` with the path to your CSV file.
- `column`: (Optional) if ommitted it will look for identical rows. If specified, the header name in the CSV file will be used to identify duplicates. Replace `"header name/s"` with the header/s name you want to use. You can use multiple headers.
- `keep`: (Optional) Specifies the strategy for keeping duplicates. Default value is `"first"`. Available options are:
  - `"first"`: Keep the first occurrence of each duplicate.
  - `"last"`: Keep the last occurrence of each duplicate.
​
​
`dedupe-csv file="data.csv" column="header name" keep="first"`
​
## Install
​
Using npm:
​
```console
$ npm install -g dedupe-csv
```
​
Using yarn:
​
```console
$ yarn global add dedupe-csv
```
​
## Examples
​
#### Remove duplicate lines
​
This will remove any entries that are identical across all headers and keep the first entry found
​
`$ dedupe-csv file="data.csv"`
​
##### data.csv
​
```
brand,style,rating
Yum,cup,1
Yum,cup,1
```
​
Will output the following file:
​
##### data_deduped.csv
```
brand,style,rating
Yum,cup,1
```
​
#### Remove duplicates by column name
​
This will remove any entries that have the same duplicated column
​
`$ dedupe-csv file="data.csv" column="brand"`
​
##### data-column.csv
​
```
brand,style,rating
Yum,cup,1
Yum,pack,2
Foo,cup,1
Foo,pack,2
```
​
Will output the following file:
​
##### data-column_deduped.csv
```
brand,style,rating
Yum,cup,1
Foo,cup,1
```
​
#### Remove duplicates using multiple headers
​
This will remove any entries that match the same duplicated columns. To use it, add columns between quotes and separated by commas.
​
`$ dedupe-csv file="data-multiple.csv" column="brand,style"`
​
##### data-multiple.csv
```
brand,style,rating
Yum,cup,1
Yum,cup,2
Foo,cup,1
Foo,pack,3
Foo,pack,1
```
​
Will output the following file:
​
##### data-multiple_dedupe.csv
​
```
brand,style,rating
Yum,cup,1
Foo,cup,1
Foo,pack,3
```
​
#### Remove duplicates by header and keep last
This will remove any duplicated entries that match by column name and keep the last found
​
To use add the option `keep="last"`
​
`$ dedupe-csv file="data.csv" column="brand" keep="last"`
​
##### data-last.csv
​
```
brand,style,rating
Yum,cup,1
Yum,pack,2
Foo,cup,1
Foo,pack,2
```
​
Will output the following file:
​
##### data-last_deduped.csv
```
brand,style,rating
Yum,pack,2
Foo,pack,2
```