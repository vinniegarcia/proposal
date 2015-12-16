// builtins
import fs from 'fs'
// modules
import test from 'tape'
// local modules
import {sample as sampleFile } from '../fixtures/'
import {h1} from '../fixtures/emoji'
import Proposal from '../../index'

const fileReadAssertions = (t) => async (fileReadPromise, cont) => {
  try {
    const json = await fileReadPromise
    const data = JSON.parse(json)
    const isFarley = data.success && data.number === 42 && data.name === 'Chris Farley'
    t.ok(isFarley, 'Expected file data not found!')
    cont()
  } catch (err) {
    cont(err)
  }
}

test(h1('Proposal tests'), (t) => {

  const read = fs.readFile
  console.log(sampleFile)
  const readPromise = Proposal(read, sampleFile)
  const isAPromise = (readPromise instanceof Promise)

  t.ok(isAPromise, 'Proposal(f, ...args) returns a promise')
  fileReadAssertions(t)(readPromise, () => null)

  const chickenCurry = Proposal(read)
  const curryIsntPromise = !(chickenCurry instanceof Promise)
  const curryIsFunction = (chickenCurry instanceof Function)

  t.ok(curryIsntPromise, 'Proposal(f) is not a Promise')
  t.ok(curryIsFunction, 'Proposal(f) returns a function')

  const curryRead = chickenCurry(sampleFile)
  const curryReadIsPromise = (curryRead instanceof Promise)

  t.ok(curryReadIsPromise, 'Proposal(f)(...args) returns a Promise')
  fileReadAssertions(t)(curryRead, t.end)

})
