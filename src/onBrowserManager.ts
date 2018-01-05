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
export class FlowOnBrowser{
    static app :express;
    static server:HTTP.Server;
    static io;
    constructor()
    {
        FlowOnBrowser.app= express();
        FlowOnBrowser.app.use(express.static(ExtensionConstants.EXPRESSROOT));
        FlowOnBrowser.server=HTTP.createServer(FlowOnBrowser.app);
        FlowOnBrowser.io=socket.listen(FlowOnBrowser.server);
        FlowOnBrowser.server.listen(ExtensionConstants.PORT);
        window.onDidChangeTextEditorSelection(this.showFlow);
        window.onDidChangeActiveTextEditor(this.showFlow);
        this.showFlow=this.showFlow.bind(this);
        this.initializeEventHandlers();
    }
    private initializeEventHandlers(){
        console.log('event handelers initialized');
        FlowOnBrowser.app.get('/',(req,res)=>{
            res.sendFile(__dirname+'/html/index.html');
        });
        FlowOnBrowser.io.sockets.on('connection',(socket)=>{
            console.log('new connection');
            this.showFlow();
        });
    }
    private showFlow()
    {
        let svg:string;
        let fileName="";
        let editor = window.activeTextEditor;
        if (!editor) 
            svg='<p>No editor is opened</p>';
        else if(editor.document.languageId!== "javascript")
            svg='<p>Opened file is not a js file</p>';
        else
        {
            let code=editor.document.getText();
            if(!code)
                svg='<p>Empty js file</p>';
            else
            {
                svg = js2flowchart.convertCodeToSvg(code);
                fileName=editor.document.fileName;
            }
        }
       FlowOnBrowser.io.emit('update',{svg,fileName});
    }
    public stopServer()
    {
        FlowOnBrowser.server.close();
    }
}