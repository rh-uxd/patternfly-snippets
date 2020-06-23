# Generating new snippet files

## Note: This is a manual process for now, should be automated at some point

1. Collect version numbers
   https://www.patternfly.org/v4/documentation/react/overview/release-notes
2. Make note of the version of react-core for a given release
3. Checkout the tag for that version in the patternfly-react submodule
4. Look at the react-core package.json file to get the corresponding version of patternfly
5. Checkout the tag for that version in patternfly submodule

Example:
```
// React
cd submodules/patternfly-react
git fetch origin
git checkout tags/@patternfly/react-core@3.153.13
yarn
cd packages/react-core
// TODO: update the generator so it doesn't always run the tests
yarn gen:tests --path="./src" --make-tests=false --make-snippets=true --make-fragments=true
mkdir ../../../../snippets/react/2020.XX
mv src/codeFragmentsWithComments.json ../../../../snippets/react/2020.XX/fragments.json
// TODO: This file has an extra comma at the end that should not be there
mv src/snippetsWithComments.json ../../../../snippets/react/2020.XX/snippets.json

// Core
cd submodules/patternfly
git fetch origin
git checkout tags/v2.71.5
npm i
npm run build-patternfly
npx gulp snippets
// snippets will be under workspace/{coreFragments,coreSnippets}.json
// move the snippets into /snippets/core and rename/append the release version
mkdir ../../snippets/core/2020.XX
mv workspace/coreFragments.json ../../snippets/core/2020.XX/fragments.json
mv workspace/coreSnippets.json ../../snippets/core/2020.XX/snippets.json
```

Cleanup:
`git submodule foreach --recursive git clean -xfd`
`git submodule foreach --recursive git reset --hard`
`git submodule update --init --recursive`


// Update package.json

// Add commands for react and core
```
{
   "command": "patternflySnippets.switchVersion_core_2020.XX",
   "title": "Release 2020.XX"
},
{
   "command": "patternflySnippets.switchVersion_react_2020.XX",
   "title": "Release 2020.XX"
},
```

// Add menu items for react and core (and increment the `"group": "inline@X"` keys for the other menu items)
{
   "command": "patternflySnippets.switchVersion_core_2020.XX",
   "when": "view == pfSnippetsCore",
   "group": "inline@0"
},
{
   "command": "patternflySnippets.switchVersion_react_2020.XX",
   "when": "view == pfSnippetsReact",
   "group": "inline@0"
},

// Update the configuration entries
"patternflySnippets.reactPatternflyRelease": {
   "type": "string",
   "default": "2020.XX",
   "enum": ["2020.XX", "2020.05", "2020.04", "2020.03", "2020.02", "2020.01", "2019.11", "2019.10"],
   "description": "PatternFly release"
},
"patternflySnippets.corePatternflyRelease": {
   "type": "string",
   "default": "2020.XX",
   "enum": ["2020.XX", "2020.05", "2020.04", "2020.03"],
   "description": "PatternFly release"
},


// Test changes
- `npm run compile`
- Debug/Run by pressing F5 key
- Check for new menu and configuration entries
- Insert some snippets/fragments
- Switch between different release versions
