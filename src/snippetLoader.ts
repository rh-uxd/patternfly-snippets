import * as vscode from 'vscode';
import * as path from 'path';
import { isArray } from 'util';

export const addAutoImport = (document: vscode.TextDocument) => {
  let leadingControlChars: string = '';
  let importPosition: vscode.Position;
  let match: string[] = [];
  let lastMatchingIndex: number = -1;
  const wholeText = document.getText();
  const importRegex = /\{([^}]+)\}.*@patternfly\/react-core/g;
  let matcher = importRegex.exec(wholeText);
  while (matcher != null) {
    leadingControlChars = '';
    lastMatchingIndex = matcher.index;
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
  private autoImport: boolean;

  constructor(release: string, withComments: boolean, autoImport: boolean) {
    const pathToSnippet = path.join(
      __dirname,
      `../snippets/snippets${withComments ? 'WithComments' : 'NoComments'}_${release}.json`
    );
    console.info(`Loading snippet from ${pathToSnippet}`);
    this.snippets = require(pathToSnippet);
    this.release = release;
    this.autoImport = autoImport;
  }

  public provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): vscode.CompletionList {
    const linePrefix: string = document.lineAt(position).text.substr(position.character - 1, 1);
    if (linePrefix !== '!' && linePrefix !== '#') {
      return;
    }
    let result: vscode.CompletionItem[] = [];

    const { leadingControlChars, importPosition, match, lastMatchingIndex } = addAutoImport(document);

    for (const snippetName of Object.keys(this.snippets)) {
      // console.info(`snippetName: ${JSON.stringify(snippetName)}`);
      const snippet = this.snippets[snippetName];
      const completionItem = new vscode.CompletionItem(snippet.prefix, vscode.CompletionItemKind.Snippet);
      completionItem.filterText = snippet.prefix;
      // console.info(`filterText: ${JSON.stringify(completionItem.filterText)}`);
      completionItem.range = new vscode.Range(
        new vscode.Position(position.line, position.character - 1),
        new vscode.Position(position.line, position.character)
      );
      completionItem.insertText = new vscode.SnippetString(
        isArray(snippet.body) ? snippet.body.join('\n') : snippet.body
      );
      // console.info(`insertText: ${JSON.stringify(completionItem.insertText)}`);
      completionItem.detail = `PatternFly ${snippet.description} (release ${this.release})`;
      completionItem.documentation = new vscode.MarkdownString().appendCodeblock(completionItem.insertText.value);

      if (this.autoImport) {
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
