import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllStreams } from "../../redux/features/streamSlice";
import { Link } from "react-router-dom";

const StreamList = () => {
  const dispatch = useDispatch();
  const streams = useSelector((state) => state.streamState.stream);
  const streamsArr = Object.values(streams);
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  // let navigate = useNavigate()

  const currentUserId = useSelector(({ auth }) => auth.userId);

  useEffect(() => {
    dispatch(fetchAllStreams());
  }, [dispatch]);

  const renderAdmin = (stream) => {
    if (currentUserId === stream.userId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <button className="ui button negative">Delete</button>
        </div>
      );
    } else {
      return null;
    }
  };

  const renderCreate = () => {
    if (isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  };

  const renderList = () => {
    return streamsArr.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            {stream.title}
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <h2>Streams</h2>
      <div className="ui celled list">{renderList()}</div>
      {renderCreate()}
    </div>
  );
};

export default StreamList;
