/*jslint browser: true, devel: true, node: true, sloppy: true, stupid: true, sub: true, unused:false, unparam: true, "esnext": true, esversion: 6, -W008, -W030, -W033, -W117 */
"use strict";

///////////////////////////////////////////////////////////////////////////////////////////////
///
///                        ///UI/UX/////                                                  ////
///
///////////////////////////////////////////////////////////////////////////////////////////////

///AMENER LE SCSS
//import css from '../css/app.scss'
 import css from '../css/main.scss';



///TWEENMAX
import TweenMax from '../../node_modules/gsap/src/minified/TweenMax.min.js';



//import { capitalize, throttle } from 'lodash'
///SCROLLTOPLUGIN
//let scrollToPlugin = require('../../node_modules/gsap/ScrollToPlugin');
require('gsap/ScrollToPlugin');
require('./smoothScroll.js');


TweenMax.set($('body'), {
  x: 0,

  opacity: 0,
});

TweenMax.to($('body'), 0.7, {

    // scale: 1,
  opacity: 1,
  ease: Power4.easeOut
});

///////////////////////////////////////////////////////////////////////////////////////////////
///
///                        ///UI/UX/////                                                  ////
///
///////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////
///
///                        ///REACT/////                                              ////
///
///////////////////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
const { render, findDOMNode  } = ReactDOM;
const { Component } = React
import { Router, browserHistory, hashHistory } from 'react-router'
import redux from 'redux'


import { createStore } from 'redux'

import Apps from './components/Apps';

 ///////////////////////////////////////////////////////////////////////////////////////////////
 ///                        ///App Modern React with redux/////                             ////
 ///////////////////////////////////////////////////////////////////////////////////////////////


















render(
  <div>
    <Apps />
  </div>,

  document.getElementById('app')
)


















 ///////////////////////////////////////////////////////////////////////////////////////////////
 ///                        ///App pluralsight/////                                                  ////
 ///////////////////////////////////////////////////////////////////////////////////////////////
//  import routes from './routes';
//  import configureStore from './store/configureStore'
//  import { Provider } from'react-redux'
//
//
//
//
// const store = configureStore();
//
// //console.log(store)
// let StateCounter = 0;
// let unsubscribe = store.subscribe(() => {
//   var state = store.getState();
//   console.log( `State ${StateCounter += 1}`, state);
// });
// //unsubscribe() //pu rien dasn la console si unsubscribe
//
//  ///le provider wrap le router pour lui offrir le data du store. gardant ainsi ll unidirection du data
// render (
//   <Provider store={store}>
//     <Router history={hashHistory} routes={routes} />
//   </Provider>,
//   document.getElementById('app')
// )





 ///////////////////////////////////////////////////////////////////////////////////////////////
 ///                        ///stateless VS class/////                                   ////
 ///////////////////////////////////////////////////////////////////////////////////////////////


////Class
// class HelloWorld extends React.Component {
//   constructor(props) {
//    super(props)
//   }
//   sayHi(e){
//     e.preventDefault()
//     console.log(`Allo ${this.props.name}`);
//   }
//   render() {
//     return (
//       <div>
//         <a href="#" onClick={this.sayHi.bind(this)}> Allo</a>
//       </div>
//     );
//   }
// }
//
// ////stateless
//  const HelloWorldStateless = (props) => {
//    const sayHi = (e) => {
//      e.preventDefault()
//      console.log(`Allo ${props.name}`);
//     }
//   return (
//       <div>
//         <a href="#" onClick={sayHi}> Allo</a>
//       </div>
//     )
// }
//
// ///render
// render (
//   <div>
//     <HelloWorld name="Benoit"/>
//     <HelloWorldStateless name="Ben"/>
//   </div>,
//   document.getElementById('app')
// )

///////////////////////////////////////////////////////////////////////////////////////////////
///                        ///stateless VS class/////                                   ////
///////////////////////////////////////////////////////////////////////////////////////////////








///////////////////////////////////////////////////////////////////////////////////////////////
///                        ///stateless VS class/////                                   ////
///////////////////////////////////////////////////////////////////////////////////////////////

//  const Stateless = (props) => {
//    console.log(props)
//    return (
//      <h1>Allo Monde {props.p}</h1>
//    )
//  }
//
// class Nouveau extends React.Component {
//   constructor (props){
//    super(props)
//    this.state = {
//       statename: 'Bonsoir'
//    }
//   }
//   render() {
//     return (
//       <div>
//         {this.state.statename} les capotés
//       </div>
//     );
//   }
// }
//
//
// render (
//   <div>
//     <Stateless p="de capoté"/>
//     <Nouveau />
//   </div>,
//   document.getElementById('app')
// )
///////////////////////////////////////////////////////////////////////////////////////////////
///                        ///stateless VS class/////                                   ////
///////////////////////////////////////////////////////////////////////////////////////////////
