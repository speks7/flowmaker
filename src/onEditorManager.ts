"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as js2flowchart from "js2flowchart";
import { ExtensionConstants } from "./constants";
import * as path from "path";
const { homedir } = require("os");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

export class TextDocumentContentProvider
  implements vscode.TextDocumentContentProvider {
  private _onDidChange = new vscode.EventEmitter<vscode.Uri>();

  public provideTextDocumentContent(uri: vscode.Uri): string {
    return this.JsRenderView();
  }

  get onDidChange(): vscode.Event<vscode.Uri> {
    return this._onDidChange.event;
  }

  public update(uri: vscode.Uri) {
    this._onDidChange.fire(uri);
  }

  private JsRenderView() {
    let WindowP = vscode.window.activeTextEditor;
    if (!(WindowP.document.languageId === "javascript")) {
      return "Only .js file is supported";
    }
    let text = WindowP.document.getText();
    const svg1 = js2flowchart.convertCodeToSvg(text);
    /*const SVGSave = vscode.window
      .showSaveDialog({
        defaultUri: lastUsedImageUri,
        filters: {
          Images: ["svg"]
        }
      })
      .then(uri => {
        if (uri) {
          writeFileSync(uri.fsPath);
          lastUsedImageUri = uri;
        }
      });*/
    return `
    <style>
    #downloadFile {
      position: fixed;
      right: 20px;
      bottom: 5px;
      padding: 5px 10px;
      background: white;
      border: 1px solid #2288ff;
      outline: none;
      font-weight: bold;
      color: #2288ff;
      font-family: sans-serif;
      cursor: pointer;
      z-index: 10;
    }
  </style>
    <body style="background-color:white;">
      <div>${svg1}</div>
      <div><button id="downloadFile">DOWNLOAD SVG FILE</button></div>
    </body>
    <script>
    function SVGSave() {
      let lastUsedImageUri = vscode.Uri.file(
        path.resolve(homedir(), "Desktop/"+svg1+".svg")
      );
      vscode.window
      .showSaveDialog({
        defaultUri: lastUsedImageUri,
        filters: {
          Images: ["svg"]
        }
      })
      .then(uri => {
        if (uri) {
          writeFileSync(uri.fsPath);
          lastUsedImageUri = uri;
        }
      });

    }
    $('button#downloadFile').click(SVGSave);
    </script> 
    `;
  }
}
