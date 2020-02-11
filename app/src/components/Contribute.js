import React, { useState, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';

const INITIAL_STATE = {
  name: undefined,
  city: undefined,
  country: undefined,
  region: undefined,
  year: undefined,
  moreInfoUrl: undefined,
  pictureUrl: undefined
}

const CREATE_BRIDGE = gql`
  mutation createBridge($options: BridgeInput!) {
    createBridge(options: $options) {
      id
    }
  }
`

const Contribute = () => {
  const [ bridge, setBridge ] = useState(INITIAL_STATE);
  const [ createBridge, _ ] = useMutation(CREATE_BRIDGE);
  const [ error, setError ] = useState();
  const [ addMore, setAddMore ] = useState(false);
  const nameRef = useRef();
  const cityRef = useRef();
  const countryRef = useRef();
  const regionRef = useRef();
  const yearRef = useRef();
  const urlRef = useRef();
  const pictureUrlRef = useRef();

  const updateBridge = event => {
    const { value, name } = event.target;

    if(error) {
      setError()
    }

    setBridge({
      ...bridge,
      [name]: value
    });
  }

  const clearForm = e => {
    e.preventDefault();

    nameRef.current.value = "";
    cityRef.current.value = "";
    countryRef.current.value = "";
    regionRef.current.value = "";
    yearRef.current.value = "";
    urlRef.current.value = "";
    pictureUrlRef.current.value = "";

    setAddMore(false);
    setBridge(INITIAL_STATE);
  }
  
  const submit = async event => {
    event.preventDefault();

    try {
      await createBridge({
        variables: {
          options: {
            name: bridge.name || null,
            city: bridge.city || null,
            country: bridge.country || null,
            region: bridge.region || null,
            year: parseInt(bridge.year) || null,
            url: bridge.moreInfoUrl || null,
            pictureUrl: bridge.pictureUrl || null,
          }
        }
      });

      setAddMore(true);
    } catch(e) {
      setError('Invalid input. Please try again.');
    }
  }

  return (
    <div className="contribute">
      <div className="contribute__back">
        <Link to="/vote"><span>{"<"}</span> Back to Vote</Link>
      </div>
      <div className="contribute__title">
        <span>Cotntribute</span>
        <span className="contribute__subtitle">Register bridges you know</span>
      </div>

      <form className="contribute__form" onSubmit={submit} >
        <input type="text" ref={nameRef} defaultValue={bridge.name} name="name" placeholder="name" onChange={updateBridge} />
        <input type="text" ref={cityRef} defaultValue={bridge.city} name="city" placeholder="city" onChange={updateBridge} />
        <input type="text" ref={countryRef} defaultValue={bridge.country} name="country" placeholder="country" onChange={updateBridge} />
        <input type="text" ref={regionRef} defaultValue={bridge.region} name="region" placeholder="region" onChange={updateBridge} />
        <input type="text" ref={yearRef} defaultValue={bridge.year} name="year" placeholder="year" onChange={updateBridge} />
        <input type="text" ref={urlRef} defaultValue={bridge.moreInfoUrl} name="moreInfoUrl" placeholder="more info url" onChange={updateBridge} />
        <input type="text" ref={pictureUrlRef} defaultValue={bridge.pictureUrl} name="pictureUrl" placeholder="picture url" onChange={updateBridge} />
        <input type="submit" className="contribute__form-submit" />

        {
          error && (
            <div className="contribute__error">
              <span>{error}</span>
            </div>
          )
        }

        {
          addMore && (
            <div className="contribute__add-more">
              <span>Success!</span>
              <button onClick={clearForm}>Add More</button>
            </div>
          )
        }
      </form>
    </div>
  )
}

export default Contribute;