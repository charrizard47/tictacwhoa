import React from 'react';
import ReactDOM from 'react-dom';

class Rule extends React.Component {

  render() {
    
    return (
      <div>
        Connect the lines between pieces.
        <ul>
          <li>Connect 3 pieces and lines to get 1 point</li>
          <li>Every additional piece adds 1 more point</li>
          <li>Purple piece connects both red and blue pieces</li>
          <li>Black box does not allow connections</li>
        </ul>
        
      </div>
    )
  }



}
export default Rule;