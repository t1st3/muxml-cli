# muxml-cli [![Build Status Travis](https://travis-ci.org/t1st3/muxml-cli.svg?branch=master)](https://travis-ci.org/t1st3/muxml-cli) [![Coverage Status](https://coveralls.io/repos/github/t1st3/muxml-cli/badge.svg?branch=master)](https://coveralls.io/github/t1st3/muxml-cli?branch=master)

> Streaming XML parser and formatter


## Install

```
$ npm install --save muxml-cli
```

## CLI

```
$ muxml-cli --help

  Usage
    muxml-cli [input]

  Options
    --help
    --strict                use sax strict mode
    --pretty                prettify
    --strip-comments        strip XML comments
    --strip-cdata           strip CDATA tags
    --strip-doctype         strip XML DOCTYPE
    --strip-instruction     strip XML instruction
    --strip-attributes      strip attributes from tags
    --filter                tag name to filter
    --input                 input file
    --output                output file

  Examples
    $ muxml-cli
    unicorns & rainbows
    $ muxml-cli ponies
    ponies & rainbows
```

## Relevant

* [API for this module](https://github.com/t1st3/muxml)


## License

MIT © [t1st3](http://tiste.org)
