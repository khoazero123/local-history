import * as vscode from 'vscode';

import HistoryController  from './history.controller';
import HistoryContentProvider  from './historyContent.provider';

/**
* Activate the extension.
*/
export function activate(context: vscode.ExtensionContext) {
    const controller = new HistoryController();

    context.subscriptions.push(vscode.commands.registerTextEditorCommand('local-history.showAll', controller.ShowAll, controller));
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('local-history.showCurrent', controller.ShowCurrent, controller));
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('local-history.compareToActive', controller.CompareToActive, controller));
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('local-history.compareToCurrent', controller.CompareToCurrent, controller));
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('local-history.compareToPrevious', controller.CompareToPrevious, controller));

    // Create history on save document
    vscode.workspace.onDidSaveTextDocument(document => {
        controller.SaveRevision(document);
    });

    // Show all local-history files
    const contentProvider = new HistoryContentProvider(controller);
    context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider(HistoryContentProvider.scheme, contentProvider));
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('local-history.showViewer', contentProvider.showViewer, contentProvider));
    // Commands call by html document
    // context.subscriptions.push(vscode.commands.registerCommand('local-history.callDiff', contentProvider.callDiff, contentProvider));

    // TEST
    context.subscriptions.push(vscode.commands.registerCommand('local-history.test', contentProvider.test, contentProvider));
}

function deactivate() {
}