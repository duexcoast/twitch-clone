import React from "react";
import { useDispatch } from "react-redux";
import { createStream } from "../../redux/features/streamSlice";
import StreamForm from "./StreamForm";

// ### StreamCreate COMPONENT ###
//
const StreamCreate = () => {
  const dispatch = useDispatch();
  const onFormSubmit = (formValues) => {
    dispatch(createStream(formValues));
  };

  return (
    <div>
      <h3>Create a Stream</h3>
      <StreamForm onFormSubmit={onFormSubmit} />
    </div>
  );
};

export default StreamCreate;
