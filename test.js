'use strict';

const { ENTER } = require('inquirer-test');
const dedent = require('dedent');
const fs = require('fs-extra');
const run = require('inquirer-test');

it('requires `title` to be specified', async () => {
  expect.assertions(1);

  const output = await run(
    ['./cli.js'],
    ['./src/pages/blog', ENTER, '', ENTER]
  );

  expect(output).toMatch(/`Title` is required/);
});

it('creates new blog post', async () => {
  expect.assertions(1);

  await run(
    ['./cli.js'],
    ['./src/pages/blog', ENTER, 'At least I tried', ENTER, '2013-08-05', ENTER]
  );
  const content = await fs.readFile(
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
