import { useState } from 'react';
import '../Assests/css/dashboard.css';
import AdminHome from './AdminHome';
import AdminCourses from './AdminCourses';
import AdminFeesStructure from './AdminFeesStructure';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';


function AdminCombine() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [activeItem, setActiveItem] = useState('Dashboard');

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className={`combinelay ${openSidebarToggle ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className='grid-container'>
        <AdminSidebar
          openSidebarToggle={openSidebarToggle} 
          OpenSidebar={OpenSidebar} 
          setActiveItem={setActiveItem} 
        />
        <div className='main-content'>
          <AdminHeader  OpenSidebar={OpenSidebar} openSidebarToggle={openSidebarToggle} />
          {activeItem === 'Dashboard' && <AdminHome/>}
          {activeItem === 'Courses' && <AdminCourses />}
          {activeItem === 'Fees Structure' && <AdminFeesStructure />}
          {activeItem !== 'Dashboard' && <div></div>}
        </div>
      </div>
    </div>
  );
}

export default AdminCombine;
