# GENDIFF

This CLI utility compares two files and displays the differences found in one of the available formats. The output format is optional. Valid file extensions: json, yaml, yml
___

Hexlet tests | Tests and linter | CodeClimate | Test Coverage
:-----: | :----: | :----:  | :----:
[![hexlet-check](https://github.com/aleksei-shvets/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/aleksei-shvets/frontend-project-46/actions/workflows/hexlet-check.yml)   | [![gendiff-tests](https://github.com/aleksei-shvets/frontend-project-46/actions/workflows/gendiff-tests.yml/badge.svg)](https://github.com/aleksei-shvets/frontend-project-46/actions/workflows/gendiff-tests.yml) | [![Maintainability](https://api.codeclimate.com/v1/badges/bf3ea277f56b6f375f6a/maintainability)](https://codeclimate.com/github/aleksei-shvets/frontend-project-46/maintainability)  | [![Test Coverage](https://api.codeclimate.com/v1/badges/bf3ea277f56b6f375f6a/test_coverage)](https://codeclimate.com/github/aleksei-shvets/frontend-project-46/test_coverage)

## minimum requirements

- node.js 20.0.0
- make
- commander 11.0.0
- js-yaml 4.1.0
- lodash 4.17.21

### install

```bash
npm install frontend-project-46
```

### usage

#### help

```bash
gendiff --help -h
```

#### run package

```bash
gendiff <path1> <path2> [OPTIONS...]
```

Options:  
  -f, --format {type}  output format (default: "stylish")  

### How it works

[![asciicast](https://asciinema.org/a/SYKClUcxJnYEOuiukbW1df3l7.svg)](https://asciinema.org/a/SYKClUcxJnYEOuiukbW1df3l7)
