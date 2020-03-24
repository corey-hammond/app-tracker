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

Run python server and npm run dev, application now running on port 8000

### Set up Redux

Install dependencies:

```
npm install redux react-redux redux-thunk redux-devtools-extensions
```

Create "store" in src/store.js; Store uses createStore which takes in a rootReducer, initialState object, and any middleware

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

Contacts component fires off getContacts from the contacts action thanks to connect from react-redux, getContacts makes the http request and sends the data to the contacts reducer using dispatch via action.payload, and the contacts reducer determines what happens and makes a copy of the current state, then updates it with the retrieved data, and then sends back to the component as props via mapStateToProps.

Add any additional actions to contacts actions: delete, post, etc

### React Alerts

```
npm install react-alert react-alert-template-basic react-transition-group
```

Bring in AlertProvider in to App.js, setup Alert options, and wrap components in AlertProvider (under redux Provider)

Create an Alerts component to display the alert, that uses withAlert

Allow Redux to manage our errors in state: create an errors reducer and type, dispatch the type/action in catch blocks

Get the errors state in the Alert component: mapStateToProps and connect

## Backend Token Authentication

### Django's User Model

Import Django's User model into your models.py:

```
from django.contrib.auth.models import User
```

Add an owner field to your model and then migrate:

```
owner = models.ForeignKey(
  User, related_name="contacts", on_delete=models.CASCADE, null=True)
```

Update your viewset in api.py to permissions IsAuthenticated and define new queryset:

```
class ContactViewSet(viewsets.ModelViewSet):

    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = ContactSerializer

    def get_queryset(self):
        return self.request.user.contacts.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
```

### Django Knox Token Authentication

Update project settings.py by adding 'knox' to the installed apps, and add:

```
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': ('knox.auth.TokenAuthentication')
}
```

...then migrate

Create serializers for auth in new app 'accounts'

Create API for register, login, and user routes

Create urls for 'accounts'

We now have the ability to acquire a token and provide routes and data based off the user's token

## Frontend Authentication

Now we need to bring in the back-end authentication data (token, user, etc.) to the front-end state

### React Router / Private Routes for Authentication

```
npm install react-router-dom
```

We will use the HashRouter, wrap App.js components in <Router>, under all Providers

Build a Login and Register component

Build an 'auth' reducer to bring auth data into state

Create a PrivateRoute component that will check user authentication and then provide the appropriate route or redirect to login page. Bring in the authReducer as props. The function will take in auth state and return a <Route />. In the <Route />'s render function, check for auth status and return component if user authenticated or return a redirect to login page if not.

In App.js, use PrivateRoute now instead of Route for any routes that you want to protect

### Authorization Actions (actions/auth.js)

Create an auth.js in actions with a method for loading the user and checking local storage for a token

In App.js, run the loadUser action in componentDidMount:

```
componentDidMount() {
    store.dispatch(loadUser());
  }
```

Create a Login user action to get token and set it in state; add state's 'isAuthenticated' and the login action to Login component via mapStateToProps

To conditionally render links based on authentication, bring in auth state to Header.js via connect and mapStateToProps

Create a Logout user action and connect it to Header.js, as the Logout button's onClick

```
<button onClick={this.props.logout}>
```
