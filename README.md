Install NodeJs  
Install VSCode

run 'npm install' in terminal  
run 'npm start' in terminal

VSCode setup:  
Install plugins "ESLint" and "Prettier"  
Go to File -> Preferences -> Settings -> Open settings.json and add

```
{
  "editor.minimap.enabled": false,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  }
}
```
