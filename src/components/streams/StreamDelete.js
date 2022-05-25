import React, { useEffect } from "react";
import { history } from "../../history";
import Modal from "../Modal";
import {
  fetchStreamById,
  deleteStream,
} from "../../redux/features/streamSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

const StreamDelete = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchStreamById(id));
  }, [dispatch, id]);

  const stream = useSelector((state) => state.streamState.stream[id]);
  console.log(stream);

  const submitDelete = () => {
    dispatch(deleteStream(id));
    
  };

  const actions = () => (
    <>
      <button onClick={submitDelete} className="ui button negative">
        Delete
      </button>
      <Link to="/" className="ui button">
        Cancel
      </Link>
    </>
  );
  function renderContent() {
    if (!stream) {
      return "Are you sure you want to delete this stream?";
    } else {
      return `Are you sure you want to delete ${stream.title}`;
    }
  }

  return (
    <Modal
      title="Delete Stream"
      message={renderContent()}
      actions={actions()}
      onDismiss={() => history.push("/")}
    />
  );
};

export default StreamDelete;
