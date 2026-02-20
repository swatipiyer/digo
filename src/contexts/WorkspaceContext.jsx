import { createContext, useContext, useState, useEffect } from 'react';

const WorkspaceContext = createContext();

export function WorkspaceProvider({ children }) {
  const [currentRole, setCurrentRole] = useState(() =>
    localStorage.getItem('digo_current_role') || 'organizer'
  );
  const [currentPage, setCurrentPage] = useState(() =>
    localStorage.getItem('digo_current_page') || 'organizers'
  );

  useEffect(() => {
    localStorage.setItem('digo_current_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('digo_current_page', currentPage);
  }, [currentPage]);

  return (
    <WorkspaceContext.Provider value={{ currentRole, setCurrentRole, currentPage, setCurrentPage }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  return useContext(WorkspaceContext);
}
