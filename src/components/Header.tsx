import logo from '../logo.svg'

function Header() {
  return (
    <header>
      <img src={logo} className="logo" alt="logo" />
      <span>React Unsplash Photos</span>
    </header>
  )
}

export { Header }
