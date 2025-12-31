import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000");
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, []);
  return (
    <div>
      {data.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
}
