const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const getUrlApi = async (hash: string): Promise<{ data: string }> => {
  const response = await fetch(`${API_BASE_URL}/get-url/${hash}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  })
  return await response.json()
}
