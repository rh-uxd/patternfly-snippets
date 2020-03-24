'use strict';
import * as vscode from 'vscode';
import { CodeFragmentProvider, CodeFragmentGroupTreeItem } from './fragmentProvider';
import { FragmentManager } from './fragmentManager';
import { SnippetCompletionItemProvider, addAutoImport } from './snippetLoader';

export async function activate(context: vscode.ExtensionContext) {
  const fragmentManagerReact = new FragmentManager(context, 'react');
  const fragmentManagerCore = new FragmentManager(context, 'core');
  const codeFragmentProviderReact = new CodeFragmentProvider(fragmentManagerReact, 'react');
  const codeFragmentProviderCore = new CodeFragmentProvider(fragmentManagerCore, 'core');

  const additionalReactEdits = (editBuilder: vscode.TextEditorEdit, label: string) => {
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

  const insertCodeFragmentReact = fragmentId => {
    insertCodeFragment(fragmentId, 'react');
  }

  const insertCodeFragmentCore = fragmentId => {
    insertCodeFragment(fragmentId, 'core');
  }

  const insertCodeFragment = (fragmentId, type: 'react' | 'core') => {
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

    const content = type === 'react' ? fragmentManagerReact.getFragmentContent(fragmentId) : fragmentManagerCore.getFragmentContent(fragmentId);

    if (content) {
      let contentToInsert = content.content;
      if (type === 'react') {
        const config = vscode.workspace.getConfiguration('patternflySnippets');
        const reactIncludeCommentsInFragment = config.get('reactIncludeCommentsInFragment');
        if (!reactIncludeCommentsInFragment) {
          contentToInsert = contentToInsert.replace(/\/\*.*\*\//g, '');
        }
        vscode.window.activeTextEditor.insertSnippet(new vscode.SnippetString(contentToInsert)).then(() => {
          const config = vscode.workspace.getConfiguration('patternflySnippets');
          const reactAutoImport: boolean = config.get('reactAutoImport');
          if (reactAutoImport) {
            vscode.window.activeTextEditor.edit(editBuilder => additionalReactEdits(editBuilder, content.label));
          }
        });
      } else {
        vscode.window.activeTextEditor.insertSnippet(new vscode.SnippetString(contentToInsert))
      }
    }
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
      vscode.Uri.parse(`https://www.patternfly.org/${group.version || 'v4'}/documentation/${group.type}/${url}`)
    );
  };

  const loadSnippets = (reload?: boolean) => {
    const totalSnippetSubscriptions = 3;
    if (reload && context.subscriptions.length) {
      // remove and dispose last subscriptions related to snippets
      for (let j = 0; j < totalSnippetSubscriptions; j++) {
        let lastSubscription = context.subscriptions.pop();
        lastSubscription.dispose();
      }
    }
    const config = vscode.workspace.getConfiguration('patternflySnippets');
    const releaseReact: string = config.get('reactPatternflyRelease');
    const releaseCore: string = config.get('corePatternflyRelease');
    const reactAutoImport: boolean = config.get('reactAutoImport');
    const coreSnippetPrefix: string = config.get('coreSnippetPrefix');
    const reactSnippetPrefixWithComments: string = config.get('reactSnippetPrefixWithComments');
    const reactSnippetPrefixWithoutComments: string = config.get('reactSnippetPrefixWithoutComments');
    const reactLanguageSelectors: string[] = config.get('reactSnippetFileTypes');
    const coreLanguageSelectors: string[] = config.get('coreSnippetFileTypes');
    const snippetSubscriptions = [
      vscode.languages.registerCompletionItemProvider(
        reactLanguageSelectors,
        new SnippetCompletionItemProvider('react', reactSnippetPrefixWithComments, releaseReact, true, reactAutoImport),
        reactSnippetPrefixWithComments.charAt(0)
      ),
      vscode.languages.registerCompletionItemProvider(
        reactLanguageSelectors,
        new SnippetCompletionItemProvider('react', reactSnippetPrefixWithoutComments, releaseReact, false, reactAutoImport),
        reactSnippetPrefixWithoutComments.charAt(0)
      ),
      vscode.languages.registerCompletionItemProvider(
        coreLanguageSelectors,
        new SnippetCompletionItemProvider('core', coreSnippetPrefix, releaseCore),
        coreSnippetPrefix.charAt(0)
      )
    ];

    for (let i = 0; i < snippetSubscriptions.length; i++) {
      context.subscriptions.push(snippetSubscriptions[i]);
    }
  }

  const switchVersionReact = (version: string) => {
    fragmentManagerReact.updateVersionUsed(version);
    fragmentManagerReact.reimportDefaults(version);
    loadSnippets(true);
    vscode.window.showInformationMessage(`Loaded release ${version} for react`);
  };

  const switchVersionCore = (version: string) => {
    fragmentManagerCore.updateVersionUsed(version);
    fragmentManagerCore.reimportDefaults(version);
    loadSnippets(true);
    vscode.window.showInformationMessage(`Loaded release ${version} for core`);
  };

  const toggleCommentsInFragmentsReact = () => {
    fragmentManagerReact.toggleCommentsInFragmentsReact();
    fragmentManagerReact.reimportDefaults();
  };

  const toggleAutoImportReact = () => {
    fragmentManagerReact.toggleAutoImportReact();
  };

  const onUpdateConfiguration = (event: vscode.ConfigurationChangeEvent) => {
    const config = vscode.workspace.getConfiguration('patternflySnippets');
    event.affectsConfiguration('patternflySnippets.reactIncludeCommentsInFragment') &&
      fragmentManagerReact.toggleCommentsInFragmentsReact(config.get('reactIncludeCommentsInFragment'));
    event.affectsConfiguration('patternflySnippets.reactAutoImport') &&
      fragmentManagerReact.toggleAutoImportReact(config.get('reactAutoImport'));

    const affectsReleaseReact = event.affectsConfiguration('patternflySnippets.reactPatternflyRelease');
    const affectsReleaseCore = event.affectsConfiguration('patternflySnippets.corePatternflyRelease');
    if (affectsReleaseReact) {
      switchVersionReact(config.get('reactPatternflyRelease'));
    }
    if (affectsReleaseCore) {
      switchVersionCore(config.get('corePatternflyRelease'));
    }

    if (!affectsReleaseCore && !affectsReleaseReact && (
      event.affectsConfiguration('patternflySnippets.coreSnippetPrefix') ||
      event.affectsConfiguration('patternflySnippets.reactSnippetPrefixWithComments') ||
      event.affectsConfiguration('patternflySnippets.reactSnippetPrefixWithoutComments') ||
      event.affectsConfiguration('patternflySnippets.reactSnippetFileTypes') ||
      event.affectsConfiguration('patternflySnippets.coreSnippetFileTypes')
    )) {
      loadSnippets(true);
      vscode.window.showInformationMessage(`Reloading snippet completions`);
    }
  };

  fragmentManagerReact.initialize();
  fragmentManagerCore.initialize();

  vscode.window.registerTreeDataProvider('pfSnippetsReact', codeFragmentProviderReact);
  vscode.window.registerTreeDataProvider('pfSnippetsCore', codeFragmentProviderCore);

  vscode.workspace.onDidChangeConfiguration(onUpdateConfiguration);

  context.subscriptions.push(vscode.commands.registerCommand('patternflySnippets.insertCodeFragment_react', insertCodeFragmentReact));
  context.subscriptions.push(vscode.commands.registerCommand('patternflySnippets.insertCodeFragment_core', insertCodeFragmentCore));
  context.subscriptions.push(vscode.commands.registerCommand('patternflySnippets.gotoDocumentation', gotoDocumentation));
  context.subscriptions.push(
    vscode.commands.registerCommand('patternflySnippets.toggleCommentsInFragments', toggleCommentsInFragmentsReact)
  );
  context.subscriptions.push(vscode.commands.registerCommand('patternflySnippets.autoImportCommand', toggleAutoImportReact));
  context.subscriptions.push(
    vscode.commands.registerCommand('patternflySnippets.switchVersion_core_2020.03', () => switchVersionCore('2020.03'))
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('patternflySnippets.switchVersion_react_2020.03', () => switchVersionReact('2020.03'))
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('patternflySnippets.switchVersion_react_2020.02', () => switchVersionReact('2020.02'))
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('patternflySnippets.switchVersion_react_2020.01', () => switchVersionReact('2020.01'))
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('patternflySnippets.switchVersion_react_2019.11', () => switchVersionReact('2019.11'))
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('patternflySnippets.switchVersion_react_2019.10', () => switchVersionReact('2019.10'))
  );

  // push these subscriptions last
  loadSnippets();
}

export function deactivate() {}
