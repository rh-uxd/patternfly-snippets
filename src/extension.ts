'use strict';
import * as vscode from 'vscode';
import * as path from 'path';
import { CodeFragmentProvider, CodeFragmentGroupTreeItem } from './codeFragmentsTreeItem';
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

    fragmentManager.initialize();

    vscode.window.registerTreeDataProvider('codeFragments', codeFragmentProvider);

    // Track currently webview panel
    let currentPanel: vscode.WebviewPanel | undefined = undefined;

    context.subscriptions.push(vscode.commands.registerCommand('codeFragments.insertCodeFragment', insertCodeFragment));
    context.subscriptions.push(vscode.commands.registerCommand('codeFragments.refreshFragments', refreshFragments));
    context.subscriptions.push(vscode.commands.registerCommand('codeFragments.gotoDocumentation', gotoDocumentation));
    context.subscriptions.push(vscode.commands.registerCommand('codeFragments.switchVersion_2020.01', () => switchVersion('2020.01')));
    context.subscriptions.push(vscode.commands.registerCommand('codeFragments.switchVersion_2019.11', () => switchVersion('2019.11')));
    context.subscriptions.push(vscode.commands.registerCommand('codeFragments.switchVersion_2019.10', () => switchVersion('2019.10')));
    context.subscriptions.push(vscode.commands.registerCommand('catCoding.start', () => {
        const columnToShowIn = vscode.ViewColumn.Beside;

      if (currentPanel) {
        // If we already have a panel, show it in the target column
        currentPanel.reveal(columnToShowIn);
      } else {
        // Create and show a new webview
        currentPanel = vscode.window.createWebviewPanel(
          'catCoding', // Identifies the type of the webview. Used internally
          'Cat Coding', // Title of the panel displayed to the user
          columnToShowIn, // Editor column to show the new webview panel in.
          {
            enableScripts: true,
            retainContextWhenHidden: true,
            enableCommandUris: true
          } // Webview options. More on these later.
        );
        // And set its HTML content
        currentPanel.webview.html = getWebviewContent();

        // Reset when the current panel is closed
        currentPanel.onDidDispose(
            () => {
              currentPanel = undefined;
            },
            null,
            context.subscriptions
          );
        }
      })
    );
}

function getWebviewContent() {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="Content-Security-Policy" content="default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';">
      <title>PatternFly</title>
      <style>
      </style>
      <script>
        const counter = document.getElementById('lines-of-code-counter');

        let count = 0;
        setInterval(() => {
            counter.textContent = count++;
        }, 100);

        // Handle the message inside the webview
        window.addEventListener('message', event => {

            const message = event.data; // The JSON data our extension sent

            switch (message.command) {
                case 'refactor':
                    count = Math.ceil(count * 0.5);
                    counter.textContent = count;
                    break;
            }
        });
    </script>
  </head>
  <body>
    <!-- h1 id="lines-of-code-counter">0</h1 -->
    <iframe src="https://www.patternfly.org/2020.01/documentation/react/components/aboutmodal" id="innerIframe" style="position: absolute; height: 100%; width: 100%; border: none"></iframe>
  </body>
  </html>`;
  }

export function deactivate() { }
