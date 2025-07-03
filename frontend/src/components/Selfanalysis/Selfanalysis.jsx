import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
const apiUrl = import.meta.env.VITE_BACKEND_URL;

function Selfanalysis() {
    const [maxscore, setMaxscore] = useState(null);
    const [scores, setScores] = useState([]);

    const handleAnalysis = async () => {
        try {
            const response = await axios.get(`${apiUrl}api/selfanalysis`, {withCredentials : true});
            setMaxscore(response.data.maxscore);
            setScores(response.data.scores);
        }
        catch(error) {
            if (error.response?.status === 401) {
                alert("Please login first");
            }
            else {
                alert("Failed to view past scores" + (error.response?.data?.message || error.message));
            }
        }
    }

    useEffect(() => {
        handleAnalysis();
    }, []);

    return (
        <div className="p-6 max-w-xl mx-auto bg-white shadow rounded-lg mt-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Your Performance</h2>
          {maxscore ? (
            <>
              <div className="text-lg mb-2">Max WPM: {maxscore.score}</div>
              <div className="text-lg mb-4">Accuracy: {maxscore.accuracy}%</div>
              <h3 className="text-xl font-semibold mb-2">Past Attempts:</h3>
              <ul className="space-y-2">
                {scores.map((entry, idx) => (
                  <li key={idx} className="border p-2 rounded-md bg-blue-50">
                    <div><strong>Score:</strong> {entry.score}</div>
                    <div><strong>Accuracy:</strong> {entry.accuracy}%</div>
                    <div><strong>Time:</strong> {entry.timestamp}</div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-gray-600">No performance data available.</p>
          )}
        </div>
      );
}

export default Selfanalysis;