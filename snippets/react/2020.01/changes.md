## 2020.01 release notes (2020-01-28)
Packages released:
- [@patternfly/react-catalog-view-extension@1.2.5](https://www.npmjs.com/package/@patternfly/react-catalog-view-extension@1.2.5)
- [@patternfly/react-charts@5.2.21](https://www.npmjs.com/package/@patternfly/react-charts@5.2.21)
- [@patternfly/react-core@3.134.2](https://www.npmjs.com/package/@patternfly/react-core@3.134.2)
- [@patternfly/react-inline-edit-extension@2.15.6](https://www.npmjs.com/package/@patternfly/react-inline-edit-extension@2.15.6)
- [@patternfly/react-styles@3.6.26](https://www.npmjs.com/package/@patternfly/react-styles/v/3.6.26)
- [@patternfly/react-table@2.25.6](https://www.npmjs.com/package/@patternfly/react-table@2.25.6)
- [@patternfly/react-tokens@2.7.25](https://www.npmjs.com/package/@patternfly/react-tokens@2.7.25)
- [@patternfly/react-topology@2.12.5](https://www.npmjs.com/package/@patternfly/react-topology@2.12.5)
- [@patternfly/react-virtualized-extension@1.3.93](https://www.npmjs.com/package/@patternfly/react-virtualized-extension@1.3.93)
- [@patternfly/react-icons@3.14.39](https://www.npmjs.com/package/@patternfly/react-icons@3.14.39)

### Components
- **About modal:** 
  - Added type safety to default props ([#3536](https://github.com/patternfly/patternfly-react/pull/3536))
- **Alert:** 
  - Accessibility updates to alert for toast alerts ([#3519](https://github.com/patternfly/patternfly-react/pull/3519))
  - Fixed integration test regression ([#3594](https://github.com/patternfly/patternfly-react/pull/3594))
- **Alert group:**
    - Added alert group component ([#3531](https://github.com/patternfly/patternfly-react/pull/3531))
- **Chip group:**
  - Added closable chip group ([#3455](https://github.com/patternfly/patternfly-react/pull/3455))
- **Clipboard copy:** 
  - Set type of copy and toggle buttons to 'button' ([#3444](https://github.com/patternfly/patternfly-react/pull/3444))
- **Data list:** 
  - Properly assigned selectable and selected classes ([#3447](https://github.com/patternfly/patternfly-react/pull/3447))
  - Removed hook ([#3434](https://github.com/patternfly/patternfly-react/pull/3434))
  - Reverted React.Component back to React.FunctionComponent ([#3431](https://github.com/patternfly/patternfly-react/pull/3431))
- **Data toolbar:** 
  - Added and removed some modifiers to match core ([#3422](https://github.com/patternfly/patternfly-react/pull/3422))
  - Reverted promotion of DataToolbar from experimental ([#3580](https://github.com/patternfly/patternfly-react/pull/3580))
  - Updated example to not exclude previous filtered items ([#3571](https://github.com/patternfly/patternfly-react/pull/3571))
- **Divider:** 
  - Promote Divider from experimental ([#3516](https://github.com/patternfly/patternfly-react/pull/3516))
- **Dropdown:**
  - Set a random id for dropdown item if id is not given ([#3555](https://github.com/patternfly/patternfly-react/pull/3555))
- **Flex layout:** Allowed string literals to be used for FlexItem modifiers ([#3544](https://github.com/patternfly/patternfly-react/pull/3544))
- **Overflow menu:** 
  - Promote OverflowMenu from experimental ([#3516](https://github.com/patternfly/patternfly-react/pull/3516))
- **Page:** 
  - Add ability to customize screen reader label ([#3433](https://github.com/patternfly/patternfly-react/pull/3433))
- **Page header:** 
  - Removed redundant role="banner" attribute ([#3499](https://github.com/patternfly/patternfly-react/pull/3499))
- **Page layout:** 
  - Fixed page layout imports for use with code sandbox.([#3461](https://github.com/patternfly/patternfly-react/pull/3461))
- **Pagination:**
  - Disabled navigation input if page is equal to zero ([#3472](https://github.com/patternfly/patternfly-react/pull/3472))
- **Select:** 
  - Add the type prop to the select toggle button ([#3495](https://github.com/patternfly/patternfly-react/pull/3495))
  - Allowed custom option data comparison ([#3491](https://github.com/patternfly/patternfly-react/pull/3491))
  - Updated so clear button appears with any type ahead input ([#3502](https://github.com/patternfly/patternfly-react/pull/3502))
  - Set a unique id to the select toggle type ahead input ([#3529](https://github.com/patternfly/patternfly-react/pull/3529))
- **Spinner:** 
  - Promote Spinner from experimental ([#3516](https://github.com/patternfly/patternfly-react/pull/3516))

### Catalog view extension
- **Catalog tile:** 
  - Removed truncation fade and fixed length ([#3378](https://github.com/patternfly/patternfly-react/pull/3378))

### Table
  - Fixed issue [#3559](https://github.com/patternfly/patternfly-react/issues/3559), for table we now default to a div instead of anchor([#3567](https://github.com/patternfly/patternfly-react/pull/3567))
  - Made IAction onClick optional ([#3558](https://github.com/patternfly/patternfly-react/pull/3558))
  - Fixed ActionsColumn import path for DropdownSeparator ([#3578](https://github.com/patternfly/patternfly-react/pull/3578))

### Other
- **Ci:** 
  - Stopped caching stale doc builds ([#3582](https://github.com/patternfly/patternfly-react/pull/3582))
  - Added coverage reporting for cypress tests ([#3295](https://github.com/patternfly/patternfly-react/pull/3295))
- **Chore:** 
  - Used absolute import paths for react core in pf4 packages. ([#3525](https://github.com/patternfly/patternfly-react/pull/3525))
  - Fixed homepage URL ([#3522](https://github.com/patternfly/patternfly-react/pull/3522))
  - Removed listing of icons while under construction ([#3485](https://github.com/patternfly/patternfly-react/pull/3485))
  - Use direct paths to react-icons in production build ([#3448](https://github.com/patternfly/patternfly-react/pull/3448))
- **Demos:** 
  - Upped version of gatsby-theme-patternfly-org ([#3562](https://github.com/patternfly/patternfly-react/pull/3562))
- **Docs:** 
  - Added a link to icons docs ([#3430](https://github.com/patternfly/patternfly-react/pull/3430))
- **Extensions:** 
  - Moved extensions to 'Extensions' in side nav category ([#3453](https://github.com/patternfly/patternfly-react/pull/3453))
- **Integration:**
  - Fixed selector in table simple actions ([#3584](https://github.com/patternfly/patternfly-react/pull/3584))
- **Linting:**
  - Made Eslint fixes for *.md file ([#3493](https://github.com/patternfly/patternfly-react/pull/3493))
  - Made initial eslint fixes for react-core-style-system *.md file ([#3505](https://github.com/patternfly/patternfly-react/pull/3505))
  - Made minor updates to TopologyView package, missing imports ([#3510](https://github.com/patternfly/patternfly-react/pull/3510))
  - Made minor updates to VirtualizedTable examples ([#3513](https://github.com/patternfly/patternfly-react/pull/3513))
  - Made minor updates to react-table package ([#3509](https://github.com/patternfly/patternfly-react/pull/3509))
  - Turned on errors for markdown code block linting ([#3515](https://github.com/patternfly/patternfly-react/pull/3515))
  - Added linting for md charts 3486 ([#3496](https://github.com/patternfly/patternfly-react/pull/3496))
  - Added linting for md code blocks 3469 ([#3474](https://github.com/patternfly/patternfly-react/pull/3474))
  - Fix linting for md react core example md files 3486 ([#3500](https://github.com/patternfly/patternfly-react/pull/3500))
  - Updated *.md files in demos and verified they were working in code sandbox as well ([#3504](https://github.com/patternfly/patternfly-react/pull/3504))

### PF3
  - **Date and time picker:** 
    - Use toLocaleTimeString to fix year 2020 bug ([#3506](https://github.com/patternfly/patternfly-react/pull/3506))
    - Updated test snapshot due to new year ([#3450](https://github.com/patternfly/patternfly-react/pull/3450))
  - **React console:** 
    - Added `additionalButtons` prop to VncConsole ([#3465](https://github.com/patternfly/patternfly-react/pull/3465))
  - **Slider** 
    - Added onFormatChange handler ([#3477](https://github.com/patternfly/patternfly-react/pull/3477))