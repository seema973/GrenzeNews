import React, { Component } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'
import {
  BrowserRouter ,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export class App extends Component {
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({progress: progress})
  }
  pageSize = 10;
  render() {
    return (
      <div>
      <BrowserRouter>
        <NavBar/> 
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <Routes>
          <Route exact path="/business"element={<News setProgress = {this.setProgress} key="business" pageSize={this.pageSize} country="in" category="business"/>}></Route>
          <Route exact path="/"element={<News setProgress = {this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general"/>}> </Route>
          <Route exact path="/entertainment"element={<News setProgress = {this.setProgress} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment"/>}></Route>
          <Route exact path="/health"element={<News setProgress = {this.setProgress} key="health" pageSize={this.pageSize} country="in" category="health"/>}></Route>
          <Route exact path="/science"element={<News setProgress = {this.setProgress} key="science" pageSize={this.pageSize} country="in" category="science"/>}></Route>
          <Route exact path="/sports"element={<News setProgress = {this.setProgress} key="sports" pageSize={this.pageSize} country="in" category="sports"/>}></Route>
          <Route exact path="/technology"element={<News setProgress = {this.setProgress} key="technology" pageSize={this.pageSize} country="in" category="technology"/>}></Route>
          <Route exact path="/general"element={<News setProgress = {this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general"/>}></Route>
        </Routes>
      </BrowserRouter>
      </div>
    )
  }
}

export default App

