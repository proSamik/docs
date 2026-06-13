'use client'

import type { ComponentProps } from 'react'
import BaseOpenAPIClientPage from './api-page.client'

type OpenAPIClientPageProps = ComponentProps<typeof BaseOpenAPIClientPage>

export default function OpenAPIClientPage({
  style: _style,
  className: _className,
  ...props
}: OpenAPIClientPageProps & { style?: unknown; className?: unknown }) {
  return <BaseOpenAPIClientPage {...(props as OpenAPIClientPageProps)} />
}
