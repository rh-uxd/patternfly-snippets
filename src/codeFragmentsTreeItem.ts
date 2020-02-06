import * as vscode from 'vscode';
import { IFragmentManager } from './fragmentManager';


export class CodeFragmentTreeItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly id: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command,
    public readonly children?: CodeFragmentTreeItem[]
  ) {
    super(label, children == undefined ? 
      vscode.TreeItemCollapsibleState.None : 
      vscode.TreeItemCollapsibleState.Expanded);
  }
}

export class CodeFragmentProvider implements vscode.TreeDataProvider<CodeFragmentTreeItem> {
  private onDidChangeTreeDataEmitter: vscode.EventEmitter<CodeFragmentTreeItem | undefined> =
    new vscode.EventEmitter<CodeFragmentTreeItem | undefined>();
  public readonly onDidChangeTreeData: vscode.Event<CodeFragmentTreeItem | undefined> = this.onDidChangeTreeDataEmitter.event;

  constructor(
    private readonly fragmentManager: IFragmentManager
  ) {
    fragmentManager.onFragmentsChanged(() => this.onDidChangeTreeDataEmitter.fire());
  }

  public getTreeItem(element: CodeFragmentTreeItem): vscode.TreeItem {
    return element;
  }

  public getChildren(element?: CodeFragmentTreeItem): Thenable<CodeFragmentTreeItem[]> {
    if (!element) {
      return Promise.resolve(this.fragmentManager.getAll().map(f =>
        new CodeFragmentTreeItem(
          f.label,
          f.id,
          vscode.TreeItemCollapsibleState.Expanded,
          null,
          f.children.map(ch => 
            new CodeFragmentTreeItem(
              ch.label,
              ch.id,
              vscode.TreeItemCollapsibleState.None,
              {
                arguments: [ch.id],
                command: 'codeFragments.insertCodeFragment',
                title: 'Insert Code Fragment',
                tooltip: 'Insert Code Fragment' //can put component tooltip here maybe???
              }
            )
          )
        )
      ));
    } 
    return Promise.resolve(element.children);
  }
}
