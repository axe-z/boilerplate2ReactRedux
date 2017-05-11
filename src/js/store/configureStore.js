
//Bonne idee de faire un Fn qui va configurer le store et pas le faire ici mais bien sur notre app.js
import * as redux from 'redux'
import { applyMiddleware, compose } from 'redux'
import rootReducer from './../reducers/index'
import thunk from 'redux-thunk'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

 //!! enlever REDUX_DEVTOOLS_EXTENSION a la fin ca fonctionne juste dans CHROME
 const configureStore = (initialState) => {
    return redux.createStore(rootReducer, initialState, compose(
     applyMiddleware(thunk, reduxImmutableStateInvariant()),  ///ajouter dans les ( les diff. middleware)
     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  //pourdevtool
    ))};


export default configureStore
