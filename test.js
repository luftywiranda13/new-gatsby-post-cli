'use strict';

const { ENTER } = require('inquirer-test');
const { readFile } = require('fs-extra');
const dedent = require('dedent');
const run = require('inquirer-test');

it('creates new blog post', async () => {
  expect.assertions(1);

  await run(
    ['./cli.js'],
    ['./src/pages/blog', ENTER, 'At least I tried', ENTER, '2013-08-05', ENTER]
  );
  const content = await readFile(
    './src/pages/blog/2013-08-05-at-least-i-tried/index.md',
    'utf8'
  );

  expect(content).toBe(dedent`
    ---
    date: "2013-08-05"
    title: "At Least I Tried"
    ---\n
  `);
});

it('creates new blog post with --location parameter', async () => {
  expect.assertions(1);

  await run(
    ['./cli.js', '--location', './src/pages/blog'],
    ['I did not try', ENTER, '2013-08-06', ENTER]
  );
  const content = await readFile(
    './src/pages/blog/2013-08-06-i-did-not-try/index.md',
    'utf8'
  );

  expect(content).toBe(dedent`
    ---
    date: "2013-08-06"
    title: "I did not try"
    ---\n
  `);
});

it('creates new blog post with -l parameter', async () => {
  expect.assertions(1);

  await run(
    ['./cli.js', '-l', './src/pages/blog'],
    ['I gave up', ENTER, '2013-08-07', ENTER]
  );
  const content = await readFile(
    './src/pages/blog/2013-08-07-i-gave-up/index.md',
    'utf8'
  );

  expect(content).toBe(dedent`
    ---
    date: "2013-08-07"
    title: "I gave up"
    ---\n
  `);
});
