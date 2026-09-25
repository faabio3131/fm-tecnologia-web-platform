import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback: ReactNode
}

interface State {
  failed: boolean
}

/** Rede de segurança: se o Canvas 3D falhar em runtime (contexto WebGL perdido,
 * driver instável etc.), cai para o fallback estático em vez de quebrar a página. */
export class CanvasErrorBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: unknown) {
    console.error('[CoreScene3D] falling back to static hero image:', error)
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}
