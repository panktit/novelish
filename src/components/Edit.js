import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from "./Navbar.js";
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Row,
    Col,
    Container
} from "reactstrap";

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      book: {}
    };
  }

  componentDidMount() {
    // // For RESTful, use http://localhost:4000/api/review/edit/
    axios.get('http://localhost:4000/api/review/'+this.props.match.params.id)
      .then(res => {
        this.setState({ book: res.data });
        console.log("Book in Edit: " ,this.state.book);
    });
  }

  onChange = (e) => {
    const state = this.state.book
    state[e.target.name] = e.target.value;
    this.setState({book:state});
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { title, rating, review, user } = this.state.book;
    axios.put('http://localhost:4000/api/review/edit/'+this.props.match.params.id, { title, rating, review, user })
      .then((result) => {
        this.props.history.push("/myreviews/"+this.state.book.user);
    });
  }

  render() {
    return (
        <>
        <Navbar {...this.props}/>
        <br/><br/>
        <Container>
          <Row>
            <Col xs={1}></Col>
            <Col xs={10}>
            <h6><Link {...this.props} to={`/myreviews/${this.state.book.user}`}> Back to my reviews</Link></h6>
            <br/>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Edit Review</CardTitle>
                </CardHeader>
                <CardBody>
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label>Title:</label>
                      <input type="text" className="form-control" name="title" value={this.state.book.title} onChange={this.onChange} placeholder="Title" required/>
                    </div>
                    <div className="form-group">
                      <label>Rating (Out of 5):</label>
                      <input type="number" className="form-control" name="rating" value={this.state.book.rating} onChange={this.onChange} placeholder="Rating" required min="0" max="5" />
                    </div>
                    <div className="form-group">
                      <label>Review:</label>
                      <textarea className="form-control" name="review" onChange={this.onChange} placeholder="Review" cols="80" rows="3" defaultValue={this.state.book.review} required></textarea>
                    </div>
                    <button type="submit" className="btn btn-danger">Submit</button>
                  </form>
                </CardBody>
              </Card>
            </Col>
            <Col xs={1}></Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Edit;