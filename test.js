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
