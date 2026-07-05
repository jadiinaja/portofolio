import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import Portfolio from '../portfolio.jsx'

class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(e) { return { error: e }; }
  render() {
    if (this.state.error) return (
      <div style={{ minHeight:"100vh", background:"#0D1117", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", textAlign:"center" }}>
        <div>
          <div style={{ color:"#10B981", fontSize:10, letterSpacing:4, marginBottom:16 }}>RENDER ERROR</div>
          <div style={{ color:"#94A3B8", fontSize:13, maxWidth:400 }}>{this.state.error.message}</div>
          <button onClick={() => this.setState({ error: null })}
            style={{ marginTop:24, padding:"8px 20px", background:"none", border:"1px solid #10B981", color:"#10B981", borderRadius:8, cursor:"pointer", fontFamily:"monospace", fontSize:12, letterSpacing:1 }}>
            RETRY
          </button>
        </div>
      </div>
    );
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <Portfolio />
    </ErrorBoundary>
  </StrictMode>,
)
