import React from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsJustify } from 'react-icons/bs';

function AdminHeader({ OpenSidebar, openSidebarToggle }) {
  return (
    <header className={`header-dash ${openSidebarToggle ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className='header-left'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-right'>
        <BsFillBellFill className='icon' />
        <BsFillEnvelopeFill className='icon' />
        <BsPersonCircle className='icon' />
      </div>
    </header>
  );
}

export default AdminHeader;
