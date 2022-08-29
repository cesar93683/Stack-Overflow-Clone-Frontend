const getAuthHeader = (token: string | null) => {
  return {
    headers: { Authorization: 'Bearer ' + (token ? token : '') },
  };
};
export default getAuthHeader;
