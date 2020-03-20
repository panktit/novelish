import React from 'react';
import Navbar from "./Navbar.js";
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Container
} from "reactstrap";
let userId= "";
class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      rating: '',
      review: '',
    };
    console.log("Props in create: ",this.props);
    userId = this.props.match.params.id;
    console.log("User ID: ",userId);
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/review', {title: this.state.title, rating: this.state.rating, review: this.state.review, user:userId})
      .then((res) => {
      this.props.history.push(`/myreviews/${userId}`);
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
            <h6><Link {...this.props} to={`/myreviews/${userId}`}> Back to my reviews</Link></h6>
            <br/>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Add Review</CardTitle>
                </CardHeader>
                <CardBody>
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label>Title:</label>
                      <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Title" required/>
                    </div>
                    <div className="form-group">
                      <label>Rating (Out of 5):</label>
                      <input type="number" className="form-control" name="rating" value={this.state.rating} onChange={this.onChange} placeholder="Rating" required min="0" max="5" />
                    </div>
                    <div className="form-group">
                      <label>Review:</label>
                      <textarea className="form-control" name="review" onChange={this.onChange} placeholder="Review" cols="80" rows="3" required>{this.state.review}</textarea>
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
      // <div className="container">
      //   <div className="panel panel-default">
      //     <div className="panel-heading">
      //       <h3 className="panel-title">
      //         ADD BOOK
      //       </h3>
      //     </div>
      //     <div className="panel-body">
      //       <h4><Link {...this.props} to={`/myreviews/${userId}`}> My Reviews</Link></h4>
      //       <form onSubmit={this.onSubmit}>
      //         <div className="form-group">
      //           <label for="title">Title:</label>
      //           <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Title" required/>
      //         </div>
      //         <div className="form-group">
      //           <label for="rating">Rating (Out of 5):</label>
      //           <input type="number" className="form-control" name="rating" value={this.state.rating} onChange={this.onChange} placeholder="Rating" required min="0" max="5" />
      //         </div>
      //         <div className="form-group">
      //           <label for="review">Review:</label>
      //           <textArea className="form-control" name="review" onChange={this.onChange} placeholder="Review" cols="80" rows="3" required>{this.state.review}</textArea>
      //         </div>
      //         <button type="submit" className="btn btn-danger">Submit</button>
      //       </form>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default Create;