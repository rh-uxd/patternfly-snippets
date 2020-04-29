## 2020.03 release notes (2020-03-10)
Packages released:
- [@patternfly/react-catalog-view-extension: 1.4.29](https://www.npmjs.com/package/@patternfly/react-catalog-view-extension/v/1.4.29)
- [@patternfly/react-charts: 5.3.12](https://www.npmjs.com/package/@patternfly/react-charts/v/5.3.12)
- [@patternfly/react-core: 3.146.0](https://www.npmjs.com/package/@patternfly/react-core/v/3.146.0)
- [@patternfly/react-inline-edit-extension: 2.17.29](https://www.npmjs.com/package/@patternfly/react-inline-edit-extension/v/2.17.29)
- [@patternfly/react-styles: 3.7.8](https://www.npmjs.com/package/@patternfly/react-styles/v/3.7.8)
- [@patternfly/react-table: 2.28.10](https://www.npmjs.com/package/@patternfly/react-table/v/2.28.10)
- [@patternfly/react-tokens: 2.8.8](https://www.npmjs.com/package/@patternfly/react-tokens/v/2.8.8)
- [@patternfly/react-topology: 2.14.29](https://www.npmjs.com/package/@patternfly/react-topology/v/2.14.29)
- [@patternfly/react-virtualized-extension: 1.4.30](https://www.npmjs.com/package/@patternfly/react-virtualized-extension/v/1.4.30)
- [@patternfly/react-icons: 3.15.11](https://www.npmjs.com/package/@patternfly/react-icons/v/3.15.11)

### Components
- **Background image:** 
  - Removed width attr from background image filter element ([#3758](https://github.com/patternfly/patternfly-react/pull/3758))
- **Data toolbar:** 
  - Cleaned up beta warning for data toolbar ([#3755](https://github.com/patternfly/patternfly-react/pull/3755))
- **Drawer:**
  - Added console warning to Drawer beta component ([#3856](https://github.com/patternfly/patternfly-react/pull/3856))
  - Updated drawer for Master/Detail support ([#3884](https://github.com/patternfly/patternfly-react/pull/3884))
- **Dropdown**
  - Updated to Destructure bubbleEvent from props to avoid it passing to button el ([#3894](https://github.com/patternfly/patternfly-react/pull/3894)) 
- **Button:** 
  - Added link icon position for link buttons ([#3798](https://github.com/patternfly/patternfly-react/pull/3798))
- **Card:** 
  - Added selectable and selected variation ([#3587](https://github.com/patternfly/patternfly-react/pull/3587))
- **Chip group:** 
  - Added a tooltip to the Chipgroup label ([#3826](https://github.com/patternfly/patternfly-react/pull/3826))
- **Data list:** 
  - Added compact data list ([#3807](https://github.com/patternfly/patternfly-react/pull/3807))
- **Data toolbar:** 
  - Added support for key with categoryName. ([#3880](https://github.com/patternfly/patternfly-react/pull/3880))
- **Dropdown:** 
  - Fixed keyboard selection of toggle causing selection of parent ([#3816](https://github.com/patternfly/patternfly-react/pull/3816))
- **File upload:** 
  - Added new beta file upload component ([#3865](https://github.com/patternfly/patternfly-react/pull/3865))
- **Input group:** 
  - Updated docs to be more readable ([#3839](https://github.com/patternfly/patternfly-react/pull/3839))
- **Modal:** 
  - Added description property ([#3821](https://github.com/patternfly/patternfly-react/pull/3821))
  - Moved description to separate component ([#3897](https://github.com/patternfly/patternfly-react/pull/3897))
- **Pagination:** 
  - Updated to calculate navigation input according to last page ([#3534](https://github.com/patternfly/patternfly-react/pull/3534))
- **Select:** 
  - Added inline filtering to checkbox select ([#3843](https://github.com/patternfly/patternfly-react/pull/3843))
  - Fix panel checkbox labels ([#3820](https://github.com/patternfly/patternfly-react/pull/3820))
- **Switch:** 
  - Updated to avoid switch id override by props ([#3706](https://github.com/patternfly/patternfly-react/pull/3706))
- **Tabs:** 
  - Updated tabs with nav examples + add Tab component to props docs ([#3527](https://github.com/patternfly/patternfly-react/pull/3527))
- **Tooltip:** 
  - Removed TooltipContent from propComponents ([#3800](https://github.com/patternfly/patternfly-react/pull/3800))
- **Wizard:** 
  - Used patternfly-styles to set the no padding modifier ([#3871](https://github.com/patternfly/patternfly-react/pull/3871))

### Catalog view extension
- **Catalog tile:** 
  - Removed truncation and maxLength props ([#3830](https://github.com/patternfly/patternfly-react/pull/3830))

### Other
- **Chore:**
  - Added experimental exports ([#3775](https://github.com/patternfly/patternfly-react/pull/3775))
  - Wrapped layout examples to fix codesandbox ([#3818](https://github.com/patternfly/patternfly-react/pull/3818))
  - Tested prerelease workflow ([#3868](https://github.com/patternfly/patternfly-react/pull/3868))
  - Removed exenv and lodash ([#3882](https://github.com/patternfly/patternfly-react/pull/3882))
  - Added jest test generator ([#3828](https://github.com/patternfly/patternfly-react/pull/3828))
  - Added experimental/components directory ([#3764](https://github.com/patternfly/patternfly-react/pull/3764))
  - Improved promote script ([#3812](https://github.com/patternfly/patternfly-react/pull/3812))
  - Fixed react-docs version ([#3879](https://github.com/patternfly/patternfly-react/pull/3879))
  - Updated Gatsby theme for patternfly org ([#3813](https://github.com/patternfly/patternfly-react/pull/3813))
  - Updated versions in react-core for react-icons ([#3760](https://github.com/patternfly/patternfly-react/pull/3760))
  - Updated additional versions in react-core for react-icons ([#3761](https://github.com/patternfly/patternfly-react/pull/3761))
- **Docs:** 
  - Updated readme to match new guidelines ([#3837](https://github.com/patternfly/patternfly-react/pull/3837))
  - Added GDPR banner to all pages ([#3831](https://github.com/patternfly/patternfly-react/pull/3831))
  - Added page titles for react docs & react icons pages ([#3851](https://github.com/patternfly/patternfly-react/pull/3851))
  - Fixed typo in README ([#3769](https://github.com/patternfly/patternfly-react/pull/3769))
- **Linting:** 
  - Fixed eslint recommendations ([#3858](https://github.com/patternfly/patternfly-react/pull/3858))
  - Added linting to react styles ([#3723](https://github.com/patternfly/patternfly-react/pull/3723))
  - Added linting react tokens ([#3725](https://github.com/patternfly/patternfly-react/pull/3725))
- **Ouia:** 
  - Updated to not omit ouiaContext ([#3872](https://github.com/patternfly/patternfly-react/pull/3872))

### Virtualized extension
- Resolved linter errors ([#3726](https://github.com/patternfly/patternfly-react/pull/3726))

### PF3
- **Chore:**
  - Enabled releasing patternfly 3 ([#3863](https://github.com/patternfly/patternfly-react/pull/3863))
  - Removed patternfly-3 packages ([#3852](https://github.com/patternfly/patternfly-react/pull/3852))
  - Created patternfly-3 branch ([#3846](https://github.com/patternfly/patternfly-react/pull/3846))