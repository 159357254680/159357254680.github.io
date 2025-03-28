import { Component } from "react"

class ErrorBoundary extends Component {
    
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true,error:error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
            <img 
                src='/404.png' 
                alt='图片暂时不见了'
                style={{width: '100%', height: '41rem'}}>
            </img>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary