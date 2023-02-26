# Next.js Fullstack For Avatarfi

## Configuration

We reccomend using VsCode & you will have to install Eslint extention and set the bellow settings

`vscode/settings.json`

```json
{
  "editor.defaultFormatter": "dbaeumer.vscode-eslint",
  "eslint.format.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  ...
}
```

Make sure to add your own env args from '/.env.local.exemple` -
to `/.env.local`

## Quick Start

```bash
# Install dependencies for server
npm install

# Run dev server with
npm run dev

# Run prod server with
npm run build && npm start

```

## Contribution

Fork the repo to your github page

```bash
# Check for linting errors
npm run lint

# Fix linting errors if there are any
npm run lint:fix

# Check for typescripy errors
npm run ts-lint

# Check for formatting errors
npm run format

# Fix formatting errors if there are any
npm run format:fix

# Commit to your forked repo
git add . && git commit -m '...'

# Create a pull request from your github page or
# terminal to the avatarfi/dev | according branch
```
