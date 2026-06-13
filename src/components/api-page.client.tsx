'use client'

import { defineClientConfig } from 'fumadocs-openapi/ui/client'

type AuthStorageGuardWindow = Window & { __fumadocsOpenAPILocalStoragePatched?: boolean }

const AUTH_STORAGE_PREFIX = 'fumadocs-openapi-museum-'
const GENERIC_STORAGE_PREFIX = 'fumadocs-openapi-'

const isOpenAPIStorageKey = (key: string | null): boolean => {
  if (key == null) return false
  return key.startsWith(AUTH_STORAGE_PREFIX) || key.startsWith(GENERIC_STORAGE_PREFIX)
}

if (typeof window !== 'undefined') {
  const currentWindow = window as AuthStorageGuardWindow
  if (!currentWindow.__fumadocsOpenAPILocalStoragePatched) {
    const originalSetItem = localStorage.setItem.bind(localStorage)
    const clearOpenAPIStorage = () => {
      const keysToRemove: string[] = []

      for (let i = 0; i < localStorage.length; i += 1) {
        const key = localStorage.key(i)
        if (isOpenAPIStorageKey(key)) {
          keysToRemove.push(key)
        }
      }

      for (const key of keysToRemove) {
        localStorage.removeItem(key)
      }
    }

    localStorage.setItem = ((key, value): void => {
      try {
        originalSetItem(key, value)
        return
      } catch (error) {
        if (error instanceof DOMException && error.name === 'QuotaExceededError') {
          if (isOpenAPIStorageKey(key)) {
            try {
              clearOpenAPIStorage()
              localStorage.removeItem(key)
              originalSetItem(key, value)
              return
            } catch {
              return
            }
          }
        }
        throw error
      }
    }) as typeof localStorage.setItem

    currentWindow.__fumadocsOpenAPILocalStoragePatched = true
  }
}

export default defineClientConfig({
  storageKeyPrefix: AUTH_STORAGE_PREFIX,
})
