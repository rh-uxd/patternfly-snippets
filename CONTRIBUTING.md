# Generating new snippet files

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
git checkout tags/@patternfly/react-core@3.153.13
yarn
cd packages/react-core
// TODO: update the generator so it doesn't always run the tests
yarn gen:tests --path="./src" --make-tests=false --make-snippets=true --make-fragments=true
mv src/codeFragmentsWithComments.json ../../../../snippets/react/fragments_2020.XX.json
// TODO: This file has an extra comma at the end that should not be there
mv src/snippetsWithComments.json ../../../../snippets/react/snippets_2020.XX.json

// Core
cd submodules/patternfly
git checkout tags/v2.71.5
npm i
npm run build-patternfly
npx gulp snippets
// snippets will be under workspace/{coreFragments,coreSnippets}.json
// move the snippets into /snippets/core and rename/append the release version
mv workspace/coreFragments.json ../../snippets/core/fragments_2020.XX.json
mv workspace/coreSnippets.json ../../snippets/core/snippets_2020.XX.json
```

Cleanup:
`git submodule foreach --recursive git clean -xfd`
`git submodule foreach --recursive git reset --hard`
`git submodule update --init --recursive`