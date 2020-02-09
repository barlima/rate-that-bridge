import React from 'react';
import Header from './Header';

const withMenu = WrappedComponent => {
  const MenuWrapper = props => {
    return (
      <>
        <Header />

        <div className="menu__content">
          <WrappedComponent {...props} />
        </div>
      </>
    )
  }

  return MenuWrapper
}

export default withMenu;