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

```
"dev": "webpack --mode --watch development ./apptracker/frontend/src/index.js --output ./apptracker/frontend/static/frontend/main.js",
"build": "webpack --mode production ./apptracker/frontend/src/index.js --output ./apptracker/frontend/static/frontend/main.js"
```

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

Run python server and application now running on port 8000

### Set up Redux

Install dependencies:

```
npm install redux react-redux redux-thunk redux-devtools-extensions
```

Create "store" in src/store.js

Create rootReducer in reducers/index.js

In App.js bring in "store" and "provider" from react-redux to connect react and redux; Provider takes in "store" as a prop and you wrap Provider around everything in App.js:

```
<Provider store={store}>
// Other components here
</Provider>
```

Create a types.js in src/actions to hold our action types

Create a contactsReducer for Contacts state management and add to rootReducer; add an initialState, export default function to evaluate the action types being sent
Remember to make copies of state when returning new data:

```
switch(action.type) {
    case GET_CONTACTS:
      return {
        ...state, // Spread operator to copy state and then update contacts
        contacts: action.payload
      }
    default:
      return state;
  }
```

Now create a contacts actions file, src/actions/contacts.js; action methods go here along with http requests, using the dispatch callback

Call the action method from the appropriate component, in this case the contacts list component. Must use {connect} from the react-redux package, and map redux state to the component's props, then call the method from props when component mounts:

```
componentDidMount() {
  this.props.getContacts();
}

const mapStateToProps = state => ({
  contacts: state.contactsReducer.contacts
})

export default connect(mapStateToProps, { getContacts })(Contacts)
```

Component fires off getContacts from the contacts action thanks to connect from react-redux, getContacts makes the http request and sends the date to the contacts reducer via action.payload, and the contacts reducer determines what happens and makes a copy of the current state, then updates it with the retrieved data, and then sends back to the component as props via mapStateToProps.

Add any additional actions to contacts actions: delete, post, etc