import React from "react";

export default function Fetcher() {
  const [data, setData] = React.useState<{ hello: "world" } | null>(null);

  React.useEffect(() => {
    fetch("/api/data")
      .then((r) => r.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <h2>Fetcher</h2>
      {data ? <pre>hello: {data.hello}</pre> : <p>Loading...</p>}
    </div>
  );
}
