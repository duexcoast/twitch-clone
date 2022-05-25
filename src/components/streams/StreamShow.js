import React, { useEffect } from "react";
import { fetchStreamById } from "../../redux/features/streamSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const StreamShow = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const stream = useSelector((state) => state.streamState.stream[id]);

  useEffect(() => {
    dispatch(fetchStreamById(id));
  });

  function renderStream() {
    if (!stream) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h1>{stream.title}</h1>
        <h5>{stream.description}</h5>
      </div>
    );
  }

  return <>{renderStream()}</>;
};

export default StreamShow;
