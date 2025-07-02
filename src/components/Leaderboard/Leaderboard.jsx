import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function Leaderboard() {
    const [topUsers, setTopUsers] = useState([]);

    //response is a list of dictionaries each containing fields "username", "score", "accuracy", "timestamp"
    const handleLeaderBoard = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/leaderboard');
            setTopUsers(response.data.leaderboard_data);
        }
        catch(error) {
            alert("Failed to view the leaderboard" + (error.response?.data?.message || error.message));
        }
    }

    useEffect(() => {
        handleLeaderBoard();
    }, []);


    return (
        <div className="flex justify-center mt-10">
          <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-3xl">
            <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">Leaderboard</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-100">
                  <th className="p-2 border-b">Rank</th>
                  <th className="p-2 border-b">Username</th>
                  <th className="p-2 border-b">WPM</th>
                  <th className="p-2 border-b">Accuracy</th>
                  <th className="p-2 border-b">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {topUsers.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="p-2 border-b">{index + 1}</td>
                    <td className="p-2 border-b">{user.username}</td>
                    <td className="p-2 border-b">{user.score}</td>
                    <td className="p-2 border-b">{user.accuracy}%</td>
                    <td className="p-2 border-b">{user.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    );
    
}

export default Leaderboard;