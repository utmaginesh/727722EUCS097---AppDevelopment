import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import '../Assests/css/dashboard.css';
import InquirySubmission from './InquirySubmission';
import Courses from './Courses';
import FeesStructure from './FeesStruture';
import ProfilePage from './ProfilePage';

function Combine() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [activeItem, setActiveItem] = useState('Dashboard');

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className={`combinelay ${openSidebarToggle ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className='grid-container'>
        <Sidebar 
          openSidebarToggle={openSidebarToggle} 
          OpenSidebar={OpenSidebar} 
          setActiveItem={setActiveItem} 
        />
        <div className='main-content'>
          <Header OpenSidebar={OpenSidebar} openSidebarToggle={openSidebarToggle} />
          {activeItem === 'Dashboard' && <Home />}
          {activeItem === 'Submit Inquiry' && <InquirySubmission />}
          {activeItem === 'Courses' && <Courses />}
          {activeItem === 'Fees Structure' && <FeesStructure />}
          {activeItem === 'Profile' && <ProfilePage />}
          {activeItem !== 'Dashboard' && <div></div>}
        </div>
      </div>
    </div>
  );
}

export default Combine;
