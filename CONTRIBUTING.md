# Generating new snippet files

## Note: This is a manual process for now, should be automated at some point

1. Collect version numbers
   Core: https://www.patternfly.org/v4/documentation/core/overview/release-notes
   React: https://www.patternfly.org/v4/documentation/react/overview/release-notes
2. Save release and version information
Example:
```
// Save release versions into variables
RELEASE=2020.07
TAG_REACT=@patternfly/react-core@4.18.5
TAG_CORE=prerelease-v4.10.31

// React
cd submodules/patternfly-react
git fetch origin
git checkout tags/$TAG_REACT
yarn
cd packages/react-core
// TODO: update the generator so it doesn't always run the tests
yarn gen:tests --path="./src" --make-tests=false --make-snippets=true --make-fragments=true
mkdir ../../../../snippets/react/$RELEASE
mv src/codeFragmentsWithComments.json ../../../../snippets/react/$RELEASE/fragments.json
// TODO: This file has an extra comma at the end that should not be there
mv src/snippetsWithComments.json ../../../../snippets/react/$RELEASE/snippets.json

// Core
cd ../../../submodules/patternfly
git fetch origin
git checkout tags/$TAG_CORE
npm i
npm run build-patternfly
npx gulp snippets
// snippets will be under workspace/{coreFragments,coreSnippets}.json
// move the snippets into /snippets/core and rename/append the release version
mkdir ../../snippets/core/$RELEASE
mv workspace/coreFragments.json ../../snippets/core/$RELEASE/fragments.json
mv workspace/coreSnippets.json ../../snippets/core/$RELEASE/snippets.json
```


// Update package.json

// Add commands for react and core
```
{
   "command": "patternflySnippets.switchVersion_core_$RELEASE",
   "title": "Release $RELEASE"
},
{
   "command": "patternflySnippets.switchVersion_react_$RELEASE",
   "title": "Release $RELEASE"
},
```

// Add menu items for react and core (and increment the `"group": "inline@X"` keys for the other menu items)
{
   "command": "patternflySnippets.switchVersion_core_$RELEASE",
   "when": "view == pfSnippetsCore",
   "group": "inline@0"
},
{
   "command": "patternflySnippets.switchVersion_react_$RELEASE",
   "when": "view == pfSnippetsReact",
   "group": "inline@0"
},

// Update the configuration entries
"patternflySnippets.reactPatternflyRelease": {
   "type": "string",
   "default": "$RELEASE",
   "enum": ["$RELEASE", "2020.05", "2020.04", "2020.03", "2020.02", "2020.01", "2019.11", "2019.10"],
   "description": "PatternFly release"
},
"patternflySnippets.corePatternflyRelease": {
   "type": "string",
   "default": "$RELEASE",
   "enum": ["$RELEASE", "2020.05", "2020.04", "2020.03"],
   "description": "PatternFly release"
},


// Test changes
- `npm run compile`
- Debug/Run by pressing F5 key
- Check for new menu and configuration entries
- Insert some snippets/fragments
- Switch between different release versions


Cleanup:
`git submodule foreach --recursive git clean -xfd`
`git submodule foreach --recursive git reset --hard`
`git submodule update --init --recursive`

// Push to github
- First update the package.json version number field
`git checkout -b release-$RELEASE`
`git add .`
`git commit -m 'Update to release $RELEASE`
`git push -u origin release-$RELEASE`

// Publish
vsce login PatternFly 
vsce publish

// After a few minutes it will be published to:
`https://marketplace.visualstudio.com/items?itemName=PatternFly.patternfly-snippets`
