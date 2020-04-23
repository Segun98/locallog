import '../styles.css'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { withApollo } from '../lib/apollo'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default withApollo({ ssr: true })(MyApp)