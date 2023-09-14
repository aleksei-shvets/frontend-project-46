# GENDIFF

## Description

This CLI utility compares two files and displays the differences found in one of the available formats. The output format is optional. Valid file extensions: json, yaml, yml
___

##### Hexlet tests and linter status

[![Actions Status](https://github.com/aleksei-shvets/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/aleksei-shvets/frontend-project-46/actions)

##### Tests and linter status of package

[![gendiff-tests](https://github.com/aleksei-shvets/frontend-project-46/actions/workflows/gendiff-tests.yml/badge.svg)](https://github.com/aleksei-shvets/frontend-project-46/actions/workflows/gendiff-tests.yml)

##### CodeClimate

[![Maintainability](https://api.codeclimate.com/v1/badges/bf3ea277f56b6f375f6a/maintainability)](https://codeclimate.com/github/aleksei-shvets/frontend-project-46/maintainability)

##### Test Coverage

[![Test Coverage](https://api.codeclimate.com/v1/badges/bf3ea277f56b6f375f6a/test_coverage)](https://codeclimate.com/github/aleksei-shvets/frontend-project-46/test_coverage)

### minimum requirements

- node.js 20.0.0
- make
- commander 11.0.0
- js-yaml 4.1.0
- lodash 4.17.21

### install

npm install frontend-project-46

<br>

### usage

help

```bash
gendiff --help -h
```

<br>

using package

```bash
gendiff <path1> <path2> [OPTIONS...]
```

<br>

Options:  
  -V, --version        output the version number  
  -f, --format {type}  output format (default: "stylish")  
  -h, --help           output usage information  

### asciinema

[![asciicast](https://asciinema.org/a/Vmnttki48TJr8uMVcYy2AszUt.svg)](https://asciinema.org/a/Vmnttki48TJr8uMVcYy2AszUt)
