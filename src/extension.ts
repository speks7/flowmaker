'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as js2flowchart from 'js2flowchart';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "flowmaker" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    /*let disposable1 = vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');
    });*/

    /*let disposable = vscode.commands.registerCommand('extension.showJsFlowchart', () => {

        return vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.Two, 'JS Flowchart').then((success) => {
        }, (reason) => {
            vscode.window.showErrorMessage(reason);
        });
    });*/
    

    //context.subscriptions.push(disposable1);

    let previewUri = vscode.Uri.parse('js-preview://authority/js-preview');
        
        class TextDocumentContentProvider implements vscode.TextDocumentContentProvider {
            
            private _onDidChange = new vscode.EventEmitter<vscode.Uri>();

            public provideTextDocumentContent(uri: vscode.Uri): string {
                return this.createJsPreview();
            }

            get onDidChange(): vscode.Event<vscode.Uri> {
                return this._onDidChange.event;
            }

            public update(uri: vscode.Uri) {
                this._onDidChange.fire(uri);
            }

            private createJsPreview() {
                let editor = vscode.window.activeTextEditor;
                if (!(editor.document.languageId === 'javascript')) {
                    return this.errorSnippet(`Active editor doesn't show a JS document - nothen to preview. ${editor.document.languageId}`)
                }
                return this.extractSnippet();
            }

            private extractSnippet(): string {
                let editor = vscode.window.activeTextEditor;
                let text = editor.document.getText();
                const svg = js2flowchart.convertCodeToSvg(text)
                return this.snippet(svg)
            }

            private errorSnippet(error: string): string {
                return `
                    <body>
                        ${error}
                    </body>`;
            }

            private snippet(svg): string {
                return  `
                <body>
                    ${svg}
                </body>`
            }

        }
        let provider = new TextDocumentContentProvider();
        let registration = vscode.workspace.registerTextDocumentContentProvider('js-preview', provider);

        vscode.workspace.onDidChangeTextDocument((e: vscode.TextDocumentChangeEvent) => {
            if (e.document === vscode.window.activeTextEditor.document) {
                provider.update(previewUri);
            }
        });
    
        vscode.window.onDidChangeTextEditorSelection((e: vscode.TextEditorSelectionChangeEvent) => {
            if (e.textEditor === vscode.window.activeTextEditor) {
                provider.update(previewUri);
            }
        })

        let disposable = vscode.commands.registerCommand('extension.flowmaker', () => {
            return vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.Two, 'flowmaker').then((success) => {
            }, (reason) => {
                vscode.window.showErrorMessage(reason);
            });
        });

        let highlight = vscode.window.createTextEditorDecorationType({ backgroundColor: 'rgba(200,200,200,.35)' });

        context.subscriptions.push(disposable, registration);

}

// this method is called when your extension is deactivated
export function deactivate() {
}