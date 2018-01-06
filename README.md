# Flowmaker

Flowmaker is an VSCode extension used to generate a flowchart in SVG format of JS code to demonstrate Code flow scheme from different level of conduct.

[![onBrowser demo](https://i.imgur.com/k77hQLy.png)](https://i.imgur.com/k77hQLy.png)
**Note:**
For only using the onEditor SVG generation follow the <a href="https://github.com/aryaminus/flowmaker/tree/livepreview" target="_blank">livepreview</a> branch code.

## Instructions
- Write Javascript.
- Select a function or object or entire file.  
- Hit ctrl-f1.
- Choose either 'Flowmake onEditor' or 'Flowmake onEditor'.
- 'Flowmake onEditor' generates the SVG layout in side column of editor itself.
- 'Flowmake onBrowser' strats a node server on localhost with port 8080 to view and download the SVG code.

## Installation

Clone the source locally:
```
$ git clone https://github.com/aryaminus/flowmaker
$ cd flowmaker
$ npm install
```

**Start the application in development mode**
```
hit Ctrl+f5
hit Fn+f1 or F1
choose Flowmake onEditor or Flowmake onBrowser
```
or from VS-Code Market:
```
downlodd Flowmaker extension
hit Fn+f1 or F1
choose Flowmake onEditor or Flowmake onBrowser
```
## Packages:
1. <a href="https://github.com/Bogdan-Lyashenko/js-code-to-svg-flowchart" target="_blank">js2flowchart</a>
2. <a href="https://github.com/GramParallelo/atom-js-code-to-svg-to-preview" target="_blank">atom-js-code-to-svg-to-preview</a>
3. <a href="https://github.com/expressjs/express" target="_blank">express</a>
4. <a href="https://github.com/socketio/socket.io" target="_blank">socket.io</a>

## Features

[![onEditor demo](https://i.imgur.com/F3LC8LA.png)](https://i.imgur.com/F3LC8LA.png)

[![onBrowser demo](https://i.imgur.com/Hw9SZ5M.png)](https://i.imgur.com/Hw9SZ5M.png)

### TODO:
- [ ] JSX support
- [ ] Flow,CLI and Typescript support
- [ ] Chrome extension for dev-tools
- [ ] Fetching SVG to generate and manipulate code to genrate code from flowchart

## Requirements

1. Node server installed
2. Socket.io and express installed ie.
```
npm install --save express socket.io
```

-----------------------------------------------------------------------------------------------------------

## Contributing

1. Fork it (<https://github.com/aryaminus/flowmaker/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

**Enjoy!**