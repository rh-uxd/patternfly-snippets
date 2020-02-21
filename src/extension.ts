'use strict';
import * as vscode from 'vscode';
import { CodeFragmentProvider, CodeFragmentGroupTreeItem } from './codeFragmentsTreeItem';
import { FragmentManager } from './fragmentManager';
import { SnippetCompletionItemProvider, addAutoImport } from './snippetLoader';

export async function activate(context: vscode.ExtensionContext) {
  const fragmentManager = new FragmentManager(context);
  const codeFragmentProvider = new CodeFragmentProvider(fragmentManager);

  const additionalEdits = (editBuilder: vscode.TextEditorEdit, label: string) => {
    const { leadingControlChars, importPosition, match, lastMatchingIndex } = addAutoImport(
      vscode.window.activeTextEditor.document,
      vscode.window.activeTextEditor.selection.start
    );
    if (match.indexOf(label) === -1) {
      // we do not have the import, need to insert it
      if (lastMatchingIndex === -1) {
        editBuilder.insert(new vscode.Position(0, 0), `import { ${label} } from '@patternfly/react-core';\n`);
      } else {
        editBuilder.insert(importPosition, leadingControlChars ? `${leadingControlChars}${label},` : ` ${label}, `);
      }
    }
  };

  const insertCodeFragment = fragmentId => {
    if (!fragmentId) {
      vscode.window.showInformationMessage(
        'Insert a code fragment into the editor by clicking on it in the Code Fragments view.'
      );
    }

    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showInformationMessage('Open a file in the editor to insert a fragment.');
      return;
    }

    const content = fragmentManager.getFragmentContent(fragmentId);

    if (content) {
      // new SnippetCompletionItemProvider().provideCompletionItems();
      vscode.window.activeTextEditor.insertSnippet(new vscode.SnippetString(content.content)).then(() => {
        const config = vscode.workspace.getConfiguration('codeFragments');
        const autoImport: boolean = config.get('autoImport');
        if (autoImport) {
          vscode.window.activeTextEditor.edit(editBuilder => additionalEdits(editBuilder, content.label));
        }
      });
    }
  };

  const refreshFragments = () => {
    fragmentManager.reimportDefaults();
  };

  const gotoDocumentation = (group: CodeFragmentGroupTreeItem) => {
    if (!group) {
      vscode.window.showInformationMessage('Nothing passed');
    }
    const url = `${group.category.toLowerCase() === 'beta' ? 'experimental' : group.category}/${
      group.label
    }`.toLowerCase();
    // console.info(`https://www.patternfly.org/${group.version || 'v4'}/documentation/react/${url}`);
    vscode.env.openExternal(
      vscode.Uri.parse(`https://www.patternfly.org/${group.version || 'v4'}/documentation/react/${url}`)
    );
  };

  const switchVersion = (version: string) => {
    fragmentManager.reimportDefaults(version);
    vscode.window.showInformationMessage(`Loaded release ${version}`);
  };

  const toggleCommentsInFragments = () => {
    fragmentManager.toggleCommentsInFragments();
    fragmentManager.reimportDefaults();
  };

  const toggleAutoImport = () => {
    fragmentManager.toggleAutoImport();
  };

  const onUpdateConfiguration = (event: vscode.ConfigurationChangeEvent) => {
    const config = vscode.workspace.getConfiguration('codeFragments');
    event.affectsConfiguration('codeFragments.includeCommentsInFragment') &&
      fragmentManager.toggleCommentsInFragments(config.get('includeCommentsInFragment'));
    event.affectsConfiguration('codeFragments.autoImport') &&
      fragmentManager.toggleAutoImport(config.get('autoImport'));
    event.affectsConfiguration('codeFragments.patternflyRelease') &&
      fragmentManager.updateVersionUsed(config.get('patternflyRelease'));
    fragmentManager.reimportDefaults();
  };

  fragmentManager.initialize();

  vscode.window.registerTreeDataProvider('codeFragments', codeFragmentProvider);

  vscode.workspace.onDidChangeConfiguration(onUpdateConfiguration);

  context.subscriptions.push(vscode.commands.registerCommand('codeFragments.insertCodeFragment', insertCodeFragment));
  context.subscriptions.push(vscode.commands.registerCommand('codeFragments.refreshFragments', refreshFragments));
  context.subscriptions.push(vscode.commands.registerCommand('codeFragments.gotoDocumentation', gotoDocumentation));
  context.subscriptions.push(
    vscode.commands.registerCommand('codeFragments.toggleCommentsInFragments', toggleCommentsInFragments)
  );
  context.subscriptions.push(vscode.commands.registerCommand('codeFragments.autoImportCommand', toggleAutoImport));
  context.subscriptions.push(
    vscode.commands.registerCommand('codeFragments.switchVersion_2020.02', () => switchVersion('2020.02'))
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('codeFragments.switchVersion_2020.01', () => switchVersion('2020.01'))
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('codeFragments.switchVersion_2019.11', () => switchVersion('2019.11'))
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('codeFragments.switchVersion_2019.10', () => switchVersion('2019.10'))
  );

  // push these 2 subscriptions last
  const config = vscode.workspace.getConfiguration('codeFragments');
  const release: string = config.get('patternflyRelease');
  const autoImport: boolean = config.get('autoImport');
  const languageSelectors: vscode.DocumentSelector = [
    'typescript',
    'typescriptreact',
    'javascript',
    'javascriptreact',
    'markdown'
  ];
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      languageSelectors,
      new SnippetCompletionItemProvider(release, true, autoImport),
      '#'
    )
  );
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      languageSelectors,
      new SnippetCompletionItemProvider(release, false, autoImport),
      '!'
    )
  );
}

export function deactivate() {}
