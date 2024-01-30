/* Instruments */
import type { ReduxState } from "@/lib/redux"

export const selectShortUrl = (state: ReduxState) => state.url.shortUrl
