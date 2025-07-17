"use client";
import * as React from "react";

import { FormControl, TextField, Button, Divider } from "@mui/material";
import { Form } from "informed";
import { css } from "@emotion/css";

const catImage = css`
  width: 100%;
  height: auto;

  @media screen and (min-width: 767px) {
    width: auto;
    height: auto;
  }
`;

// generate a random http status code between 100 and 599
const getRandomStatusCode = () => {
  return Math.floor(Math.random() * (599 - 100 + 1)) + 100;
};

const Cats: React.FC<any> = () => {
  const [result, setResult] = React.useState(200);
  const [number, setNumber] = React.useState(200);

  const onChangeEvent = (e) => {
    setResult(e.target.value);
  };
  const onSubmitEvent = () => {
    if (!result) {
      const code = getRandomStatusCode();
      setResult(code);
      setNumber(code);
    } else {
      setNumber(result);
      // reset the result to 200 after submitting
      setResult(result);
    }
  };

  const onSubmitEventRandom = () => {
    const code = getRandomStatusCode();
    setResult(code);
    setNumber(code);
  };

  return (
    <>
      <div>
        <h2>HTTP Cats</h2>
        <img src={`https://http.cat/${number}.jpg`} alt="No cat found :(" className={catImage} />
        <Divider />
        <Form onSubmit={onSubmitEvent}>
          <FormControl>
            <TextField
              placeholder="Enter search term"
              label="HTTP Status Code"
              value={result}
              onChange={onChangeEvent}
            />
            <Button variant="contained" color="primary">
              Show me a cat
            </Button>
          </FormControl>
        </Form>
      </div>
    </>
  );
};

export default Cats;
