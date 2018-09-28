import fs from 'fs';
import test from 'ava';
import execa from 'execa';
import rimraf from 'rimraf';

const fixture = [
	'<a>',
	'  <b>',
	'    c',
	'  </b>',
	'</a>'
].join('\n');

const commentFixture = [
	'<a><!-- foo --><b>c</b></a>'
].join('\n');

const cdataFixture = '<a><![CDATA[ my-cdata ]]><b>c</b></a>';

const doctypeFixture = '<!DOCTYPE HTML "-//W3C//DTD..."><a><b>c</b></a>';

const instructionFixture = '<?xml foo="blerg" ?><a><b>c</b></a>';

const noAttrFixture = '<a><b>c</b></a>';

const filterFixture = '<b>c</b>';

const fileFixture = '<c><b>a</b></c>';

test('main', async t => {
	t.is((await execa('./cli.js', ['<a><b>c</b></a>'])).stdout, fixture);
});

test('stdin', async t => {
	t.is((await execa.shell('echo "<a><b>c</b></a>" | ./cli.js')).stdout, fixture);
});

test('cdata', async t => {
	t.is((await execa('./cli.js', [
		'<a><![CDATA[ my-cdata ]]><b>c</b></a>',
		'--no-strip-cdata',
		'--no-pretty'
	])).stdout, cdataFixture);
});

test('comment', async t => {
	t.is((await execa('./cli.js', [
		'<a><!-- foo --><b>c</b></a>',
		'--no-strip-comments ',
		'--no-pretty'
	])).stdout, commentFixture);
});

test('doctype', async t => {
	t.is((await execa('./cli.js', [
		'<!DOCTYPE HTML "-//W3C//DTD..."><a><b>c</b></a>',
		'--no-strip-doctype ',
		'--no-pretty'
	])).stdout, doctypeFixture);
});

test('attr', async t => {
	t.is((await execa('./cli.js', [
		'<a id="foo"><b>c</b></a>',
		'--strip-attributes ',
		'--no-pretty'
	])).stdout, noAttrFixture);
});

test('instruction', async t => {
	t.is((await execa('./cli.js', [
		'<?xml foo="blerg" ?><a><b>c</b></a>',
		'--no-strip-instruction ',
		'--no-pretty'
	])).stdout, instructionFixture);
});

test('filter', async t => {
	t.is((await execa('./cli.js', [
		'<a><b>c</b></a>',
		'--tagFilter=b',
		'--no-pretty'
	])).stdout, filterFixture);
});

test('input', async t => {
	t.is((await execa('./cli.js', [
		'--input=fixture.xml',
		'--no-pretty'
	])).stdout, fileFixture);
});

test('output', async t => {
	await execa('./cli.js', [
		'<c><![CDATA[ my-cdata ]]><b>a</b></c>',
		'--output=tmp.xml',
		'--no-pretty'
	]).then(() => {
		t.is(fileFixture, fs.readFileSync('tmp.xml').toString());
	}).then(() => {
		rimraf('tmp.xml', () => {});
	});
});
