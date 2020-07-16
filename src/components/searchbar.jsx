import React, { useState, useEffect, useCallback } from "react";
import _ from "lodash";

export default ({ fetchData }) => {
  const [userQuery, setUserQuery] = useState("");
  const updateQuery = () => fetchData(userQuery);
  const debouncedFetch = useCallback(_.debounce(updateQuery, 500), [userQuery]);

  useEffect(() => {
    if (userQuery) {
      debouncedFetch();
    }
    // Cancel the debounce on useEffect cleanup.
    return debouncedFetch.cancel;
  }, [userQuery, debouncedFetch]);

  const handleChange = (e) => setUserQuery(e.target.value);

  return (
    <input
      type='text'
      className='input'
      placeholder='Enter artist name..'
      onChange={handleChange}
      value={userQuery}
    />
  );
};
