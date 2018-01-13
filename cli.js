#!/usr/bin/env node
'use strict';

const { normalize } = require('path');
const { error, success } = require('log-symbols');
const { green, red } = require('chalk');
const dateFormat = require('dateformat');
const inquirer = require('inquirer');
const newGatsbyPost = require('new-gatsby-post');

inquirer
  .prompt([
    {
      type: 'input',
      name: 'location',
      message: 'Location:',
      default: normalize('./src/pages/blog'),
    },
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
  ])
  .then(answers =>
    newGatsbyPost(answers.title, {
      location: answers.location,
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
