import AppLayout from '@/app/layouts/AppLayout'

export default function MyApp({ Component, pageProps, ...appProps }) {
  const isHashPage = ['/[hash]'].includes(appProps.router.pathname)

  if (isHashPage) {
    return <Component { ...pageProps } />
  }

  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}
