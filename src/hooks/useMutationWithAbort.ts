import { useRef } from 'react'

export const useMutationWithAbort = (useMutation: any) => {
  const [trigger, data] = useMutation()

  const abort = useRef<() => {} | undefined>()
  const triggerWithAbort = (args: any[]) => {
    const request = trigger(args)

    abort.current = () => request?.abort()

    request?.then(() => {
      abort.current = undefined
    })

    return request
  }

  return [triggerWithAbort, data, abort.current]
}
