# Dedupe-csv

A lightweight module designed to be run from the command line, it takes a csv file and removes duplicate entries by default when detecting identical lines and with optional parameters to select a particular header, it also has the option to select the first and last duplicates detected to be kept.

`dedupe-csv` it's based on pandas' `drop_duplicates` function and follows the same functionality.

## Quick start


To use `dedupe-csv` open the terminal on the folder where the file is at

## Options

The `dedupe-csv` command accepts the following options:

- `file`: Specifies the input CSV file. Replace `"data.csv"` with the path to your CSV file.
- `column`: (Optional) if ommited it will look for identical rows. If specified the header name in the CSV file wil be used to identify duplicates. Replace `"header name"` with the actual header name you want to use.
- `keep`: (Optional) Specifies the strategy for keeping duplicates. Default value is `"first"`. Available options are:
  - `"first"`: Keep the first occurrence of each duplicate.
  - `"last"`: Keep the last occurrence of each duplicate.


`dedupe-csv file="data.csv" column="header name" keep="first"`

## Install

Using npm:

```console
$ npm install -g dedupe-csv
```

Using yarn:

```console
$ yarn global add dedupe-csv
```

## Examples

Default settings will remove duplicated lines, needs only file name

##### data.csv

```
brand,style,rating
Yum,cup,1
Yum,cup,1
```

`$ dedupe-csv file="data.csv"`

Will output the following file

##### data_deduped.csv
```
brand,style,rating
Yum,cup,1
```

To remove duplicates by header use the name of the header after the file name

##### data.csv

```
brand,style,rating
Yum,cup,1
Yum,pack,2
Foo,cup,1
Foo,pack,2
```

`$ dedupe-csv file="data.csv" column="brand"`

##### data_deduped.csv
```
brand,style,rating
Yum,cup,1
Foo,cup,1
```

To remove duplicates by header and keep last duplicate found, use the 'last' after the header

##### data.csv

```
brand,style,rating
Yum,cup,1
Yum,pack,2
Foo,cup,1
Foo,pack,2
```

`$ dedupe-csv file="data.csv" column="brand" keep="last"`

##### data_deduped.csv
```
brand,style,rating
Yum,pack,2
Foo,pack,2
```

