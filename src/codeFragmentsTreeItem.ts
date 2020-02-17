import * as vscode from 'vscode';
import { IFragmentManager } from './fragmentManager';

export class CodeFragmentTreeItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly id: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command,
    public readonly children?: CodeFragmentChildTreeItem[],
    public readonly version?: string
  ) {
    super(label, children == undefined ? 
      vscode.TreeItemCollapsibleState.None : 
      vscode.TreeItemCollapsibleState.Expanded);
  }

  get tooltip(): string {
		return `${this.label}`;
  }
  
  get description(): string {
		return this.version;
	}

  contextValue = 'category';
}

export class CodeFragmentGroupTreeItem extends vscode.TreeItem {
  constructor(
    public readonly category: string,
    public readonly label: string,
    public readonly id: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command,
    public readonly children?: CodeFragmentChildTreeItem[],
    public readonly version?: string
  ) {
    super(label, children == undefined ? 
      vscode.TreeItemCollapsibleState.None : 
      vscode.TreeItemCollapsibleState.Expanded);
  }

  get tooltip(): string {
		return `${this.label}`;
  }
  
  get description(): string {
		return '';
	}

  contextValue = 'group';
}

export class CodeFragmentChildTreeItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly id: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command
  ) {
    super(label, vscode.TreeItemCollapsibleState.None);
  }

  get tooltip(): string {
		return `${this.label}`;
  }
  
  get description(): string {
		return '';
	}

  contextValue = 'component';
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
      return Promise.resolve(this.fragmentManager.getAllFragments().map(f =>
        new CodeFragmentTreeItem(
          f.category,
          f.id,
          vscode.TreeItemCollapsibleState.Collapsed,
          null,
          f.codeFragments.map(group => 
            new CodeFragmentGroupTreeItem(
              f.category,
              group.group,
              group.id,
              vscode.TreeItemCollapsibleState.Collapsed,
              null,
              group.children.map(ch => 
                new CodeFragmentChildTreeItem(
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
              ),
              this.fragmentManager.getVersion()
            )
          ),
          this.fragmentManager.getVersion()
        )
      ));
    } 
    return Promise.resolve(element.children);
  }
}
