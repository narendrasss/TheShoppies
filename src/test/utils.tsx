import {
  render as testingLibRender,
  RenderOptions,
} from '@testing-library/react'
import { PolarisTestProvider } from '@shopify/polaris'
import enTranslations from '@shopify/polaris/locales/en.json'

export const render = (ui: React.ReactElement, options: RenderOptions = {}) =>
  testingLibRender(
    <PolarisTestProvider i18n={enTranslations}>{ui}</PolarisTestProvider>,
    options
  )
