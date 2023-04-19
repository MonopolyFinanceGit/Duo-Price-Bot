import { useEffect, useState } from "react";

export default function useGetEthPrice() {
  const [price, setPrice] = useState("...");

  useEffect(() => {
    async function getPrice() {
      const raw = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=monopoly-layer2-duo&vs_currencies=usd"
      );
      const { data } = await raw.json();
      setPrice(data['monopoly-layer2-duo'].amount);
    }

    getPrice(); // initial call
    const interval = setInterval(() => getPrice(), 5000);

    return () => clearInterval(interval);
  }, []);

  return { price };
}
