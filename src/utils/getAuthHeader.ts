const getAuthHeader = (token: string) => {
  return {
    headers: { Authorization: 'Bearer ' + token },
  };
};
export default getAuthHeader;
