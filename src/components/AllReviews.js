import React from "react";
import { Link } from 'react-router-dom';
import Navbar from "./Navbar.js";
import axios from "axios";
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
let userId="";
class AllReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    }
  }
  componentDidMount() {
    console.log("Props in Book Review: ", this.props);
    userId = this.props.match.params.id;
    console.log("UserId :",userId);
    axios.get('http://localhost:4000/api/review/')
      .then(res => {
        this.setState({ reviews: res.data });
        console.log("User state in Book Review: " ,this.state.reviews);
    });
  }
  render() {
    return (
      <>
        <Navbar {...this.props}/>
        <br/><br/>
        <Container>
          <Row>
            <Col xs={12}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">All Reviews</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th style={{ color: '#d93a16' }}>Book</th>
                        <th style={{ color: '#d93a16' }}>Rating</th>
                        <th style={{ color: '#d93a16' }}>Review</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.reviews.map(book =>
                        <tr>
                          <td style={{fontWeight: "bold"}}>{book.title}</td>
                          <td>{book.rating}</td>
                          <td>{book.review}</td>
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
          <h6><Link {...this.props} to={`/myreviews/${userId}`}> View your reviews</Link></h6>
        </Container>
      </>
    );
  }
}
export default AllReviews;