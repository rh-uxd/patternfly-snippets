import * as vscode from 'vscode';
import * as path from 'path';
import { isArray } from 'util';

export const addAutoImport = (document: vscode.TextDocument, position: vscode.Position) => {
  let leadingControlChars: string = '';
  let importPosition: vscode.Position;
  let match: string[] = [];
  let lastMatchingIndex: number = -1;
  const wholeText = document.getText();
  const importRegex = /\{([^}]+)\}.*@patternfly\/react-core/g;
  let matcher = importRegex.exec(wholeText);
  while (matcher != null) {
    if (document.positionAt(matcher.index).line > position.line) {
      // if the found line position exceeds the cursor position we can stop
      break;
    }
    leadingControlChars = '';
    lastMatchingIndex = matcher.index;
    // console.info(`cursor line: ${position.line}, matcher: ${document.positionAt(matcher.index).line}`);
    const firstMatch = matcher[1].split(',')[0];
    for (let i = 0; i < firstMatch.length; i++) {
      if (/[a-zA-Z]/.test(firstMatch.charAt(i)) === false) {
        // control character
        leadingControlChars += firstMatch.charAt(i);
      } else {
        break;
      }
    }
    const cleanedupMatches = matcher[1]
      .trim()
      .replace(/[\n\r\t]/g, '')
      .split(/,\s*/);
    match = match.concat(cleanedupMatches);
    matcher = importRegex.exec(wholeText);
  }
  importPosition = document.positionAt(lastMatchingIndex + 1);
  return {
    leadingControlChars,
    importPosition,
    match,
    lastMatchingIndex
  };
};

export class SnippetCompletionItemProvider implements vscode.CompletionItemProvider {
  private snippets: any;
  private release: string;
  private trigger: string;
  private reactAutoImport: boolean;

  constructor(type: 'react' | 'core', trigger: string, release: string, reactAutoImport?: boolean) {
    this.trigger = trigger;
    const pathToSnippet = path.join(
      __dirname,
      `../../snippets/${type}/${release}/snippets.json`
    );
    console.info(`Loading snippet from ${pathToSnippet} with trigger ${trigger}`);
    this.snippets = require(pathToSnippet);
    this.release = release;
    this.reactAutoImport = reactAutoImport;
  }

  public provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): vscode.CompletionList {
    const linePrefix: string = document.lineAt(position).text.substr(position.character - this.trigger.length, this.trigger.length);
    if (linePrefix !== this.trigger) {
      return;
    }

    let result: vscode.CompletionItem[] = [];

    const { leadingControlChars, importPosition, match, lastMatchingIndex } = addAutoImport(document, position);

    const config = vscode.workspace.getConfiguration('patternflySnippets');
    const includeComments: boolean = config.get('reactIncludeCommentsInFragment');

    for (const snippetName of Object.keys(this.snippets)) {
      const snippet = this.snippets[snippetName];
      // const snippetPrefix = snippet.prefix.replace('#', this.trigger);
      let snippetBody = isArray(snippet.body) ? snippet.body.join('\n') : snippet.body;
      if (!includeComments) {
        snippetBody = snippetBody.replace(/\/\*.*\*\//g, '');
      }
      const completionItem = new vscode.CompletionItem(`${this.trigger}${snippetName}`, vscode.CompletionItemKind.Snippet);
      // completionItem.filterText = snippetName;
      // console.info(`filterText: ${JSON.stringify(completionItem.filterText)}`);
      completionItem.range = new vscode.Range(
        new vscode.Position(position.line, position.character - this.trigger.length),
        new vscode.Position(position.line, position.character)
      );
      completionItem.insertText = new vscode.SnippetString(snippetBody);
      // console.info(`insertText: ${JSON.stringify(completionItem.insertText)}`);
      completionItem.detail = `PatternFly ${snippet.description} (release ${this.release})`;
      completionItem.documentation = new vscode.MarkdownString().appendCodeblock(completionItem.insertText.value);

      if (this.reactAutoImport) {
        if (match.indexOf(snippet.description) === -1) {
          // we do not have the import, need to insert it
          completionItem.additionalTextEdits = [
            lastMatchingIndex === -1
              ? new vscode.TextEdit(
                  new vscode.Range(document.positionAt(0), document.positionAt(0)),
                  `import { ${snippet.description} } from '@patternfly/react-core';\n`
                )
              : new vscode.TextEdit(
                  new vscode.Range(importPosition, importPosition),
                  leadingControlChars ? `${leadingControlChars}${snippet.description},` : ` ${snippet.description}, `
                )
          ];
        }
      }

      // console.info(asd);
      // console.info(`documentation: ${JSON.stringify(completionItem.documentation)}\n`);
      result.push(completionItem);
    }
    return new vscode.CompletionList(result);
  }
}
