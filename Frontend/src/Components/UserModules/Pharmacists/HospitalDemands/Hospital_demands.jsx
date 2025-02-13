import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const HospitalDemand = () => {
  const [demands, setDemands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
  .get("http://localhost:5000/inventory/api/demands")  // Correct API path
  .then((response) => {
    setDemands(response.data);
    setLoading(false);
  })
  .catch((error) => {
    console.error("Error fetching demands:", error);
    if (error.response) {
      setError(`Error: ${error.response.data.message}`);
    } else if (error.request) {
      setError("No response from server");
    } else {
      setError("Error occurred while making the request");
    }
    setLoading(false);
  });

      
  }, []);

  const handleViewDemand = (demandId) => {
    navigate(`/demand/${demandId}`); // Navigate to demand details page
  };

  if (loading) {
    return <div>Loading hospital demands...</div>;
  }

  return (
    <div className="container">
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="demand-list">
        <thead>
          <tr>
            <th>Doctor Name</th>
            <th>Department</th>
            <th>Request Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {demands.map((demand) => (
            <tr key={demand._id}>
              <td>{demand.doctorName}</td>
              <td>{demand.department}</td>
              <td>{new Date(demand.request_date).toLocaleDateString()}</td>
              <td>
                <button
                  onClick={() => handleViewDemand(demand._id)}
                  className="btn btn-primary"
                >
                  View Demand
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/pharmacy-dashboard" className="back-to-home">
        Home
      </Link>
    </div>
  );
};

export default HospitalDemand;
