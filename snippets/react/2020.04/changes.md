## 2020.04 release notes (2020-03-31)
Packages released:
- [@patternfly/react-catalog-view-extension@1.4.48](https://www.npmjs.com/package/@patternfly/react-catalog-view-extension/v/1.4.48)
- [@patternfly/react-charts@5.3.18](https://www.npmjs.com/package/@patternfly/react-charts/v/5.3.18)
- [@patternfly/react-core@3.153.3](https://www.npmjs.com/package/@patternfly/react-core/v/3.153.3)
- [@patternfly/react-icons@3.15.15](https://www.npmjs.com/package/@patternfly/react-icons/v/3.15.15)
- [@patternfly/react-inline-edit-extension@2.17.48](https://www.npmjs.com/package/@patternfly/react-inline-edit-extension/v/2.17.48)
- [@patternfly/react-styles@3.7.12](https://www.npmjs.com/package/@patternfly/react-styles/v/3.7.12)
- [@patternfly/react-table@2.28.29](https://www.npmjs.com/package/@patternfly/react-table/v/2.28.29)
- [@patternfly/react-tokens@2.8.12](https://www.npmjs.com/package/@patternfly/react-tokens/v/2.8.12)
- [@patternfly/react-topology@2.14.48](https://www.npmjs.com/package/@patternfly/react-topology/v/2.14.48)
- [@patternfly/react-virtualized-extension@1.4.49](https://www.npmjs.com/package/@patternfly/react-virtualized-extension/v/1.4.49)

### Components
- **About modal:**
  - Allowed custom aria-label for the close button ([#3877](https://github.com/patternfly/patternfly-react/pull/3877))
- **Alert:**
  - Used context to set label ([#3771](https://github.com/patternfly/patternfly-react/pull/3771))
- **Card:**
  - Added Card View to demos ([#3441](https://github.com/patternfly/patternfly-react/pull/3441))
  - Added wrapper to image to resize it properly ([#3642](https://github.com/patternfly/patternfly-react/pull/3642))
- **Drawer:**
  - Added width props, updated demo & integration test ([#3979](https://github.com/patternfly/patternfly-react/pull/3979))
- **Dropdown:**
  - Removed duplicate prop ([#3923](https://github.com/patternfly/patternfly-react/pull/3923))
  - Cleaned console errors in Dropdown.test.tsx ([#3861](https://github.com/patternfly/patternfly-react/pull/3861))
  - Supported router link as DropdownItems through component API ([#3995](https://github.com/patternfly/patternfly-react/pull/3995))
- **Empty state:**
  - Added support for extra-large empty state ([#3844](https://github.com/patternfly/patternfly-react/pull/3844))
- **Select:**
  - Fixed group select options in single variant ([#3838](https://github.com/patternfly/patternfly-react/pull/3838))
  - Allowed count badge to be hidden in checkbox select ([#3976](https://github.com/patternfly/patternfly-react/pull/3976))
  - Added logic for disabled default options for typeahead ([#3895](https://github.com/patternfly/patternfly-react/pull/3895))
## Table
  - Fixed forward ref types ([#3919](https://github.com/patternfly/patternfly-react/pull/3919))
  - Added column management demo ([#3942](https://github.com/patternfly/patternfly-react/pull/3942))

### Other
- **Docs:**
  - Released docs to NPM for patternfly-org ([#3941](https://github.com/patternfly/patternfly-react/pull/3941))
- **Build:**
  - Removed unused packages from repo ([#3916](https://github.com/patternfly/patternfly-react/pull/3916))
  - Created unified react-core dist ([#3971](https://github.com/patternfly/patternfly-react/pull/3971))
  - Created variables by file in react-tokens ([#3896](https://github.com/patternfly/patternfly-react/pull/3896))
- **Types:**
  - Fixed tippy types, remove copyTS ([#3940](https://github.com/patternfly/patternfly-react/pull/3940))
  - Added in-house focusTrap ([#3967](https://github.com/patternfly/patternfly-react/pull/3967))
  - Removed a few usages of prop-types ([#3968](https://github.com/patternfly/patternfly-react/pull/3968))