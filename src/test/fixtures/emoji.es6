import {emoji} from 'node-emoji';

const emojify = (emo, pre='') => (str) => `${pre}${emoji[emo]}  ${str}`,
  errify = emojify('poop'),
  h1 = emojify('pineapple'),
  cool = emojify('cool'),
  fw = emojify('fireworks', '\t\t');

export { errify, h1, cool, fw };
