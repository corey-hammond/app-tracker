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

Create index.js, App.js, index.html; in index.html add our root id of 'app', any Django static files, and the compiled main.js in script tags:
```
<div id="app"></div>
{% load static %}
<script src="{% static "frontend/main.js" %}"></script>
```

To load index.html, point to template in frontend/views.py:
```
def index(request):
  return render(request, 'frontend/index.html')
```

And then create a url in frontend/urls.py:
```
urlpatterns = [
    path('', views.index),
]
```

Add new urls to main urls file in root project; run npm run dev to compile to main.js, which gets loaded into index.html as a Django template

Run python server and applicion now running on port 8000