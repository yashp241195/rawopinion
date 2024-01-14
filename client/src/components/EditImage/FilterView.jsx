import React, { Component } from 'react';
import ImageFilter from 'react-image-filter';


class FilterView extends Component {
  constructor() {
    super();
    this.state = {
      filter_array:  [
        { 
          name: "Grayscale", 
          matrix: [
            1,   0,   0,  0,   0,
            1,   0,   0,   0,   0,
            1,   0,   0,   0,   0,
            0,  0,   0,   1,   0,
          ]
        },
        { name: "Sepia", 
          matrix: [
            0.393, 0.769, 0.189, 0, 0,
            0.349, 0.686, 0.168, 0, 0,
            0.272, 0.534, 0.131, 0, 0,
            0,     0,     0,     1, 0
          ]
        },
        { name: "Original", 
          matrix: [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
          ]
        },
        { 
          name: "Vintage", 
          matrix: [
            0.8, 0.2, 0, 0, 0,
            0.2, 0.8, 0, 0, 0,
            0, 0, 0.8, 0, 0,
            0, 0, 0, 1, 0
          ]
        },
        { 
          name: "Clarendon", 
          matrix: [
            1.6, -0.1, 0, 0, -0.07,
            -0.2, 1.7, -0.1, 0, -0.02,
            -0.2, 0, 1.5, 0, -0.02,
            0, 0, 0, 1, 0
          ]
        },
        { 
          name: "Gingham", 
          matrix: [
            1.1, 0, 0, 0, -0.1,
            0, 1.1, 0, 0, -0.1,
            0, 0, 1.1, 0, -0.1,
            0, 0, 0, 1, 0
          ]
        },
        { 
          name: "Juno", 
          matrix: [
            0.9, 0, 0, 0, 0,
            0, 1.1, 0, 0, 0,
            0, 0, 1.1, 0, 0,
            0, 0, 0, 1, 0
          ]
        },
        { 
          name: "Lark", 
          matrix: [
            1.3, 0, 0, 0, -0.1,
            0, 1.3, 0, 0, -0.1,
            0, 0, 1.3, 0, -0.1,
            0, 0, 0, 1, 0
          ]
        },
        {
          name: "Mayfair",
          matrix: [
            1.15, 0, 0, 0, 0,
            0, 1.15, 0, 0, 0,
            0, 0, 1.15, 0, 0,
            0, 0, 0, 1, 0
          ]
        },
        {
          name: "Sierra",
          matrix: [
            0.9, 0.1, 0, 0, 0,
            0, 0.9, 0, 0, 0,
            0, 0, 0.9, 0, 0,
            0, 0, 0, 1, 0
          ]
        },
        {
          name: "Valencia",
          matrix: [
            1.1, 0, 0, 0, 0,
            0, 0.9, 0, 0, 0,
            0, 0, 0.8, 0, 0,
            0, 0, 0, 1, 0
          ]
        },
        {
          name: "Walden",
          matrix: [
            1.1, 0, 0, 0, 0,
            0, 1.1, 0, 0, 0,
            0, 0, 1.1, 0, 0,
            0, 0, 0, 1, 0
          ]
        }
      ]
    }
}


  render() {
    return (
      <ImageFilter
        style={{height:this.props.height, width:this.props.width}}
        image={this.props.image}
        filter={this.state.filter_array.filter((it)=>it.name === this.props.filter)[0].matrix} 

      />
    );
  }
}
export default FilterView