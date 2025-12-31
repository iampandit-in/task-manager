import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(
        "https://task-manager-server-mu-sage.vercel.app/"
      );
      const data = await res.json();
      setData(data);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col gap-2 text-center mt-10">
      {loading ? (
        <p>Loading...</p>
      ) : (
        data.map((item) => (
          <Card key={item.id}>
            <CardContent>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>{item.email}</CardDescription>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
