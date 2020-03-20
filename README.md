# Application Tracker

An application to track job applications, networking events, and contacts. 

Full stack application with a React front-end and a Django back-end, using the Django Rest Framework and Django Rest Know for authentication.

## React Frontend

Created python app 'frontend' in project
frontend\src\components: React components
frontend\src\static\frontend: compiled JS, Main.js
frontend\src\templates\frontend: index.html

### Configure Webpack

Install Webpack
```
npm install -D webpack webpack-cli
```

Install Babel
```
npm install -D @babel/core @babel/preset-react @babel/preset-env babel-loader babel-plugin-transform-class-properties
```

Install React
```
npm install react react-dom prop-types
```

To use Babel presets and plugins: 
Create .babelrc in root and configure json file

Create Webpack config file:
Create webpack.config.js in root and load the babel loader

Add scripts to compile React app to package.json:
"dev": "webpack --mode development ./apptracker/frontend/src/index.js --output ./apptracker/frontend/static/frontend/main.js",
"build": "webpack --mode production ./apptracker/frontend/src/index.js --output ./apptracker/frontend/static/frontend/main.js"

Create Index.js and App.js

