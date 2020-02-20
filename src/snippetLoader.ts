import * as vscode from 'vscode';
import * as path from 'path';
import { isArray } from 'util';

export class SnippetCompletionItemProvider implements vscode.CompletionItemProvider {
  private snippets: any;
  private release: string;

	constructor(release: string, withComments: boolean) {
    const pathToSnippet = path.join(__dirname, `../snippets/snippets${withComments ? 'WithComments' : 'NoComments'}_${release}.json`);
    console.info(`Loading snippet from ${pathToSnippet}`);
    this.snippets = require(pathToSnippet);;
    this.release = release;
	}

	public provideCompletionItems(
		document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken,
	): vscode.CompletionList {
    const linePrefix: string = document.lineAt(position).text.substr(position.character - 1, 1);
    let result: vscode.CompletionItem[] = [];
    if (linePrefix !== '!' && linePrefix !== '#') {
      return;
    }

    const wholeText = document.getText();
    const importRegex = /\{([^}]+)\}.*@patternfly\/react-core/g;
    let match: string[] = [];
    let matcher = importRegex.exec(wholeText);
    let lastMatchingIndex = -1;
    let leadingControlChars = '';
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
      const cleanedupMatches = matcher[1].trim().replace(/[\n\r\t]/g, '').split(/,\s*/);
      match = match.concat(cleanedupMatches);
      matcher = importRegex.exec(wholeText);
    }
    let importInsert: vscode.TextEdit;
    const importPosition = document.positionAt(lastMatchingIndex + 1);
    if (lastMatchingIndex === -1) {
      // no import found, add it
      const startPos = new vscode.Position(0, 0);
      importInsert = new vscode.TextEdit(new vscode.Range(startPos, startPos), `import { asd } from '@patternfly/react-core';\n`);
    }

    for (const snippetName of Object.keys(this.snippets)) {
      // console.info(`snippetName: ${JSON.stringify(snippetName)}`);
      const snippet = this.snippets[snippetName];
      const completionItem = new vscode.CompletionItem(snippet.prefix, vscode.CompletionItemKind.Snippet);
      completionItem.filterText = snippet.prefix;
      // console.info(`filterText: ${JSON.stringify(completionItem.filterText)}`);
      completionItem.range = new vscode.Range(new vscode.Position(position.line, position.character - 1), new vscode.Position(position.line, position.character));
      completionItem.insertText = new vscode.SnippetString(
        isArray(snippet.body)
          ? snippet.body.join("\n")
          : snippet.body,
      );
      // console.info(`insertText: ${JSON.stringify(completionItem.insertText)}`);
      completionItem.detail = `PatternFly ${snippet.description} (release ${this.release})`;
      completionItem.documentation = new vscode.MarkdownString().appendCodeblock(completionItem.insertText.value);
      
      if (match.indexOf(snippet.description) === -1) {
        importInsert = new vscode.TextEdit(new vscode.Range(importPosition, importPosition), leadingControlChars ? `${leadingControlChars}${snippet.description},` : ` ${snippet.description}, `);
        // we do not have the import, need to insert it
        completionItem.additionalTextEdits = [
          importInsert
        ];
      }
      
      // console.info(asd);
      // console.info(`documentation: ${JSON.stringify(completionItem.documentation)}\n`);
      result.push(completionItem);
    }
		return new vscode.CompletionList(result);
	}
}