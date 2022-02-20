import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router';

export default function Navbar() {

  const router = useRouter()

  const ref = useRef()

  useEffect(async () => {
    const { Collapse } = await import('bootstrap')
    const collapse = Collapse.getOrCreateInstance(ref.current, { toggle: false })
    collapse?.hide()
  }, [ router ]);

  const getLinkClass = path => {
    return router.pathname === path ? 'nav-link active' : 'nav-link'
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <div className='container'>
        <Link href="/">
          <a className="navbar-brand">News App</a>
        </Link>
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbar-collapse">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div ref={ ref } className="collapse navbar-collapse" id="navbar-collapse">
          <ul className="navbar-nav ms-auto my-3 my-md-0">
            <li className="nav-item">
              <Link href="/news">
                <a className={ getLinkClass('/news') }>News</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/import">
              <a className={ getLinkClass('/import') }>Import</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
