
//Tous les ETAPES DE REDUX    //Tous les ETAPES DE REDUX     //Tous les ETAPES DE REDUX

/*
 ///////////////////////////////////////////////////////////////////////////////////////////////
 ///          ///etape 1 /////  configurer une function qui creer un store     ////
 ///////////////////////////////////////////////////////////////////////////////////////////////
*/ //Bonne idee de faire un Fn qui va configurer le store et pas le faire ici mais bien sur notre app.js

import * as redux from 'redux'
import { applyMiddleware } from 'redux'
import rootReducer from './../reducers/index'
import thunk from 'redux-thunk'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';


 const configureStore = (initialState) => {
    return redux.createStore(rootReducer, initialState, redux.compose(
         applyMiddleware(thunk),
         applyMiddleware(reduxImmutableStateInvariant()),
       window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ))};


export default configureStore

/*

 ///////////////////////////////////////////////////////////////////////////////////////////////
 ///                        ///2 avoir un reducer /////                                                  ////
 ///////////////////////////////////////////////////////////////////////////////////////////////
*/
//UN TYPE DE REDUCER
let courseReducer = (state = [], action) => {

  switch (action.type) {
   case 'CREATE_COURSE' :
   return [
     ...state,
    Object.assign({}, action.course)   //deep copy
  ];
   default:
    return state;
  }
};

export default courseReducer

 ///////////////////////////////////////////////////////////////////////////////////////////////
 ///                        ///2.5  COMBINER LES REDUCERS/////                              ////
 ///////////////////////////////////////////////////////////////////////////////////////////////

import {combineReducers} from 'redux'
import courses from './courseReducer'   //on peut rennommer un default

const rootReducer = combineReducers({
  courses,
})

export default rootReducer;


 ///////////////////////////////////////////////////////////////////////////////////////////////
 ///                        ///un actions Creator,  function qui creer les actions/////                                                  ////
 ///////////////////////////////////////////////////////////////////////////////////////////////

//on va faire ici des action CREATOR

export function createCourse(course){
 return  {
   type: "CREATE_COURSE",
   //course: course
   course //es6
 }
}

/*

 ///////////////////////////////////////////////////////////////////////////////////////////////
 ///                        ///Dans l app principale, creer le store et wraper le router avec le provider /////                                                  ////
 ///////////////////////////////////////////////////////////////////////////////////////////////
*/
import React from "react";
const { render } = ReactDOM;
import { Router, browserHistory, hashHistory } from 'react-router'
import redux from 'redux'

 import routes from './routes';  //le reste du router
 import configureStore from './store/configureStore'
 import { Provider } from'react-redux'

const store = configureStore();  //=/ce qui configure le store

console.log(store)
//Object {dispatch: function, subscribe: function, getState: function, replaceReducer: function, Symbol(observable): function}

//permet de voir nos actions
let unsubscribe = store.subscribe(() => {
  var state = store.getState();
  console.log('New state', state);
});
//unsubscribe() //pu rien dasn la console si unsubscribe

 ///le provider wrap le router pour lui offrir le data du store. gardant ainsi ll unidirection du data
render (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
)

/*

 ///////////////////////////////////////////////////////////////////////////////////////////////
 ///                        ///Maintenant dasn React  importer connect de react-redux/////                    ////
 ///////////////////////////////////////////////////////////////////////////////////////////////
*/
import React, {PropTypes, Component} from 'react';
//import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import * as courseActions from './../../actions/courseActions';

////le constructor et ses BINDs
class CoursesPage extends Component {
  constructor (props, context){
    super(props,context)
    this.state = {
      course: {
        title: ''
       }
    };
    ///pourquoi le faire ici : PERFORMANCE , le bind se fait une seule fois.
    this.onTitleChange = this.onTitleChange.bind(this);  //this en bas est l'input, pas react malheureusement
    this.onClickSave = this.onClickSave.bind(this); //Donc ici on remet le this de la form a react.
  }
  ////les function childs, pour ce qui se passe dnas le render
  onTitleChange(e){
    const course = this.state.course;
    course.title = e.target.value;
    this.setState({
      course: course  //course a la meme shape avec ce qui est fait avant
    })
  }
  onClickSave(e){
    e.preventDefault();
    ///maniere literale. sans avoir mapDispatchToProps activé
    //this.props.dispatch(courseActions.createCourse(this.state.course));

    // avec mapDispatchToProps:
    this.props.createCourse(this.state.course)
  }
  courseRow(course,i){
    return <div key={i}>{course.title}</div>
  }
  //le render , la ou le ui se fait
  render() {
    return (
      <div>
        <h1>Courses</h1>

        {this.props.courses.map(this.courseRow)}

        <h2>Ajout de cours</h2> {/* mauvais this sur event, doit etre react, pas l input */}
        <input type="text" onChange={this.onTitleChange} value={this.state.course.title}/>
        <input type="submit" value="Save" onClick={this.onClickSave} />  {/* mauvais this sur event */}
      </div>
    );
  }
}
//ici sont les proptypes  dordinaire, mais c est long...


//ici  est la portion connect et export. 
///export default CoursesPage
//au lieu d exporter CoursesPage normalement, on va le wrapper dans connect
//connect retourne une function, de la la drole de sytaxe
function mapStateToProps(state, ownProps){    //ownProps est les props du component de react
  return {
    courses: state.courses     //ca c 'est le reducer courseReducer, qu on a renomé courses
  }
}
//au lieu de faire ca dans la fn du onClickSave
//!!IMPORTANT , du moment ou l on utilise mapDispatchToProps, dispatch n'est plus disponnible DANS react. Il l'est seulement, quand on ne met pas le deuxieme argument a connect.
 function mapDispatchToProps(dispatch){   ///optionel
   return  {
     createCourse: (course) => dispatch(courseActions.createCourse(course))
   }
 }

 //deux call d actions, connect retourne une function qui demande le component (CoursesPage)
export default connect(mapStateToProps , mapDispatchToProps )(CoursesPage) //pour linker avec le store
//quand on met pas mapDispatchToProps en deuxieme argument, connect donne acces a this.props.dispatch
//ce qui permet de lancer des actions dans le component
