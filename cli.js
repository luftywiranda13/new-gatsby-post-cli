#!/usr/bin/env node
'use strict';

const { normalize } = require('path');
const { error, success } = require('log-symbols');
const { green, red } = require('chalk');
const dateFormat = require('dateformat');
const inquirer = require('inquirer');
const newGatsbyPost = require('new-gatsby-post');

// eslint-disable-next-line prefer-destructuring
const argv = require('yargs')
  .usage('Usage: $0 [options]')
  .alias('l', 'location')
  .nargs('l', 1)
  .describe('l', 'New post location')
  .help('h')
  .alias('h', 'help').argv;

const prompt = [
  {
    type: 'input',
    name: 'title',
    message: 'Title:',
    validate: x => (x.length > 0 ? true : '`Title` is required'),
  },
  {
    type: 'input',
    name: 'date',
    message: 'Date (yyyy-mm-dd):',
    default: dateFormat(Date.now(), 'isoDate'),
  },
];

if (!argv.location) {
  prompt.unshift({
    type: 'input',
    name: 'location',
    message: 'Location:',
    default: normalize('./src/pages/blog'),
  });
}

inquirer
  .prompt(prompt)
  .then(answers =>
    newGatsbyPost(answers.title, {
      location: argv.location || answers.location,
      date: answers.date,
    })
  )
  .then(path => {
    console.log();
    console.log(success, green('Created:'));
    console.log(path);
  })
  .catch(err => {
    console.log();
    console.log(error, red(err));
  });
