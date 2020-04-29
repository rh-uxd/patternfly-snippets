## 2020.02 release notes (2020-02-18)
Packages released:
- [@patternfly/react-catalog-view-extension: 1.4.11](https://www.npmjs.com/package/@patternfly/react-catalog-view-extension/v/1.4.11)
- [@patternfly/react-charts: 5.3.5](https://www.npmjs.com/package/@patternfly/react-charts/v/5.3.5)
- [@patternfly/react-core: 3.140.11](https://www.npmjs.com/package/@patternfly/react-core/v/3.140.11)
- [@patternfly/react-inline-edit-extension: 2.17.11](https://www.npmjs.com/package/@patternfly/react-inline-edit-extension/v/2.17.11)
- [@patternfly/react-styles: 3.7.4](https://www.npmjs.com/package/@patternfly/react-styles/v/3.7.4)
- [@patternfly/react-table: 2.27.11](https://www.npmjs.com/package/@patternfly/react-table/v/2.27.11)
- [@patternfly/react-tokens: 2.8.4](https://www.npmjs.com/package/@patternfly/react-tokens/v/2.8.4)
- [@patternfly/react-topology: 2.14.11](https://www.npmjs.com/package/@patternfly/react-topology/v/2.14.11)
- [@patternfly/react-virtualized-extension: 1.4.12](https://www.npmjs.com/package/@patternfly/react-virtualized-extension/v/1.4.12)
- [@patternfly/react-icons: 3.15.3](https://www.npmjs.com/package/@patternfly/react-icons/v/3.15.3)


### Components
- **Context selector:** 
  - Updated signature for context selector ([#3697](https://github.com/patternfly/patternfly-react/pull/3697))
- **Data toolbar:** 
  - Updated html structure to match core ([#3701](https://github.com/patternfly/patternfly-react/pull/3710))
- **Popover:** 
  - Added min-width override property ([#3601](https://github.com/patternfly/patternfly-react/pull/3601))
- **Radio:**
  - Added support for optional description ([#3621](https://github.com/patternfly/patternfly-react/pull/3621))
- **Select:**
  - Handled undefined default for checkbox select ([#3711](https://github.com/patternfly/patternfly-react/pull/3711))
- **Simple list:** 
  - Added Simple list component ([#3645](https://github.com/patternfly/patternfly-react/pull/3645))
- **Wizard:** 
  - Added type to wizard context ([#3572](https://github.com/patternfly/patternfly-react/pull/3572))

### Catalog view extension
- **Catalog tile:** 
  - Adjusted max width of header image ([#3628](https://github.com/patternfly/patternfly-react/pull/3628))
  - Reduced padding between badge and logo ([#3644](https://github.com/patternfly/patternfly-react/pull/3644))
  - Fixed styles that stopped working ([#3635](https://github.com/patternfly/patternfly-react/pull/3635))
  - Fixed linting errors ([#3714](https://github.com/patternfly/patternfly-react/pull/3714))

### Table
- Added inline edit to table ([#3058](https://github.com/patternfly/patternfly-react/issues/3058))
- Reverted IHeaderRow interface change ([#3746](https://github.com/patternfly/patternfly-react/pull/3746))
- Fixed that column functions are not always equal ([#3612](https://github.com/patternfly/patternfly-react/pull/3612))
- Added support for truncated column headers ([#3729](https://github.com/patternfly/patternfly-react/pull/3729))

### Other
- **Build:**
  - Updated CircleCi config for pricing ([#3654](https://github.com/patternfly/patternfly-react/pull/3654))
  - Made change to use machine instance ([#3712](https://github.com/patternfly/patternfly-react/pull/3712))
  - Fixed typo, added md lint to CircleCi ([#3692](https://github.com/patternfly/patternfly-react/pull/3692))
- **Chore:** 
  - Phrased non production components as beta ([#3663](https://github.com/patternfly/patternfly-react/pull/3663))
  - Linted React topology ([#3721](https://github.com/patternfly/patternfly-react/pull/3721))
  - For icons made change to use absolute import paths ([#3517](https://github.com/patternfly/patternfly-react/pull/3517))
  - Fixed broken link in issue template ([#3634](https://github.com/patternfly/patternfly-react/pull/3634))
- **Ci:** 
  - Parallelized tests and run in PRs ([#3627](https://github.com/patternfly/patternfly-react/pull/3627))
- **Demos:** 
  - Fixed the TextInput type in filter table demo ([#3652](https://github.com/patternfly/patternfly-react/pull/3652))
- **Docs:** 
  - Updated table property descriptions ([#3745](https://github.com/patternfly/patternfly-react/pull/3745))
  - Updated node version in readme ([#3741](https://github.com/patternfly/patternfly-react/pull/3741))
  - Bumped Gatsby ([#3657](https://github.com/patternfly/patternfly-react/pull/3657))
  - Merged branch gatsby-theme-patternfly-org ([#3651](https://github.com/patternfly/patternfly-react/pull/3651))
  - Merged patternfly-org branch ([#3619](https://github.com/patternfly/patternfly-react/pull/3619))
- **Linting:** 
  - Eslint react-table ([#3693](https://github.com/patternfly/patternfly-react/pull/3693))
  - Fixed linting errors ([#3717](https://github.com/patternfly/patternfly-react/pull/3713))
  - Resolved existing linting errors ([#3715](https://github.com/patternfly/patternfly-react/pull/3715))
  - Added react-hooks to eslint-plugin-patternfly-react ([#3636](https://github.com/patternfly/patternfly-react/pull/3636))
  - Fixed linting errors ([#3713](https://github.com/patternfly/patternfly-react/pull/3713))

### PF3
- **Slider:**
  - Added limit for lowest possible value of slider ([#3660](https://github.com/patternfly/patternfly-react/pull/3660)) 