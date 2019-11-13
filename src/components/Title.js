import React, {Component} from 'react'

class Title extends Component {
  render() {
    return (
      <div class="row">
        <div class="col s12">
          <h3 class="center-align">{this.props.title}</h3>
        </div>
      </div>
    )
  }
}

export default Title
// componente que muestra el titulo de una pagina
