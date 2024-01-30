import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk"
import { shortenUrlApi } from '@/lib/api/shortenUrlApi'

export const shortenUrlThunk = createAppAsyncThunk(
  "url/shorten",
  async (url: string): Promise<any> => {
    const response = await shortenUrlApi(url)
    return response.data
  }
)
