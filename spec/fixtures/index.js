'use strict'
/* eslint key-spacing: ["error", { "align": "value" }] */
const responses = {
  http: {
    a200: './responses/http/200.json',
    a400: './responses/http/400.json',
    a404: './responses/http/404.json',
    a405: './responses/http/405.json',
    a500: './responses/http/500.json'
  },

  mean: {
    charRepeatFour:  './responses/mean/char-repeat-four.json',
    empty:           './responses/mean/empty.json',
    onlyNonAlpha:    './responses/mean/only-non-alpha.json',
    onlyNonAlphaNum: './responses/mean/only-non-alphanum.json',
    onlySpaces:      './responses/mean/only-spaces.json',
    wordLineWord:    './responses/mean/word-line-word.json',
    wordSpacesWord:  './responses/mean/word-spaces-word.json',
    word:            './responses/mean/word.json',
    zeroWordZero:    './responses/mean/zero-word-zero.json'
  },

  stat: {
    charRepeatFour:  './responses/stat/char-repeat-four.json',
    empty:           './responses/stat/empty.json',
    onlyNonAlpha:    './responses/stat/only-non-alpha.json',
    onlyNonAlphaNum: './responses/stat/only-non-alphanum.json',
    onlySpaces:      './responses/stat/only-spaces.json',
    wordLineWord:    './responses/stat/word-line-word.json',
    wordSpacesWord:  './responses/stat/word-spaces-word.json',
    word:            './responses/stat/word.json',
    zeroWordZero:    './responses/stat/zero-word-zero.json'
  },

  content: { response: './response.json' }
}

const requests = {
  charRepeatFour:  './requests/char-repeat-four.txt',
  empty:           './requests/empty.txt',
  onlyNonAlpha:    './requests/only-non-alpha.txt',
  onlyNonAlphaNum: './requests/only-non-alphanum.txt',
  onlySpaces:      './requests/only-spaces.txt',
  wordLineWord:    './requests/word-line-word.txt',
  wordSpacesWord:  './requests/word-spaces-word.txt',
  word:            './requests/word.txt',
  zeroWordZero:    './requests/zero-word-zero.txt',
  request:         './request.txt'
}

export {
  responses,
  requests
}
