import React, { useEffect, useState, useRef } from "react";
import "./ProfileSettings.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadingMessage from "../LoadingMessage/LoadingMessage";
import updateSettings from "../../services/settingServices/updateSettings";

const ProfileSettings = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const selectRef = useRef();

  useEffect(() => {
    fetch(
      `http://localhost:3030/data/settings?where=_ownerId%3D%22${user._id}%22`
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.code) {
          setData([]);
        } else {
          setData(response[0]);
        }
      })
      .catch(() => {
        setError("The server failed to connect.");
      });
  }, [user._id]);

  function cancelHandler() {
    selectRef.current.value = data.theme;
  }

  async function saveHandler() {
    const response = await updateSettings(
      user.accessToken,
      selectRef.current.value,
      data._id
    );

    if (response !== undefined) {
      if (!response.code) {
        window.location.reload()
      } else {
        setError(`${response.message}.`);
      }
    } else {
      setError("The server failed to connect.");
    }
  }

  return (
    <div className="profile-settings-div-container">
      {error && <ErrorMessage error={error} />}
      {data ? (
        <>
          <div>
            <label htmlFor="theme-setting">Theme:</label>
            <select
              id="theme-setting"
              defaultValue={data.theme}
              ref={selectRef}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
          <div>
            <button onClick={cancelHandler}>Cancel</button>
            <button onClick={saveHandler}>Save</button>
          </div>
        </>
      ) : (
        <LoadingMessage />
      )}
    </div>
  );
};

export default ProfileSettings;
