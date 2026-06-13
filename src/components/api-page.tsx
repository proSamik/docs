import { createAPIPage } from 'fumadocs-openapi/ui'
import type { ApiPageProps } from 'fumadocs-openapi/ui/api-page'
import client from '@/components/api-page.client'
import { openapi } from '@/lib/openapi'

const APIRawPage = createAPIPage(openapi, {
  shikiOptions: {
    themes: {
      dark: 'vesper',
      light: 'vitesse-light',
    },
  },
  client,
})

export const APIPage = ({
  document,
  showTitle,
  showDescription,
  operations,
  webhooks,
}: ApiPageProps) => {
  return (
    <APIRawPage
      document={document}
      showTitle={showTitle}
      showDescription={showDescription}
      operations={operations}
      webhooks={webhooks}
    />
  )
}
