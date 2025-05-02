import React, { useState } from 'react';
import Papa from 'papaparse';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [data, setData] = useState([]);
  const [totalSalary, setTotalSalary] = useState(0);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          console.log(results);
          const parsedData = results.data;
          const total = parsedData.reduce((sum, row) => sum + parseFloat(row['Net Salary'] || 0), 0);
          setData(parsedData);
          setTotalSalary(total);
        },
      });
    }
  };

  return (
    <div className="container py-5  ">
      <h2 className="text-center mb-4">Payroll CSV Upload</h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-4 form-control"
      />

      {data.length > 0 && (
        <>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="thead-light">
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Net Salary</th>
                  <th>LOP Days</th>
                  <th>PF</th>
                  <th>ESI</th>
                  <th>TDS</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr key={idx}>
                    <td className="text-center">{row['Employee ID']}</td>
                    <td>{row['Name']}</td>
                    <td className="text-right">₹{parseFloat(row['Net Salary']).toFixed(2)}</td>
                    <td className="text-center">{row['LOP Days']}</td>
                    <td className="text-center">{row['PF']}</td>
                    <td className="text-center">{row['ESI']}</td>
                    <td className="text-center">{row['TDS']}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2" className="text-right font-weight-bold">Total Net Salary:</td>
                  <td className="text-right">₹{totalSalary.toFixed(2)}</td>
                  <td colSpan="4"></td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-success">Proceed to Disbursal</button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
