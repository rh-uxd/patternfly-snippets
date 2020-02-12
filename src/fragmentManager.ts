import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

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
      public id: string,
      public readonly category: string,
      public readonly codeFragments: CodeGroup[]
  ) {
  }
}

class CodeGroup {
  constructor(
    public id: string,
    public readonly group: string,
    public readonly children: PersistedFragment[]
  ) {
  }
}

class PersistedFragment {
  constructor(
      public id: string,
      public readonly label: string,
      public readonly content: string
  ) {
  }
}

export class ExportFile {
  constructor(
      public codeCategories: PersistedCategories[]
  ) {
  }
}

export enum ImportResult {
  Success,
  NoFragments
}

export interface IFragmentManager {
  getAll(): CodeFragmentCategory[];
  getAllFragments(): PersistedCategories[];
  onFragmentsChanged(handler: () => void): void;
  getVersion(): string;
  toggleCommentsInFragments(): void;
}

export class FragmentManager implements IFragmentManager {
  private codeFragments: CodeFragmentCollection = undefined;
  private allLoadedCodeFragments: ExportFile = undefined;
  private readonly fragmentsChangeEvent: Array<() => void> = [];
  private fragmentMap = new Map<string, CodeFragmentContent>();
  private loadedVersion: string = '2020.01';
  private includeCommentsInFragment: boolean = undefined;

  constructor(
    private readonly extensionContext: vscode.ExtensionContext
  ) { }

  public initialize(): void {
    this.codeFragments = new CodeFragmentCollection([]);
    const config = vscode.workspace.getConfiguration('codeFragments');
    this.includeCommentsInFragment = config.get('includeCommentsInFragment');
    Promise.resolve(this.importDefaults());
  }

  public getFragmentContent(id: string): CodeFragmentContent {
    let content = this.fragmentMap.get(id);
    return content;
  } d

  public getAll(): CodeFragmentCategory[] {
    return this.codeFragments.fragments;
  }

  public getAllFragments(): PersistedCategories[] {
    return this.allLoadedCodeFragments.codeCategories;
  }

  public getVersion(): string {
    return this.loadedVersion;
  }

  public toggleCommentsInFragments(includeCommentsInFragment? : boolean): void {
    this.includeCommentsInFragment = includeCommentsInFragment !== undefined ? includeCommentsInFragment : !this.includeCommentsInFragment;
    const config = vscode.workspace.getConfiguration('codeFragments');
    config.update('includeCommentsInFragment', this.includeCommentsInFragment, true);
  }

  public onFragmentsChanged(handler: () => void) {
    if (handler) {
      this.fragmentsChangeEvent.push(handler);
    }
  }

  public reimportDefaults(version?: string): ImportResult {
    const result = this.importDefaults(version);
    this.fireFragmentsChanged();
    return result;
  }

  public importDefaults(version?: string): ImportResult {
    const versionToLoad = version || this.getVersion();
    this.loadedVersion = versionToLoad;
    const snippetPath = this.includeCommentsInFragment ? `../snippets/codeFragmentsWithComments_${versionToLoad}.json` : `../snippets/codeFragmentsNoComments_${versionToLoad}.json`;
    const pathToSnippet = path.join(__dirname, snippetPath);
    console.info(`path: ${pathToSnippet}`, new Date().toISOString());
    const data = fs.readFileSync(pathToSnippet, 'utf8');
    // console.info('data loaded', new Date().toISOString());

    if (data) {
        const json: ExportFile = JSON.parse(data);
        this.allLoadedCodeFragments = json;
        if (json.codeCategories && json.codeCategories.length > 0) {
          json.codeCategories.forEach((category) => {
            category.id = 'CodeCategory' + this.generateId();

            if (category.codeFragments && category.codeFragments.length > 0) {
              category.codeFragments.forEach(group => {
                group.id = 'CodeGroup' + this.generateId();
                if (group.children && group.children.some(f => !!f.content && !!f.label)) {
                  group.children.map(fragment => {
                      const id = 'CodeFragment' + this.generateId();
                      fragment.id = id;
                      this.saveCodeFragmentContent(id, fragment.label, fragment.content);
                  });
                } 
              });
            }
          });
        }
        console.info('load complete', new Date().toISOString());
        return ImportResult.Success;
    } else {
        return ImportResult.Success;
    } 
  }

  private saveCodeFragmentContent(id: string, label: string, content: string): string {
    this.fragmentMap.set(id, new CodeFragmentContent(
      id,
      label,
      content
    ));
    return id;
  }

  private generateId(): string {
    return Math.floor((1 + Math.random()) * 0x1000000000000).toString();
  }

  private fireFragmentsChanged() {
    this.fragmentsChangeEvent.forEach(h => h());
  }
}
