import React, { useState, useEffect, useCallback } from "react";
import _ from "lodash";

export default ({ fetchData }) => {
  const [userQuery, setUserQuery] = useState("");
  const updateQuery = () => fetchData(userQuery);
  const delayedQuery = useCallback(_.debounce(updateQuery, 500), [userQuery]);
  const handleChange = (e) => setUserQuery(e.target.value);

  useEffect(() => {
    if (userQuery) {
      delayedQuery();
    }
    // Cancel the debounce on useEffect cleanup.
    return delayedQuery.cancel;
  }, [userQuery, delayedQuery]);

  return (
    <input
      type='text'
      className='input'
      onChange={handleChange}
      value={userQuery}
    />
  );
};
