# PatternFly Code snippets

## What's in this extension

Demo: https://youtu.be/StWxQeFj38U

This extension adds a new view container to the sidebar with the PatternFly icon. 

Contained within are code fragments for components that can be inserted into the open editor.
The components are organized by type (component/layout) and grouped by category.  There is a global configuration setting that also includes documentation in code comments when a component is added. The link icon on the category header will take you to the documentation page for each component category as well.

The extension also makes the code snippets available through code completion. If you type the configured trigger string (which is configurable in the extension settings), e.g. `#Alert` you will see a dropdown with components that match the text. 

The default triggers are:
- `!`: Show react snippet completions  (available by default in: `typescript`, `typescriptreact`, `javascript`, `javascriptreact`, `markdown`)
- `@`: Show core snippet completions (available by default in: `html`, `markdown`)

Both the trigger string and the file types are configurable in the extension settings.
