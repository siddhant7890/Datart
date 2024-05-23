// import React from 'react';
// import ScholarshipForm from './ScholarshipForm';
// import 'bootstrap/dist/css/bootstrap.min.css';
// function App() {
//   return (
//     <div className="App">
//       {/* <h1>Scholarship Application Form</h1> */}
//       <ScholarshipForm />
//     </div>
//   );
// }


// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScholarshipForm from './ScholarshipForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewData from './ViewData';        // Component to view the data

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ScholarshipForm />} />
        <Route path="/view-data" element={<ViewData />} />
      </Routes>
    </Router>
  );
}

export default App;