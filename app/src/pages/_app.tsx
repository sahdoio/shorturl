import AppLayout from '@/app/layouts/AppLayout'

export default function MyApp({ Component, pageProps }) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}
