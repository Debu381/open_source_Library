import { createContext, useState } from 'react';

const SidebarVisibilityContext = createContext();

// named export
export function SidebarVisibilityContextProvider({children}) {
  const [sidebarVisibility, setSidebarVisibility] = useState(false);

  // helper function to make the call-site cleaner
  function toggleSidebarVisibility() {
    setSidebarVisibility((prevState) => prevState ? false : true );
  }

  return (
    <SidebarVisibilityContext.Provider value={[sidebarVisibility, setSidebarVisibility, toggleSidebarVisibility]}>
      {children}
    </SidebarVisibilityContext.Provider>
  );
}

// default export
export default SidebarVisibilityContext;