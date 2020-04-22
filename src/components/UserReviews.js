import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "./Navbar.js";
import axios from 'axios';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
  Container
} from "reactstrap";
let userId= "";

class UserReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    };
    console.log("Props in User Reviews: ",this.props);
    userId = this.props.match.params.id;
    console.log("User ID: ",userId);
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/api/review/user/${userId}`)
      .then(res => {
        this.setState({ reviews: res.data });
        console.log(this.state.reviews);
    });
  }

  delete(id) {
    console.log(id);
    axios.delete('http://localhost:4000/api/review/delete/'+id)
      .then((result) => {
        console.log("delete response: ",result);
        axios.get(`http://localhost:4000/api/review/user/${userId}`)
          .then(res => {
            this.setState({ reviews: res.data });
            console.log(this.state.reviews);
        });
    })
  }

  render() {
    return (
        <>
        <Navbar {...this.props}/>
        <br/><br/>
        <Container>
        <h6><Link {...this.props} to={`/allreviews/${userId}`}> Back</Link></h6>
        <br/>
          <Row>
            <Col xs={12}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">My Reviews</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th style={{ color: '#d93a16' }}>Book</th>
                        <th style={{ color: '#d93a16' }}>Rating</th>
                        <th style={{ color: '#d93a16' }}>Review</th>
                        <th style={{ color: '#d93a16' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.reviews.map(book =>
                    <tr>
                        <td style={{fontWeight: "bold"}}>{book.title}</td>
                        <td>{book.rating}</td>
                        <td>{book.review}</td>
                        <td>
                          <Link to={`/edit/${book._id}`} className="btn btn-success">Edit</Link>&nbsp;
                          <button onClick={this.delete.bind(this, book._id)} className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                    )}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <br/>
          <hr />
          <h6><Link {...this.props} to={`/create/${userId}`}> Add review</Link></h6>
        </Container>
      </>
    );
  }
}

export default UserReviews;