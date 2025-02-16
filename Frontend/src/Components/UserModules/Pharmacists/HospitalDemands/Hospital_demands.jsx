import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./HospitalDemand.css"

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
    <div className="hospital-demand-container">
    <div className="hospital-demand">
  {error && <div className="hospital-demand-error">{error}</div>}
  <table className="hospital-demand-table">
    <thead className="hospital-demand-thead">
      <tr className="hospital-demand-tr">
        <th className="hospital-demand-th">Doctor Name</th>
        <th className="hospital-demand-th">Department</th>
        <th className="hospital-demand-th">Request Date</th>
        <th className="hospital-demand-th">Action</th>
      </tr>
    </thead>
    <tbody className="hospital-demand-tbody">
      {demands.map((demand) => (
        <tr key={demand._id} className="hospital-demand-tr">
          <td className="hospital-demand-td">{demand.doctorName}</td>
          <td className="hospital-demand-td">{demand.department}</td>
          <td className="hospital-demand-td">
            {new Date(demand.request_date).toLocaleDateString()}
          </td>
          <td className="hospital-demand-td">
            <button
              onClick={() => handleViewDemand(demand._id)}
              className="hospital-demand-btn"
            >
              View Demand
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <Link to="/pharmacy-dashboard" className="hospital-demand-home-link">
    Home
  </Link>
</div>
</div>
  );
};

export default HospitalDemand;
