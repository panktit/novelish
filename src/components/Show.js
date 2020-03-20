import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {}
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/review/'+this.props.match.params.id)
      .then(res => {
        this.setState({ book: res.data });
        console.log("Book in state: ",this.state.book);
    });
  }

  delete(id){
    console.log(id);
    axios.delete('http://localhost:4000/review/'+id)
      .then((result) => {
        this.props.history.push(`/myreviews/${this.state.book.user}`);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              {this.state.book.title}
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link {...this.props} to={`/myreviews/${this.state.book.user}`}> Back to my reviews</Link> </h4>
            <dl>
              <dt>Title:</dt>
              <dd>{this.state.book.title}</dd>
              <dt>Rating:</dt>
              <dd>{this.state.book.rating}</dd>
              <dt>Review:</dt>
              <dd>{this.state.book.review}</dd>
            </dl>
            <Link to={`/edit/${this.state.book._id}`} className="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.book._id)} className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;