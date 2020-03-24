import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

//category with children, fragments
export class CodeFragmentCategory {
  constructor(public readonly id: string, public label: string, public children?: CodeFragmentContent[]) {}
}

export class CodeFragmentContent {
  constructor(public readonly id: string, public label: string, public content: string) {}
}

export class CodeFragmentCollection {
  constructor(public readonly fragments: CodeFragmentCategory[]) {}
}

class PersistedCategories {
  constructor(public id: string, public readonly category: string, public readonly codeFragments: CodeGroup[]) {}
}

class CodeGroup {
  constructor(public id: string, public readonly group: string, public readonly children: PersistedFragment[]) {}
}

class PersistedFragment {
  constructor(public id: string, public readonly label: string, public readonly content: string) {}
}

class CodeCategory {
  constructor(public codeCategories: PersistedCategories[]) {}
}

export class ExportFile {
  constructor(public react: CodeCategory, public core: CodeCategory) {}
}

export enum ImportResult {
  Success,
  NoFragments
}

export interface IFragmentManager {
  getAll(): CodeFragmentCategory[];
  getAllFragments(type: 'react' | 'core'): PersistedCategories[];
  onFragmentsChanged(handler: () => void): void;
  getVersion(): string;
  toggleCommentsInFragmentsReact(): void;
}

export class FragmentManager implements IFragmentManager {
  private codeFragments: CodeFragmentCollection = undefined;
  private allLoadedCodeFragments: ExportFile = undefined;
  private readonly fragmentsChangeEvent: Array<() => void> = [];
  private fragmentMap = new Map<string, CodeFragmentContent>();
  private loadedVersion: string;
  private reactIncludeCommentsInFragment: boolean;
  private reactAutoImport: boolean;
  private type: 'react' | 'core';

  constructor(
    private readonly extensionContext: vscode.ExtensionContext,
    type: 'react' | 'core'
  ) {
    this.type = type;
  }

  public initialize(): void {
    this.codeFragments = new CodeFragmentCollection([]);
    const config = vscode.workspace.getConfiguration('patternflySnippets');
    if (this.type === 'react') {
      this.reactIncludeCommentsInFragment = config.get('reactIncludeCommentsInFragment');
      this.reactAutoImport = config.get('reactAutoImport');
    }
    this.loadedVersion = config.get(this.type === 'react' ? 'reactPatternflyRelease' : 'corePatternflyRelease');
    Promise.resolve(this.importDefaults());
  }

  public getFragmentContent(id: string): CodeFragmentContent {
    let content = this.fragmentMap.get(id);
    return content;
  }

  public getAll(): CodeFragmentCategory[] {
    return this.codeFragments.fragments;
  }

  public getAllFragments(type: 'react' | 'core'): PersistedCategories[] {
    return this.allLoadedCodeFragments[type].codeCategories;
  }

  public getVersion(): string {
    return this.loadedVersion;
  }

  public toggleCommentsInFragmentsReact(reactIncludeCommentsInFragment?: boolean): void {
    this.reactIncludeCommentsInFragment =
      reactIncludeCommentsInFragment !== undefined ? reactIncludeCommentsInFragment : !this.reactIncludeCommentsInFragment;
    if (reactIncludeCommentsInFragment === undefined) {
      const config = vscode.workspace.getConfiguration('patternflySnippets');
      config.update('reactIncludeCommentsInFragment', this.reactIncludeCommentsInFragment, true);
    }
    vscode.window.showInformationMessage(this.reactIncludeCommentsInFragment ? 'Enabled prop comments' : 'Disabled prop comments');
  }

  public toggleAutoImportReact(reactAutoImport?: boolean): void {
    this.reactAutoImport = reactAutoImport !== undefined ? reactAutoImport : !this.reactAutoImport;
    if (reactAutoImport === undefined) {
      const config = vscode.workspace.getConfiguration('patternflySnippets');
      config.update('reactAutoImport', this.reactAutoImport, true);
    }
    vscode.window.showInformationMessage(this.reactAutoImport ? 'Enabled auto import' : 'Disabled auto import');
  }

  public updateVersionUsed(release: string): void {
    this.loadedVersion = release;
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

  public loadFragments(version: string) {
    const snippetPath = `../../snippets/${this.type}/fragments_${version}.json`;
    const pathToFragments = path.join(__dirname, snippetPath);
    console.info(`${this.type} path: ${pathToFragments}`, new Date().toISOString());
    const data = fs.readFileSync(pathToFragments, 'utf8');
    return data;
  }

  public saveSnippetsToFragments(data: string, type: string) {
    const json: CodeCategory = JSON.parse(data);
    if (json.codeCategories && json.codeCategories.length > 0) {
      json.codeCategories.forEach((category, index) => {
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
        } else {
          json.codeCategories.splice(index, 1);
        }
      });
    }
    this.allLoadedCodeFragments = {
      ...this.allLoadedCodeFragments,
      [type]: json
    }
  }

  public importDefaults(version?: string): ImportResult {
    const versionToLoad = version || this.getVersion();
    this.loadedVersion = versionToLoad;
    
    const data = this.loadFragments(versionToLoad);

    if (data) {
      this.saveSnippetsToFragments(data, this.type);
      console.info(`load complete ${this.type}`, new Date().toISOString());
      return ImportResult.Success;
    } else {
      return ImportResult.Success;
    }
  }

  private saveCodeFragmentContent(id: string, label: string, content: string): string {
    this.fragmentMap.set(id, new CodeFragmentContent(id, label, content));
    return id;
  }

  private generateId(): string {
    return Math.floor((1 + Math.random()) * 0x1000000000000).toString();
  }

  private fireFragmentsChanged() {
    this.fragmentsChangeEvent.forEach(h => h());
  }
}
