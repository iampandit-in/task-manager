import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export default function Tasks() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://task-manager-server-mu-sage.vercel.app/"
        );
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="grid gap-2 grid-cols-2">
        {loading ? (
          <div className="flex items-center justify-center h-[50vh]">
            <Spinner className="h-6 w-6" />
          </div>
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
    </div>
  );
}
