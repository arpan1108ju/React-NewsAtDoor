import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Navbar extends Component {
  constructor(){
     super();
     this.state = {
        text : ""
     }
  }

  handleOnchange = (event)=>{
      this.setState({
          text : event.target.value
      })
  }

  handleSearchClick = ()=>{
      console.log("clicked");
     
  }

  render() {
    return (
      <div>

<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">NewsAtDoor</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/general">Home</Link>
        </li>
        <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/general">General</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/sciences">Sciences</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/ports">Ports</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" onChange={this.handleOnchange} aria-label="Search"/>
        <button className="btn btn-outline-danger" onClick={this.handleSearchClick} type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
        
      </div>
    )
  }
}

export default Navbar