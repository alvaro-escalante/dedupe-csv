# Dedupe-csv

A lightweight module designed to be run from the command line, it takes a csv file and removes duplicate entries by default when detecting identical lines and with optional parameters to select a particular header, it also has the option to select the first and last duplicates detected to be kept.

`dedupe-csv` it's based on pandas' `drop_duplicates` function and follows the same functionality.

## Quick start
<br />

Use node argv to first indicate the column to target for duplication and then the file to read

`dedupe-csv ['file.csv'] ['header']  ['first']`

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

To use given the default settings to test complete line duplicates

##### data.csv

```
brand,style,rating
Yum,cup,1
Yum,cup,1
```

`$ dedupe-csv 'data.csv'`

Will result in the following file being outputed

##### data_deduped.csv
```
brand,style,rating
Yum,cup,1
```

To remove duplicated by header

##### data.csv

```
brand,style,rating
Yum,cup,1
Yum,pack,2
Foo,cup,1
Foo,pack,2
```

`$ dedupe-csv 'data.csv' 'brand'`

##### data_deduped.csv
```
brand,style,rating
Yum,cup,1
Foo,cup,1
```

To remove duplicated by header but keep last 

##### data.csv

```
brand,style,rating
Yum,cup,1
Yum,pack,2
Foo,cup,1
Foo,pack,2
```

`$ dedupe-csv 'data.csv' 'brand' 'last'`

##### data_deduped.csv
```
brand,style,rating
Yum,pack,2
Foo,pack,2
```

