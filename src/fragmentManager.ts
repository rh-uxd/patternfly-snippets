import * as vscode from 'vscode';


//category with children, fragments
export class CodeFragmentCategory {
  constructor(
    public readonly id: string,
    public label: string,
    public children?: CodeFragmentContent[]
  ) { }
}

export class CodeFragmentContent {
  constructor(
    public readonly id: string,
    public label: string,
    public content: string
  ) { }
}

export class CodeFragmentCollection {
  constructor(
    public readonly fragments: CodeFragmentCategory[]
  ) { }
}

class PersistedCategories {
  constructor(
      public readonly category: string,
      public readonly codeFragments: PersistedFragment[]
  ) {
  }
}

class PersistedFragment {
  constructor(
      public readonly label: string,
      public readonly content: string
  ) {
  }
}

class ExportFile {
  constructor(
      public readonly codeCategories: PersistedCategories[]
  ) {
  }
}

export enum ImportResult {
  Success,
  NoFragments
}

export interface IFragmentManager {
  getAll(): CodeFragmentCategory[];
  saveCategory(label: string, children?: CodeFragmentContent[]): Thenable<string>;
  onFragmentsChanged(handler: () => void);
}

export class FragmentManager implements IFragmentManager {
  private codeFragments: CodeFragmentCollection = undefined;
  private readonly fragmentsChangeEvent: Array<() => void> = [];

  constructor(
    private readonly extensionContext: vscode.ExtensionContext
  ) { }

  public initialize(): Thenable<void> {
    this.codeFragments = new CodeFragmentCollection([]);
    Promise.resolve(this.importDefaults());

    return this.extensionContext.globalState.update(
      'CodeFragmentCollection',
      this.codeFragments
    );
  }

  public getFragmentContent(id: string): CodeFragmentContent {
    let content = this.extensionContext.globalState.get<CodeFragmentContent>(id);
    return content;
  }

  public async saveCategory(label: string, children: CodeFragmentContent[]): Promise<string> {
    const id = 'CodeFragmentCategory' + this.generateId();
    const header = new CodeFragmentCategory(
      id,
      label,
      children
    );
    this.codeFragments.fragments.push(header);
    
    await this.persistCodeFragmentCollection();

    return id;
  }

  public getAll(): CodeFragmentCategory[] {
    return this.codeFragments.fragments;
  }

  public onFragmentsChanged(handler: () => void) {
    if (handler) {
      this.fragmentsChangeEvent.push(handler);
    }
  }

  public async importDefaults(): Promise<ImportResult> {

    //todo - add back file loader
    //const uri = new uri('snippets/codeFragments.json');
    // const uri = await vscode.window.showOpenDialog(
    //     {
    //         canSelectFiles: true,
    //         canSelectFolders: false,
    //         canSelectMany: false,
    //         filters: {
    //             'Json files': ['json'],
    //             'All files': ['*']
    //         },
    //     });

    // if (!uri) {
    //     return;
    // }
    // const data = await this.readFileAsync('./src/snippets/codeFragments.json');
    const data = `{ 
    "codeCategories": [
        { 
            "category": "Components",
            "codeFragments": [
                {
                    "label": "Example fragment",
                    "content": "function foo() {alert('Thank you for using the Code Fragments extension!');}"
                },
                {
                    "label": "Example fragment two",
                    "content": "function foo() { alert('Thank you for using the Code Fragments extension!'); }"
                }
            ]
        },
        { 
            "category": "Demos",
            "codeFragments": [
                {
                    "label": "Example demo",
                    "content": "function demo() {alert('Thank you for using the Code Fragments extension!');}"
                },
                {
                    "label": "Example demo two",
                    "content": "function demo() { alert('Thank you for using the Code Fragments extension!'); }"
                }
            ]
        },
        { 
            "category": "Layouts",
            "codeFragments": [
                {
                    "label": "Example layout",
                    "content": "function layout() {alert('Thank you for using the Code Fragments extension!');}"
                },
                {
                    "label": "Example layout two",
                    "content": "function layout() { alert('Thank you for using the Code Fragments extension!'); }"
                }
            ]
        }
    ]}`;

    if (data) {
        const json: ExportFile = JSON.parse(data);
        const myPromises = [];
        if (json.codeCategories && json.codeCategories.length > 0) {
            json.codeCategories.forEach(category => {
                // create new category
                const codeFragments = [];
                if (category.codeFragments && category.codeFragments.some(f => !!f.content && !!f.label)) {
                    category.codeFragments.map(fragment => {
                        const id = 'CodeFragment' + this.generateId();
                        codeFragments.push(new CodeFragmentContent(id, fragment.label, fragment.content));
                        this.saveCodeFragmentContent(id, fragment.label, fragment.content);
                    });
                } 
                let task = this.saveCategory(category.category, codeFragments);
                myPromises.push(task);
            })
            await Promise.all(myPromises);
            return ImportResult.Success;
        } else {
            return ImportResult.NoFragments;
        }
    } else {
        return ImportResult.Success;
    }
}

  // private readFileAsync(filename: string): Thenable<string> {
  //     return new Promise((resolve, reject) => {
  //         fs.readFile(filename, 'utf8', (err, data) => {
  //             if (err) {
  //                 reject(err);
  //             }

  //             resolve(data);
  //         });
  //     });
  // }

  private saveCodeFragmentContent(id: string, label: string, content: string): string {
    this.extensionContext.globalState.update(
      id,
      new CodeFragmentContent(
        id,
        label,
        content
      )
    );

    return id;
  }

  private persistCodeFragmentCollection(): Thenable<void> {
    return this.extensionContext.globalState.update(
      'CodeFragmentCollection',
      this.codeFragments
    );
  }

  private generateId(): string {
    return Math.floor((1 + Math.random()) * 0x1000000000000).toString();
  }

  private fireFragmentsChanged() {
    this.fragmentsChangeEvent.forEach(h => h());
  }
}
