import React, { useState, useEffect } from "react";

interface AlbionKillboardProps {
  playerId: string;
}

const AlbionKillboard: React.FC<AlbionKillboardProps> = ({ playerId }) => {
  interface Kill {
    EventId: string;
    Killer: {
      Name: string;
    };
    Victim: {
      Name: string;
    };
    TotalVictimKillFame: number;
  }

  const [kills, setKills] = useState<Kill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKills = async () => {
      try {
        const response = await fetch(
          `https://gameinfo.albiononline.com/api/gameinfo/players/3vJRMo7_QqS7tJkQKwOlIg/kills?limit=5`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch kill data");
        }
        const data = await response.json();
        setKills(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (playerId) {
      fetchKills();
    }
  }, [playerId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Last 5 Kills</h2>
      <ul>
        {kills.map((kill) => (
          <li key={kill.EventId}>
            <strong>{kill.Killer.Name}</strong> killed{" "}
            <strong>{kill.Victim.Name}</strong>
            <br />
            Fame: {kill.TotalVictimKillFame}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbionKillboard;
