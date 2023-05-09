const updateSettings = (accessToken, theme, settingsId) => {
  return fetch(`http://localhost:3030/data/settings/${settingsId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": accessToken,
    },
    body: JSON.stringify({ theme }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export default updateSettings;
