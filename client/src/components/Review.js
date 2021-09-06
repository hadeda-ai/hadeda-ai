import React, { useState, useEffect, useRef } from "react";
import ToothlessDataService from "../services/ToothlessService";
import { Link } from "react-router-dom";
import { Button, Container, Form, InputGroup, FormControl, Accordion, Card} from 'react-bootstrap';

const Review = (props) => {

  const [toothless, setToothless] = useState([]);
  const [toothlessList, setToothlessList] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [redactedWords, setRedactedWords] = useState([]);
  const [currentDocument, setCurrentDocument] = useState(false);
  const [checked, setChecked] = useState(false);  


  useEffect(() => {
    retrieveToothless(props.match.params.id);
    retrieveKeywords(props.match.params.id);
  }, [props.match.params.id]);

  const allToothless = () => {
    ToothlessDataService.getAll()
    .then(response => {
      setToothlessList(response.data)
    })
    .catch(e => {
      console.log(e);
    });
  }

  const retrieveToothless = id => {
    ToothlessDataService.get(id)
      .then(response => {
        setToothless(response.data.text);
        // console.log(response.data);
        setCurrentDocument(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveKeywords = id => {
    ToothlessDataService.getKeyword(id)
      .then(response => {
        let noDuplicates = response.data.keywords.reduce(function (previousValue, currentValue) {
          if (previousValue.indexOf(currentValue.word) === -1) {
            previousValue.push(currentValue.word)
          }
          return previousValue
        }, []);
        setKeywords(noDuplicates);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleCheck = keyword => {
    setChecked(!checked)
    console.log(keyword)
    setRedactedWords(...redactedWords, keyword);
    // setRedactedWords({ ...redactedWords, [name]: value });
    };

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      {currentDocument ? (
          <div>
          <br />
          <Container>
          <h4 className="text-center py-2" >Submitted Text</h4>
          <article>{toothless}</article>
          </Container> 
          <div className="d-flex justify-content-around">
          <Form onSubmit={handleSubmit} className="my-4">
            <Form.Group controlId="keywordCheckBox">
            <Form.Label as="h3">Terms for redaction</Form.Label>
            <Form.Label as="article">There are {keywords.length} unique named entities.</Form.Label>
            {keywords &&
            keywords.map((keyword, index) => (
              <div key={index} className="my-2 mx-2">
                <Form.Check 
                type="checkbox"
                name="id[word]"
                value={keyword}
              >
                  <Form.Check.Input type="checkbox" onChange = {() => handleCheck(keyword)} isValid={checked} />
                  <Form.Check.Label>{keyword}</Form.Check.Label>
                </Form.Check>
              </div>
            ))}
            </Form.Group>      
          <label htmlFor="created-redaction-term">Add your own redaction term here:</label>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
            <InputGroup.Checkbox aria-label="Checkbox for following text input" />
            </InputGroup.Prepend>
            <FormControl aria-label="Text input with checkbox" />
          </InputGroup>
        </Form>
        </div>
          <Link to={`/output/${props.match.params.id}`} className="nav-link">
         <Button type="submit" className="my-2 float-lg-right float-md-right float-sm-right btn-success">
             To Output Page
               </Button>
               </Link>       
    </div>
      ) : (
        <>
        <h1>Previously Uploaded documents for review:</h1>
        </>
      )
}
  </>
  )
}

export default Review;
