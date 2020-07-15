import React, { useState, useEffect } from "react";
import Select from "react-select";

export default ({ onChange, options }) => {
  const [artist, setArtist] = useState("");

  useEffect(() => {
    onChange(artist);
  }, [artist]);

  const handleChange = (value) => {
    setArtist(value);
  };

  return (
    <div>
      <Select value={artist} onChange={handleChange} options={options} />
    </div>
  );
};
