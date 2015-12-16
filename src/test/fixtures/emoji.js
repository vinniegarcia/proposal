import {emoji} from 'node-emoji'

const emojify = (emo, pre = '') => (str) => `${pre}${emoji[emo]} ${str}`
export const errify = emojify('poop')
export const h1 = emojify('pineapple')
export const cool = emojify('cool')
export const fw = emojify('fireworks')
export const coffee = emojify('coffee')
