#!/usr/bin/env node

'use strict';

const fs = require('fs');
const meow = require('meow');
const updateNotifier = require('update-notifier');
const intoStream = require('into-stream');
const isStream = require('is-stream');
const muxml = require('muxml').default;

const cli = meow(`
	Usage

		$ muxml-cli '<a id="42"><span>foo</span></a>' --plugins=xmlrpc --no-pretty > example.xml

	Options

		--help
		--strict                use sax strict mode
		--pretty                prettify
		--strip-comments        XML comments
		--strip-cdata           CDATA tags
		--strip-doctype         XML DOCTYPE
		--strip-instruction     XML instruction
		--strip-attributes      strip attributes from tags
		--filter                tag name to filter
		--input                 input file
		--output                output file

	Examples

		$ muxml-cli '<a id="42"><span>foo</span></a>' --no-pretty > output.xml

		$ muxml-cli --file=input.xml --no-pretty > output.xml

		$ echo '<a id="42"><span>foo</span></a>' | muxml-cli --no-pretty > output.xml

`);

updateNotifier({pkg: cli.pkg}).notify();

const input = cli.input;
let inputStream;
let outputStream = process.stdout;

if (cli.flags && cli.flags.output) {
	outputStream = fs.createWriteStream(cli.flags.output);
}

if (cli.flags && cli.flags.input) {
	inputStream = fs.createReadStream(cli.flags.input);
} else if (input.length > 0) {
	inputStream = intoStream(input);
} else if (isStream(process.stdin)) {
	inputStream = process.stdin;
} else {
	process.stderr.write('Please specify some XML. For help, run `muxml-cli --help`.');
	process.exit(1);
}

inputStream.pipe(muxml(cli.flags)).pipe(outputStream);
