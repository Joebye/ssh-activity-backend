import EventLoginDataGrid from "./components/EventLoginDataGrid";



function App() {
  return (
  <EventLoginDataGrid 
    mainTitle={" SSH Login Monitor"}
    emptyState={"No logins yet."}/>
  );
}

export default App;
