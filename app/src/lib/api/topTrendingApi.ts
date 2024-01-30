const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const topTrendingApi = async (): Promise<{ data: string }> => {
  const response = await fetch(`${API_BASE_URL}/top-trending`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  })
  return await response.json()
}
