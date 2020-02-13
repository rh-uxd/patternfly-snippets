'use strict';
import * as vscode from 'vscode';
import { CodeFragmentProvider, CodeFragmentGroupTreeItem } from './codeFragmentsTreeItem';
import { FragmentManager } from './fragmentManager';
import { SnippetCompletionItemProvider } from './snippetLoader';

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
            vscode.window.activeTextEditor.insertSnippet(new vscode.SnippetString(content.content));
        }
    };

    const refreshFragments = () => {
        fragmentManager.reimportDefaults();
    };

    const gotoDocumentation = (group: CodeFragmentGroupTreeItem) => {
        if (!group) {
            vscode.window.showInformationMessage(
                'Nothing passed');
        }
        const url = `${group.category}/${group.label}`.toLowerCase();
        vscode.env.openExternal(vscode.Uri.parse(`https://www.patternfly.org/v4/documentation/react/${url}`));
    };

    const switchVersion = (version: string) => {
        fragmentManager.reimportDefaults(version);
        vscode.window.showInformationMessage(`Loaded release ${version}`);
    }

    const toggleCommentsInFragments = () => {
      fragmentManager.toggleCommentsInFragments();
      fragmentManager.reimportDefaults();
    }

    const onUpdateConfiguration = () => {
      const config = vscode.workspace.getConfiguration('codeFragments');
      fragmentManager.toggleCommentsInFragments(config.get('includeCommentsInFragment'));
      fragmentManager.updateVersionUsed(config.get('patternflyRelease'));
      fragmentManager.reimportDefaults();
    }

    fragmentManager.initialize();

    vscode.window.registerTreeDataProvider('codeFragments', codeFragmentProvider);

    vscode.workspace.onDidChangeConfiguration(onUpdateConfiguration);

    context.subscriptions.push(vscode.commands.registerCommand('codeFragments.insertCodeFragment', insertCodeFragment));
    context.subscriptions.push(vscode.commands.registerCommand('codeFragments.refreshFragments', refreshFragments));
    context.subscriptions.push(vscode.commands.registerCommand('codeFragments.gotoDocumentation', gotoDocumentation));
    context.subscriptions.push(vscode.commands.registerCommand('codeFragments.toggleCommentsInFragments', toggleCommentsInFragments));
    context.subscriptions.push(vscode.commands.registerCommand('codeFragments.switchVersion_2020.01', () => switchVersion('2020.01')));
    context.subscriptions.push(vscode.commands.registerCommand('codeFragments.switchVersion_2019.11', () => switchVersion('2019.11')));
    context.subscriptions.push(vscode.commands.registerCommand('codeFragments.switchVersion_2019.10', () => switchVersion('2019.10')));

    // push these 2 subscriptions last
    const config = vscode.workspace.getConfiguration('codeFragments');
    const release: string = config.get('patternflyRelease');
    const languageSelectors: vscode.DocumentSelector = ['typescript', 'typescriptreact', 'javascript', 'javascriptreact', 'html', 'plaintext', 'markdown'];
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(languageSelectors, new SnippetCompletionItemProvider(release, true), '#'));
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(languageSelectors, new SnippetCompletionItemProvider(release, false), '!'));
}

export function deactivate() { }
