import { createContext, useContext, useState } from 'react';

const TimeRecordsContext = createContext();

export const TimeRecordsProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const [needsRefresh, setNeedsRefresh] = useState(false);

  return (
    <TimeRecordsContext.Provider value={{ records, setRecords, needsRefresh, setNeedsRefresh }}>
      {children}
    </TimeRecordsContext.Provider>
  );
};

export const useTimeRecords = () => useContext(TimeRecordsContext);