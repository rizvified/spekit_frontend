import React, { useState, useEffect, useCallback } from "react";
import _ from "lodash";

export default ({ fetchData }) => {
  const [userQuery, setUserQuery] = useState("");
  const updateQuery = () => fetchData(userQuery);
  const debouncedFetch = useCallback(_.debounce(updateQuery, 2000), [
    userQuery,
  ]);

  useEffect(() => {
    if (userQuery) {
      debouncedFetch();
    }
  }, [userQuery, debouncedFetch]);

  const handleChange = (e) => setUserQuery(e.target.value);

  return (
    <input
      type='text'
      className='input'
      onChange={handleChange}
      value={userQuery}
    />
  );
};
