# Dedupe-csv

A lightweight module designed to be run from the command line, it takes a csv file and removes duplicate entries by default when detecting identical lines and with optional parameters to select a particular header, it also has the option to select the first and last duplicates detected to be kept.

`dedupe-csv` it's based on pandas' `drop_duplicates` function and follows the same functionality.

## Quick start
<br />

To use `dedupe-csv` the terminal needs point to the folder where the `csv` is.

Use node argv to first indicate file to read and then the header to target for duplication, optionally you can specify whether the first duplicates of the last one are to be kept.

`dedupe-csv ['file.csv'] ['header'] ['first' | 'last']`

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

`$ dedupe-csv 'data.csv'`

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

`$ dedupe-csv 'data.csv' 'brand'`

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

`$ dedupe-csv 'data.csv' 'brand' 'last'`

##### data_deduped.csv
```
brand,style,rating
Yum,pack,2
Foo,pack,2
```

