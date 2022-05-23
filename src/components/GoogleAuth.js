import React, { useEffect, useRef, useCallback } from "react";
import { signIn, signOut } from "../redux/features/authSlice";
import { useSelector, useDispatch } from "react-redux";

const GoogleAuth = () => {
  const auth = useRef("");

  // Redux hooks to read state values and dispatch actions
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  const dispatch = useDispatch();

  const onAuthChange = useCallback(
    (isSignedIn) => {
      if (isSignedIn) {
        dispatch(signIn(auth.current.currentUser.get().getId()));
      } else {
        dispatch(signOut());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    window.gapi.load("client:auth2", async () => {
      await window.gapi.client.init({
        clientId:
          "818211386316-f28ptoommh2er92fufbl1ad62nf90jep.apps.googleusercontent.com",
        scope: "email",
        plugin_name: "stream demon",
      });
      auth.current = window.gapi.auth2.getAuthInstance();
      onAuthChange(auth.current.isSignedIn.get());
      auth.current.isSignedIn.listen(onAuthChange);
    });
  }, [onAuthChange]);

  const onSignOutClick = () => auth.current.signOut();

  const onSignInClick = () => auth.current.signIn();

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <button onClick={onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={onSignInClick} className="ui blue google button">
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  };

  return <div>{renderAuthButton()}</div>;
};

export default GoogleAuth;
