# Change Log

All notable changes to the "pfsnippets" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [1.2.0] - 2020-06-23
### Added
- Release 2020.06 and 2020.07
### Fixed
- Changing versions in the snippets menus also change it for the loaded snippets that can be inserted with the keyboard shortcuts

## [1.1.0] - 2020-05-04
### Added
- Release 2020.04 and 2020.05
- Changelog links
### Fixed
- Only load extension when the container is active

## [1.0.4] - 2020-04-22
### Fixed
- Added a web icon

## [1.0.3] - 2020-04-22
### Fixed
- Updated the PatternFly icon

## [1.0.2] - 2020-03-24
### Fixed
- Updated README

## [1.0.1] - 2020-03-24
### Fixed
- Removed patternflySnippets.reactSnippetPrefixWithComments and patternflySnippets.reactSnippetPrefixWithoutComments settings and replaced with a single patternflySnippets.reactSnippetPrefix. Comments can be toggled in the React view.
- Reload snippets when auto import is toggled

## [1.0.0] - 2020-03-23
### Added
- The PatternFly fragments are now in their own view container in the sidebar. Look for the PatternFly icon!
- Core snippets have been added, the default (configurable) trigger to get snippet suggestions is the `@` key.
- More configurable options can now be found within the extension settings, including the completion trigger and the applicable file types.

## [0.1.3] - 2020-02-21
### Fixed
- Release menu items should only appear in the code snippets view

## [0.1.2] - 2020-02-21
### Fixed
- If there is already an import from `@patternfly/react-core`, add the auto import to the closest matching import statement above the cursor position

## [0.1.1] - 2020-02-21
### Fixed
- Update CHANGELOG

## [0.1.0] - 2020-02-21
### Fixed
- Include latest PatternFly release 2020.02
- Do not show snippets for plaintext and HTML files
- Only trigger snippet suggestions on typing the `!` or `#` keywords
### Added
- Added experimental feature to automatically add the import statement in the form import { COMPONENT } from '@patternfly/react-core; If there is an existing import in the file from react-core it will add to that import instead.

## [0.0.2] - 2020-02-17
### Fixed
- Snippets will no longer duplicate in the search results that show up after using the `!` or `#` keywords
- Links in the Beta category have been fixed
- The release version is part of the URLs to the documentation now 

## [0.0.1]
- Initial release
