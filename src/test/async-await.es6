'use strict';
// builtins
import {ok} from 'assert';
import fs from 'fs';
// local modules
import {sample as sampleFile } from './fixtures';
import {errify, h1, cool } from './fixtures/emoji';
import Proposal from '../index';

describe(h1('async/await test'), () => {

  it(cool('A-weits'), async function (done) {
    this.timeout(10000);
    // you can use await in an async function like this one
    const farley = JSON.parse(await Proposal(fs.readFile, sampleFile));

    ok(farley && farley.name.includes('Farley'), errify('Farley not found!'));
    done();
  });

});
