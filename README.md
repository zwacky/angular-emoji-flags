# angular-emoji-flags [![Build Status](https://travis-ci.org/zwacky/angular-emoji-flags.svg?branch=master)](https://travis-ci.org/zwacky/angular-emoji-flags)

turns a country code (ISO 3166) into a flag emoji.

## Installation

- `npm install angular-emoji-flags`
- add `angular-emoji-flags` to your angular.module dependency, ususally app.js

## Demo

https://jsbin.com/yigimoxuku/edit?html,js,output

## Usage

```
// in controller
$scope.emoji = emojiFlags.getFlagByCountry('us');

// in template as a filter
{{ 'us' | asEmojiFlag }}
```

## Working Document

Currently there are 197 countries supported. 60 are still missing.

For the full list of supported and missing countries please refer to: https://docs.google.com/spreadsheets/d/15yDAA8Fcl-pVfhDZRJQQUbJia_zj_33IzjRmLM3D_3w/edit?usp=sharing
