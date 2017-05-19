# muxml-cli [![Build Status Travis](https://travis-ci.org/t1st3/muxml-cli.svg?branch=master)](https://travis-ci.org/t1st3/muxml-cli) [![Coverage Status](https://coveralls.io/repos/github/t1st3/muxml-cli/badge.svg?branch=master)](https://coveralls.io/github/t1st3/muxml-cli?branch=master)

[![Greenkeeper badge](https://badges.greenkeeper.io/t1st3/muxml-cli.svg)](https://greenkeeper.io/)

> Streaming XML parser and formatter

Thin wrapper around [`muxml`](https://github.com/t1st3/muxml) to make it a [CLI](https://en.wikipedia.org/wiki/Command-line_interface) app.

Also available as a [gulp](https://github.com/t1st3/gulp-muxml) / [Grunt](https://github.com/t1st3/grunt-muxml) plugin.


## Install

```
$ npm install --save muxml-cli
```


## CLI

```console
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
    $ muxml-cli '<a id="42"><span>foo</span></a>' --no-pretty > output.xml
    
    $ muxml-cli --input=input.xml --no-pretty --output=output.xml

    $ echo '<a id="42"><span>foo</span></a>' | muxml-cli --no-pretty > output.xml
```

## Related

* [muxml](https://github.com/t1st3/muxml) | API for this module
* [gulp-muxml](https://github.com/t1st3/gulp-muxml) | this module as a [`gulp`](http://gulpjs.com/) plugin
* [grunt-muxml](https://github.com/t1st3/grunt-muxml) | this module as a [`Grunt`](http://gruntjs.com/) plugin


## License

MIT © [t1st3](http://tiste.org)
