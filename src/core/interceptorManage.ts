import type { ResolvedFn, RejectedFn } from "../types"

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class InterceptorManage<T> {
  private interceptor: (Interceptor<T> | null)[] = []

  constructor() {
    this.interceptor = []
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectedFn) {
    this.interceptor.push({
      resolved,
      rejected
    })

    return this.interceptor.length - 1
  }

  forEach(fn: (interceptor: Interceptor<T>)=>void) {
    this.interceptor.forEach(interceptor => {
      if (interceptor) {
        fn(interceptor)
      }
    })
  }

  eject(id: number) {
    if (this.interceptor[id]) {
      this.interceptor[id] = null
    }
  }
}
