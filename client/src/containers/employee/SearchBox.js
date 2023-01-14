import React, { useState } from 'react';
import {Form, Button,Col, Row} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { instance } from '../../apis/JobSolutionApi';
import { fetchAllJobs } from '../../redux/actions/UserAction';
import Loader from '../common/Loader';

function SearchBox() {
  const [searchData, setSearchData] = useState({
                                        jobTitle : '', jobLocation : ''
                              });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const changeSearchDetails = ({currentTarget : input}) => {
                                setSearchData({...searchData, [input.name] : input.value});
                        }
  const searchJob = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
          const res = await instance.post('/jobs/searchJob', searchData);
          dispatch(fetchAllJobs(res.data.searchResult));
        }catch(err) { }
    setLoading(false);
  }
  return (
    <>
      {loading && <Loader />}
        <Form className='mb-2' onSubmit={searchJob}>
          <Row>
            <Col md={5}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Search by job title" name="jobTitle" value={searchData.jobTitle} onChange={changeSearchDetails}/>
                </Form.Group>
            </Col>
            <Col md={5}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Search by place" name="jobLocation" value={searchData.jobLocation} onChange={changeSearchDetails}/>
                </Form.Group>
            </Col>
            <Col md={2}>
                <Button variant="primary" style={{width:'100%'}} type="submit">
                      Search
                </Button>
            </Col>
          </Row>
        </Form>
      </>
  )
}

export default SearchBox;