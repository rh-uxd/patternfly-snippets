## 2019.10 release notes (2019-11-25)
Packages released:
- [@patternfly/react-catalog-view-extension@1.1.38](https://www.npmjs.com/package/@patternfly/react-catalog-view-extension/v/1.1.38)
- [@patternfly/react-charts@5.2.2](https://www.npmjs.com/package/@patternfly/react-charts/v/5.2.2)
- [@patternfly/react-core@3.124.1](https://www.npmjs.com/package/@patternfly/react-core/v/3.124.1)
- [@patternfly/react-inline-edit-extension@2.13.9](https://www.npmjs.com/package/@patternfly/react-inline-edit-extension/v/2.13.9)
- [@patternfly/react-styles@3.6.11](https://www.npmjs.com/package/@patternfly/react-styles/v/3.6.11)
- [@patternfly/react-table@2.24.41](https://www.npmjs.com/package/@patternfly/react-table/v/2.24.41)
- [@patternfly/react-tokens@2.7.10](https://www.npmjs.com/package/@patternfly/react-tokens/v/2.7.10)
- [@patternfly/react-topology@2.11.27](https://www.npmjs.com/package/@patternfly/react-topology/v/2.11.27)
- [@patternfly/react-virtualized-extension@1.3.40](https://www.npmjs.com/package/@patternfly/react-virtualized-extension/v/1.3.40)
- [@patternfly/react-icons@3.14.23](https://www.npmjs.com/package/@patternfly/react-icons/v/3.14.23)

### Charts
- Put back the secondary title when showing percentage in the Donut Chart([#3299](https://github.com/patternfly/patternfly-react/pull/3299))
- Added Interactive legend example ([#3253](https://github.com/patternfly/patternfly-react/pull/3253))

### Components
- **About modal:**
   - Removed appendTo from props passed to div ([#3239](https://github.com/patternfly/patternfly-react/pull/3239))
- **Accordion:**  
  - Added a prop to allow the box shadow to be removed ([#3309](https://github.com/patternfly/patternfly-react/pull/3309))
- **Button:**  
  - Added support for setting tab index unless not button and disabled ([#3240](https://github.com/patternfly/patternfly-react/pull/3240))
- **Data toolbar:**  
  - Moved and wrapped chips in expandable content ([#3319](https://github.com/patternfly/patternfly-react/pull/3319))
- **Dropdown:**  
  - Added split button action variant ([#3307](https://github.com/patternfly/patternfly-react/pull/3307))
  - Updated keyboard interaction ([#3293](https://github.com/patternfly/patternfly-react/pull/3293))
- **Flex:**
  - In breakpointMods, set the breakpoint as optional and added enums  ([#3258](https://github.com/patternfly/patternfly-react/pull/3258))
  - Fixed typo in align and justify modifiers ([#3328](https://github.com/patternfly/patternfly-react/pull/3328))
- **Form:** 
  - Added validated variant to form inputs ([#3220](https://github.com/patternfly/patternfly-react/pull/3220))
- **Options menu:**
  - Removed the `<i>` element around selected item svg ([#3238](https://github.com/patternfly/patternfly-react/pull/3238))
- **Pagination:**
  - Fixed previous page navigation issues with 1 row per page ([#3297](https://github.com/patternfly/patternfly-react/pull/3297))
- **Select:**
  - Fixed displaying pre-selected input ([#3305](https://github.com/patternfly/patternfly-react/pull/3305))
  - Added the ability to have custom content in the select menu ([#3333](https://github.com/patternfly/patternfly-react/pull/3333))
  - Removed `<form>` from typeahead and checkbox selects ([#3298](https://github.com/patternfly/patternfly-react/pull/3298))
- **Wizard:**
  - Removed appendTo from props passed to div ([#3239](https://github.com/patternfly/patternfly-react/pull/3239))

### Catalog view extension
- **Chore:**
    - Added @patternfly/react-catalog-view-extension package to release promotion script ([#3260](https://github.com/patternfly/patternfly-react/pull/3260))
    - Removed unused packages ([#3332](https://github.com/patternfly/patternfly-react/pull/3332))
    - fixed checbox margin on filter side panel ([#3287](https://github.com/patternfly/patternfly-react/pull/3287))
    - fixed @types errors when using the extension ([#3284](https://github.com/patternfly/patternfly-react/pull/3284))
    - Removed unused dev dependencies from package.json ([#3275](https://github.com/patternfly/patternfly-react/pull/3275))
    - Added check for sass changes ([#3271](https://github.com/patternfly/patternfly-react/pull/3271))
- **Catalog tile:**  
    - Removed unneeded selector ([#3331](https://github.com/patternfly/patternfly-react/pull/3331))
    - Edited target selector ([#3291](https://github.com/patternfly/patternfly-react/pull/3291))
    - Removed margin and fixed hidden text ([#3285](https://github.com/patternfly/patternfly-react/pull/3285))
    - Updated scss and add class to image ([#3282](https://github.com/patternfly/patternfly-react/pull/3282))
- **Properties side panel:**
  - Aligned sass file with correct styles for properties panel ([#3236](https://github.com/patternfly/patternfly-react/pull/3236))

### Table
- Added types, examples, and demo for onRowClick ([#3265](https://github.com/patternfly/patternfly-react/pull/3265))
- Fixed types for table transforms ([#3203](https://github.com/patternfly/patternfly-react/pull/3203))

### Topology
- Set topology container to take full height of the view ([#3314](https://github.com/patternfly/patternfly-react/pull/3314))

### Other
- **Chore:** 
  - Updated gatsby-browser.js ([#3313](https://github.com/patternfly/patternfly-react/pull/3313))
  - Added use of node 10, more resources for doc build ([#3278](https://github.com/patternfly/patternfly-react/pull/3278))
  - Added new package to promotion script ([#3260](https://github.com/patternfly/patternfly-react/pull/3260))
  - Updated github templates ([#3261](https://github.com/patternfly/patternfly-react/pull/3261))
  - Upgraded react-bootstrap to fix React deprecated lifecycle method warnings ([#3249](https://github.com/patternfly/patternfly-react/pull/3249))
- **Demo:**  
  - Updated Pagination Table demo to add Spinner and empty state ([#3294](https://github.com/patternfly/patternfly-react/pull/3294))
- **Demo-app-ts:**  
  - Increased strict checks for react-integration ([#3222](https://github.com/patternfly/patternfly-react/pull/3222))
- **Docs:**  
  - Bumped gatsby-theme-patternfly-org  ([#3269](https://github.com/patternfly/patternfly-react/pull/3269))
  - fix(README.md) ([#3254](https://github.com/patternfly/patternfly-react/pull/3254))

### PF3
  - **Date and time picker:** 
    - Properly imported formatTime to DateTimePicker ([#3303](https://github.com/patternfly/patternfly-react/pull/3303))