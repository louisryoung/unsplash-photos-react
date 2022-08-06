import logo from '../logo.svg'

type Props = {
  isLoading: boolean
}

function LoadingSpinner({ isLoading }: Props) {
  return isLoading ? (
    <div className="loading-container">
      <img src={logo} className="spinner" alt="loading spinner" />
    </div>
  ) : null
}

export { LoadingSpinner }
