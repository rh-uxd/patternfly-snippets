'use strict';
import * as vscode from 'vscode';
import { CodeFragmentProvider, CodeFragmentTreeItem } from './codeFragmentsTreeItem';
import { FragmentManager } from './fragmentManager';

export async function activate(context: vscode.ExtensionContext) {
    const fragmentManager = new FragmentManager(context);
    const codeFragmentProvider = new CodeFragmentProvider(fragmentManager);

    const insertCodeFragment = fragmentId => {
        if (!fragmentId) {
            vscode.window.showInformationMessage(
                'Insert a code fragment into the editor by clicking on it in the Code Fragments view.');
        }

        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('Open a file in the editor to insert a fragment.');
            return;
        }

        const content = fragmentManager.getFragmentContent(fragmentId);

        if (content) {
            editor.edit(builder => {
                builder.insert(editor.selection.start, content.content);
            });
        }
    };

    await fragmentManager.initialize();

    vscode.window.registerTreeDataProvider('codeFragments', codeFragmentProvider);

    context.subscriptions.push(vscode.commands.registerCommand('codeFragments.insertCodeFragment', insertCodeFragment));
}

export function deactivate() { }
