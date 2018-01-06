# Flowmaker

Flowmaker is an VSCode extension used to generate a flowchart in SVG format of JS code to demonstrate Code flow scheme from different level of conduct.

[![onBrowser demo](https://i.imgur.com/k77hQLy.png)](https://i.imgur.com/k77hQLy.png)

**Note:**
For only using the onEditor and onBrowser SVG generation follow the <a href="https://github.com/aryaminus/flowmaker/" target="_blank">master</a> branch code.

## Instructions
- Write Javascript.
- Select a function or object or entire file.  
- Hit ctrl-f1.
- Choose 'Flowmake magic'.
- 'Flowmake magic' generates the SVG layout in side column of editor itself.

## Installation

Clone the source locally:
```
$ git clone -b livepreview https://github.com/aryaminus/flowmaker/tree/livepreview
$ cd flowmaker
$ npm install
```

**Start the application in development mode**
```
hit Ctrl+f5
hit Fn+f1 or F1
choose 'Flowmake Magic'
```
or from VS-Code Market:
```
download Flowmaker extension
hit Fn+f1 or F1
choose Flowmake onEditor
```
## Packages:
1. <a href="https://github.com/Bogdan-Lyashenko/js-code-to-svg-flowchart" target="_blank">js2flowchart</a>
2. <a href="https://github.com/GramParallelo/atom-js-code-to-svg-to-preview" target="_blank">atom-js-code-to-svg-to-preview</a>

## Features

[![onEditor demo](https://i.imgur.com/F3LC8LA.png)](https://i.imgur.com/F3LC8LA.png)

### TODO:
- [ ] JSX support
- [ ] Flow,CLI and Typescript support
- [ ] Chrome extension for dev-tools
- [ ] Fetching SVG to generate and manipulate code to genrate code from flowchart


-----------------------------------------------------------------------------------------------------------

## Contributing

1. Fork it (<https://github.com/aryaminus/flowmaker/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

**Enjoy!**