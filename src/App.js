

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  HashRouter as Router,
  Route,
  Routes
} from "react-router-dom";




export default class App extends Component {
  
  constructor(){
     super()
     this.state = {
        progress : 0
     }
  }

  setProgress = (prog)=>{
      this.setState({
          progress : prog
      })
  }

  render() {
    const APIkey = process.env.REACT_APP_NEWS_API;
    const pageSize = 6;
    return (
      <div>
        <Router>
        <Navbar APIkey = {APIkey}/>
        <LoadingBar
            color='cyan'
            progress={this.state.progress}
            height={2}
        />
          <Routes>
             <Route exact path = "/" element={
              <News setProgress = {this.setProgress}  key="1" APIkey = {APIkey} pageSize={pageSize} country="in" category ="general"/>
            }></Route>

            {/* <Route exact path = "/home" element={
              <News setProgress = {this.setProgress}  key="1" APIkey = {APIkey} pageSize={pageSize} country="in" category ="general"/>
            }></Route> */}

            <Route exact path = "/business" element={
              <News setProgress = {this.setProgress}  key="2" APIkey = {APIkey} pageSize={pageSize} country="in" category ="business"/>
            }></Route>

            <Route exact path = "/sciences" element={
              <News setProgress = {this.setProgress}  key="3" APIkey = {APIkey} pageSize={pageSize} country="in" category ="sciences"/>
            }></Route>

            <Route exact path = "/entertainment" element={
              <News setProgress = {this.setProgress}  key="4" APIkey = {APIkey} pageSize={pageSize} country="in" category ="entertainment"/>
            }></Route>

            <Route exact path = "/general" element={
              <News setProgress = {this.setProgress}  key="5" APIkey = {APIkey} pageSize={pageSize} country="in" category ="general"/>
            }></Route>

            <Route exact path = "/health" element={
              <News setProgress = {this.setProgress}  key="6" APIkey = {APIkey} pageSize={pageSize} country="in" category ="health"/>
            }></Route>

            <Route exact path = "/ports" element={
              <News setProgress = {this.setProgress}  key="7" APIkey = {APIkey} pageSize={pageSize} country="in" category ="ports"/>
            }></Route>

            <Route exact path = "/technology" element={
              <News setProgress = {this.setProgress}  key="8" APIkey = {APIkey} pageSize={pageSize} country="in" category ="technology"/>
            }></Route>
          </Routes>
        </Router>
        
          
      </div>
    )
  }
}
