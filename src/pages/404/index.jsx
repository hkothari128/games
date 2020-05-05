import React from 'react';
import { Link } from 'react-router-dom'

const PageNotFound = () => (
  <div>
    <h1>
      THE PAGE YOU HAVE REQUEST WAS NOT FOUND
    </h1>
    <Link to="/">
      <button >
        GO BACK TO HOME PAGE
      </button>
    </Link>
  </div>
)

export default PageNotFound;