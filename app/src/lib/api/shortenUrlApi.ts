const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const shortenUrlApi = async (url: string): Promise<{ data: number }> => {
  const response = await fetch(`${API_BASE_URL}/shorten`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  })
  return await response.json()
}
