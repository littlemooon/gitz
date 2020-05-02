import React, { useEffect } from 'react'
import Column from '../components/Column'
import Json from '../components/Json'
import LogText from '../components/LogText'
import { join } from '../lib/string'
import getUuid from '../lib/uuid'
import { useStatic } from '../providers/StaticProvider'
import usePrevious from './usePrevious'

export default function useDebug<T extends { [x: string]: any }>(
  name: string,
  obj: T
) {
  const { addStatic } = useStatic()
  const prev = usePrevious<T>(obj)

  useEffect(() => {
    addStatic(
      getUuid('debug'),
      <Column>
        {Object.entries(obj).map(([key, value]) => {
          if (prev) {
            if (value !== prev[key]) {
              return (
                <LogText.Debug key={key} prefix={join([name, key], ':')}>
                  <Column>
                    <Json>{prev[key]}</Json>
                    <Json>{value}</Json>
                  </Column>
                </LogText.Debug>
              )
            }
          }
        })}
      </Column>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
