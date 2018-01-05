'use strict';
import * as vscode from 'vscode';
import * as HTTP from 'http';
import * as express from 'express' ;
import * as socket from 'socket.io';
import * as js2flowchart from 'js2flowchart';
import {window,commands, Uri} from 'vscode';
import { dirname } from 'path';
import {ExtensionConstants} from './constants';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
let flowBrowser : FlowOnBrowser;
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('active!');
    flowBrowser=new FlowOnBrowser();
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');
    });

    context.subscriptions.push(disposable);
}
class FlowOnBrowser{
    app :express;
    server:HTTP.Server;
    io;
    constructor()
    {
        this.app= express();
        this.app.use(express.static(ExtensionConstants.EXPRESSROOT));
        this.server=HTTP.createServer(this.app);
        this.io=socket.listen(this.server);
        this.server.listen(ExtensionConstants.PORT);
        this.initializeEventHandlers();
        window.onDidChangeTextEditorSelection(this.showFlow);
        window.onDidChangeActiveTextEditor(this.showFlow);
        this.showFlow=this.showFlow.bind(this);
    }
    private initializeEventHandlers(){

    }
    private showFlow()
    {

    }
}
// this method is called when your extension is deactivated
export function deactivate() {
}