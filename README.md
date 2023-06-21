# Dedupe-csv

A lightweight module designed to be run from the command line, it takes a csv file and removes duplicate entries by default when detecting identicle lines and with optional parameters to select a particular header, it also has the option to select the first and last duplicates detected.

`dedupe-csv` it's based on pandas' `drop_duplicates` function and follow the same functionality.

## Quick start
<br />

Use node argv to first indicate the column to target for duplication and then the file to read

`dedupe-csv ['column'] ['file.csv'] ['first']`

## Install

Using npm:

```console
$ npm install dedupe-csv
```

Using yarn:

```console
$ yarn add dedupe-csv
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

