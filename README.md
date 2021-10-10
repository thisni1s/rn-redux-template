# React-Native Redux Template

## Why does this project exist?

Setting Redux up within your react-native project is a time consuming, repetitive and tedious process. This project aims to provide a ready to go react-native project setup that already includes redux, a redux-persist configuration with AsyncStorage and SensitiveStorage to match your different storage needs. It also provides a way to integrate async actions like API calls into your state management with the redux-thunk middleware.

## In what way is Redux set up?

The complete redux setup is found in the `src/Redux` folder and includes:

#### `Actions/`
- `actionTypes.js` includes Strings that define the action types used in between the different methods.  
- `actions.js` includes methods that create actions to call reducers more easily.
- `thunks.js` includes methods that can execute (async) code that will be executed before the Redux state is changed. API calls go here!

#### `Reducers/`
- `asyncStorageReducer.js` combines all reducers that use the AsyncStorage engine to save data.
- `sensitiveReducer.js` combines all reducer that use the SensitiveStorage engine to save data.
- `persistReducer.js` contains the configuration code for redux-persist.

#### `store/`
- `index.js` creates the store and applies the redux-thunk middleware.

## How to create new Reducers?

There are yarn scripts in place to make creating new reducers very easy. Before creating one you have to decide if you also want a thunk to run code before dispatching an action. You also have to decide if the object handled by the reducers is an object or an array. After deciding for a name you have to specify if you want the data to be stored by AsyncStorage (as) or SensitiveStorage (se).

**!! If you create a thunk you have to put in some code into the thunk method before it works. !!**

New Reducers or thunks can be added via a yarn script like this:

`yarn new <reducer|thunk> <object|array> <name> <as|se>`

#### Names and locations

- Name of the actionType: `CHANGE_<NAME>` in `src/Redux/actions/actionTypes.js`
- Name of the action: `change<name>` in `src/Redux/actions/actions.js`
- Name of the reducer: `<name>Reducer` in `src/Redux/reducers/<name>Reducer.js`
- Name of the thunk: `<name>Thunk` in `src/Redux/actions/thunks.js`

#### Examples:

`yarn new thunk object login se` : creates a reducer called `loginReducer` and a thunk called `loginThunk` and all corresponding actions and action types.

These can be used in your code by utilizing the `mapStateToProps` and `mapDispatchToProps` function like this:

```
const mapStateToProps = state => {
  return {
    login: state.sens.loginReducer
  };
};
```

```
const mapDispatchToProps = dispatch => {
  return {
    //only using reducer not the thunk:
    changeLogin: payload => dispatch(changeLogin(payload)),
    //using a thunk:
    thunkLogin: payload => dispatch(thunkLogin(id)),
  };
};
```

In your component you can then get the current state like this: `props.login` and chnage the state by calling `props.thunkLogin(object)` or `props.changeLogin(object)` depending if you want to use the thunk or not.

## Where to create the rest of the Code?

You can write your app anywhere you want, by defualt the main View is in `src/Views/mainView.js`
