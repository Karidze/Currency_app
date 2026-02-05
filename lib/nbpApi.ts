export async function getTopRates() {
  try {
    const url = `http://api.nbp.pl/api/exchangerates/tables/A?format=json`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data && data[0] && data[0].rates) {
      const targetCodes = ['USD', 'EUR', 'GBP', 'CHF', 'UAH', 'TRY'];
      return data[0].rates.filter((r: any) => targetCodes.includes(r.code));
    }
    
    return [];
  } catch (error: any) {
    console.error("NBP API Error:", error.message);
    return [];
  }
}