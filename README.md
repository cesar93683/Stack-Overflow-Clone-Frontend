Install NodeJs  
Install VSCode

run `npm install` in terminal  
run `npm run dev` in terminal

To run build folder  
run `npm build` in terminal  
run `npm start` in terminal

VSCode setup:  
Install extensions `ESLint` and `Prettier`"
Go to File -> Preferences -> Settings -> Open settings.json and add

```
{
  "editor.minimap.enabled": false,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  },
  "git.enableSmartCommit": true
}

```

Run the following to update git username and email  
git config --global user.email `48188267+cesar93683@users.noreply.github.com`  
git config --global user.name `cesar93683`
