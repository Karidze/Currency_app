// lib/nbpApi.ts

export async function getTopRates() {
  try {
    const url = `https://api.nbp.pl/api/exchangerates/tables/A?format=json`;
    const response = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (data?.[0]?.rates) {
      const targetCodes = ["USD", "EUR", "GBP", "CHF", "UAH", "TRY"];
      return data[0].rates.filter((r: any) => targetCodes.includes(r.code));
    }
    return [];
  } catch (e: any) {
    console.error("NBP API Error:", e?.message);
    return [];
  }
}

/** Курси на конкретну дату (YYYY-MM-DD). 404 (вихідні/свята) → []. Мережева помилка → throw. */
export async function getRatesByDate(dateStr: string): Promise<any[]> {
  const url = `https://api.nbp.pl/api/exchangerates/tables/A/${dateStr}?format=json`;
  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  if (!response.ok) return [];
  const data = await response.json();
  if (data?.[0]?.rates) return data[0].rates;
  return [];
}