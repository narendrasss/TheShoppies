import React from 'react'
import ReactDOM from 'react-dom'
import { AppProvider } from '@shopify/polaris'
import enTranslations from '@shopify/polaris/locales/en.json'
import '@shopify/polaris/dist/styles.css'

import ShoppiesSearch from './ShoppiesSearch'

ReactDOM.render(
  <React.StrictMode>
    <AppProvider i18n={enTranslations}>
      <ShoppiesSearch />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
