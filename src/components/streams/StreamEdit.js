import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStreamById } from "../../redux/features/streamSlice";

const StreamEdit = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStreamById(id));
  }, [dispatch, id]);

  const stream = useSelector((state) => state.streamState.stream[id]);
  console.log(stream);

  const renderStream = () => {
    if (!stream) {
      return <div></div>;
    } else {
      return <div>{stream.title}</div>;
    }
  };

  return <>{renderStream()}</>;
};

export default StreamEdit;
