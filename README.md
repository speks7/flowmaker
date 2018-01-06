# Flowmaker

Flowmaker is an VSCode extension used to generate a flowchart in SVG format of JS code to demonstrate Code flow scheme from different level of conduct.

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
<a href="https://github.com/Bogdan-Lyashenko/js-code-to-svg-flowchart" target="_blank">js2flowchart</a>
<a href="https://github.com/GramParallelo/atom-js-code-to-svg-to-preview" target="_blank">atom-js-code-to-svg-to-preview
</a>

## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

-----------------------------------------------------------------------------------------------------------

## Working with Markdown

**Note:** You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on OSX or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+CMD+V` on OSX or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (OSX) to see a list of Markdown snippets

### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**