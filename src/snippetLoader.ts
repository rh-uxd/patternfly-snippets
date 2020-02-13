import * as vscode from 'vscode';
import * as path from 'path';
import { isArray } from 'util';

export class SnippetCompletionItemProvider implements vscode.CompletionItemProvider {
  private completions = new vscode.CompletionList();
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
      // console.info(`documentation: ${JSON.stringify(completionItem.documentation)}\n`);
      this.completions.items.push(completionItem);
    }
		return this.completions;
	}
}