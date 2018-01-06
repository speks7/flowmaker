"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as js2flowchart from "js2flowchart";
import {ExtensionConstants} from './constants';
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
      const svg = js2flowchart.convertCodeToSvg(text);
      return `<body style="background-color:white;">${svg}</body>`;
    }
  }
