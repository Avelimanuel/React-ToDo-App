import React, { Component } from 'react'

export class TestComp extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         message:'Subscribe',
         notify:'Please subscribe'
      }
    }

buttonClick = ()=>{
    this.setState({message: "Subscribed",
    notify:'Thank you for subscription'})
    
}    
    
  render() {
    return (
      <div>
        <span>{this.state.notify}</span>
       <button className='btn' onClick={this.buttonClick}>{this.state.message}</button>
      </div>
    )
  }
}

export default TestComp
