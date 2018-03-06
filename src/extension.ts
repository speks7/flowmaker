"use strict";
import * as vscode from "vscode";
import * as HTTP from "http";
import * as express from "express";
import * as socket from "socket.io";
import * as js2flowchart from "js2flowchart";
import * as path from "path";
import { window, commands, Uri } from "vscode";
import { dirname } from "path";
import { writeFileSync } from "fs";
import { homedir } from "os";
import { ExtensionConstants } from "./constants";
import { FlowOnBrowser } from "./onBrowserManager";
import { TextDocumentContentProvider } from "./onEditorManager";

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
let flowBrowser: FlowOnBrowser;
let flowVS: TextDocumentContentProvider;
//let flowVSCpde:

const writeSerializedBlobToFile = (serializeBlob, fileName) => {
  const bytes = new Uint8Array(serializeBlob.split(","));
  writeFileSync(fileName, new Buffer(bytes));
};

export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log("active!");

  let lastUsedImageUri = vscode.Uri.file(
    path.resolve(homedir(), "Desktop/code.svg")
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json

  let disposableSaver = vscode.commands.registerCommand(
    "extension.Saver",
    serializedBlob => {
      vscode.window
        .showSaveDialog({
          defaultUri: lastUsedImageUri,
          filters: {
            Images: ["svg"]
          }
        })
        .then(uri => {
          if (uri) {
            writeSerializedBlobToFile(serializedBlob, uri.fsPath);
            lastUsedImageUri = uri;
          }
        });
    }
  );

  let disposableBrowser = vscode.commands.registerCommand(
    "extension.onBrowser",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      flowBrowser = new FlowOnBrowser();
      vscode.window.showInformationMessage(
        "Server started successfully on http:localhost:" +
          ExtensionConstants.PORT
      );
    }
  );
  let disposableOnVSCode = vscode.commands.registerCommand(
    "extension.onEditor",
    () => {
      flowVS = new TextDocumentContentProvider();
      let registration = vscode.workspace.registerTextDocumentContentProvider(
        "flowmaker",
        flowVS
      );

      vscode.workspace.onDidChangeTextDocument(
        (caught: vscode.TextDocumentChangeEvent) => {
          if (caught.document === vscode.window.activeTextEditor.document) {
            flowVS.update(ExtensionConstants.liveURI);
          }
        }
      );
      vscode.window.onDidChangeTextEditorSelection(
        (caught: vscode.TextEditorSelectionChangeEvent) => {
          if (caught.textEditor === vscode.window.activeTextEditor) {
            flowVS.update(ExtensionConstants.liveURI);
          }
        }
      );
      return vscode.commands.executeCommand(
        "vscode.previewHtml",
        ExtensionConstants.liveURI,
        vscode.ViewColumn.Two,
        "flowmaker"
      );
    }
  );
  context.subscriptions.push(disposableSaver);
  context.subscriptions.push(disposableBrowser);
  context.subscriptions.push(disposableOnVSCode);
}
// this method is called when your extension is deactivated
export function deactivate() {
  if (flowBrowser) flowBrowser.stopServer();
}
