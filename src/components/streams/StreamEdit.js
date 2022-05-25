import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStreamById, editStream } from "../../redux/features/streamSlice";
import StreamForm from "./StreamForm";

const StreamEdit = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStreamById(id));
  }, [dispatch, id]);

  const stream = useSelector((state) => state.streamState.stream[id]);

  const renderStream = () => {
    if (!stream) {
      return <div></div>;
    } else {
      return (
        <div>
          <h2>Edit Stream:</h2>
          <StreamForm
            onFormSubmit={onSubmit}
            initialValues={{
              title: stream.title,
              description: stream.description,
            }}
          />
        </div>
      );
    }
  };

  const onSubmit = (formValues) => {
    const editValues = { id, ...formValues };

    dispatch(editStream(editValues));
  };

  return <>{renderStream()}</>;
};

export default StreamEdit;
