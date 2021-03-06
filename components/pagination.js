import PropTypes from 'prop-types'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Pagination({ count, perPage = 20 }) {

  const router = useRouter()
  const page = Math.max(1, router.query.page) || 1

  const last = Math.ceil(count / perPage)
  const result = [ page - 2, page - 1, page, page + 1, page + 2 ]
  const filtered = result.filter(cur => cur > 0 && cur <= last)

  return (
    !!(filtered.length > 1) &&
      <ul className="pagination my-4">
        {
          filtered.map(page => (
            <li className="page-item" key={ page }>
              <Link href={ `${ router.pathname }?page=${page}` }>
                <a className="page-link">
                  { page }
                </a>
              </Link>
            </li>
          ))
        }
      </ul>
  )
}

Pagination.propTypes = {
  count: PropTypes.number,
  perPage: PropTypes.number,
}

Pagination.defaultProps = {
  perPage: 20
}
