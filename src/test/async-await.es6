'use strict';
// builtins
import {ok} from 'assert';
import fs from 'fs';
// babel (needed for async/await)
import 'babel/polyfill';
// local modules
import {sample as sampleFile } from './fixtures';
import {errify, h1, cool } from './fixtures/emoji';
import Proposal from '../index';

describe(h1('async/await test'), () => {

  it(cool('A-weits'), async (done) => {
    
    try {
      // you can use await in an async function like this one
      const farley = JSON.parse(await Proposal(fs.readFile, sampleFile));

      ok(farley && farley.name.includes('Farley'), errify('Farley not found!'));
      done();
    } catch (err) {
      done(err);
    }
    
  });

});
