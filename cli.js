#!/usr/bin/env node
'use strict';

const chalk = require('chalk');
const dateFormat = require('dateformat');
const inquirer = require('inquirer');
const logSymbols = require('log-symbols');

const newGatsbyPost = require('new-gatsby-post');

inquirer
  .prompt([
    {
      type: 'input',
      name: 'location',
      message: 'Location:',
      default: './src/pages/blog',
    },
    {
      type: 'input',
      name: 'title',
      message: 'Title:',
    },
    {
      type: 'input',
      name: 'date',
      message: 'Date (yyyy-mm-dd):',
      default: dateFormat(Date.now(), 'isoDate'),
    },
  ])
  .then(answers =>
    newGatsbyPost(answers.title, {
      location: answers.location,
      date: answers.date,
    })
  )
  .then(path => {
    console.log();
    console.log(logSymbols.success, chalk.green('Created:'));
    console.log(path);
  })
  .catch(err => {
    console.log();
    console.log(logSymbols.error, chalk.red(err));
  });
