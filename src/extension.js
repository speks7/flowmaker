'use strict';
exports.__esModule = true;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require("vscode");
var js2flowchart = require("js2flowchart");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
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
    var previewUri = vscode.Uri.parse('js-preview://authority/js-preview');
    var TextDocumentContentProvider = /** @class */ (function () {
        function TextDocumentContentProvider() {
            this._onDidChange = new vscode.EventEmitter();
        }
        TextDocumentContentProvider.prototype.provideTextDocumentContent = function (uri) {
            return this.createJsPreview();
        };
        Object.defineProperty(TextDocumentContentProvider.prototype, "onDidChange", {
            get: function () {
                return this._onDidChange.event;
            },
            enumerable: true,
            configurable: true
        });
        TextDocumentContentProvider.prototype.update = function (uri) {
            this._onDidChange.fire(uri);
        };
        TextDocumentContentProvider.prototype.createJsPreview = function () {
            var editor = vscode.window.activeTextEditor;
            if (!(editor.document.languageId === 'javascript')) {
                return this.errorSnippet("Active editor doesn't show a JS document - nothen to preview. " + editor.document.languageId);
            }
            return this.extractSnippet();
        };
        TextDocumentContentProvider.prototype.extractSnippet = function () {
            var editor = vscode.window.activeTextEditor;
            var text = editor.document.getText();
            var svg = js2flowchart.convertCodeToSvg(text);
            return this.snippet(svg);
        };
        TextDocumentContentProvider.prototype.errorSnippet = function (error) {
            return "\n                    <body>\n                        " + error + "\n                    </body>";
        };
        TextDocumentContentProvider.prototype.snippet = function (svg) {
            return "\n                <body>\n                    " + svg + "\n                </body>";
        };
        return TextDocumentContentProvider;
    }());
    var provider = new TextDocumentContentProvider();
    var registration = vscode.workspace.registerTextDocumentContentProvider('js-preview', provider);
    vscode.workspace.onDidChangeTextDocument(function (e) {
        if (e.document === vscode.window.activeTextEditor.document) {
            provider.update(previewUri);
        }
    });
    vscode.window.onDidChangeTextEditorSelection(function (e) {
        if (e.textEditor === vscode.window.activeTextEditor) {
            provider.update(previewUri);
        }
    });
    var disposable = vscode.commands.registerCommand('extension.flowmaker', function () {
        return vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.Two, 'flowmaker').then(function (success) {
        }, function (reason) {
            vscode.window.showErrorMessage(reason);
        });
    });
    var highlight = vscode.window.createTextEditorDecorationType({ backgroundColor: 'rgba(200,200,200,.35)' });
    context.subscriptions.push(disposable, registration);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
