import { useState, useContext, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import '../Assests/css/dashboard.css';
import InquirySubmission from './InquirySubmission';
import Courses from './Courses';
import FeesStructure from './FeesStruture';
import ProfilePage from './ProfilePage';
import { UserContext } from '../../../UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StudentChat from './StudentChat';

function Combine() {
  const { auth, setIsProfUpdated, user, setDepartment, setYear} = useContext(UserContext);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [profile, setProfile] = useState({
    name: '',
    rollno: '',
    department: '',
    email: '',
    phone: '',
    year: '',
    rtype: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return; 

      try {
        const updateResponse = await axios.get(`http://localhost:8080/api/user/getisUpdate/${user}`);
        if (updateResponse.data) {
          setIsProfUpdated("true");
        } else {
          setIsProfUpdated("false");
        }
      } catch (updateError) {
        console.error('Error fetching update Profile:', updateError);
      }

      try {
        const profileResponse = await axios.get(`http://localhost:8080/api/user/profiles/${user}`);
        setProfile(profileResponse.data);
        setDepartment(profileResponse.data.department);
        setYear(profileResponse.data.year);
      } catch (profileError) {
        console.error('Error fetching profile:', profileError);
      }
    };

    fetchData();
  }, [user, setIsProfUpdated, setDepartment, setYear]);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className={`combinelay ${openSidebarToggle ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className='grid-container'>
        <Sidebar 
          openSidebarToggle={openSidebarToggle} 
          setActiveItem={setActiveItem} 
          activeItem={activeItem} 
        />
        <div className='main-content'>
          <Header OpenSidebar={OpenSidebar} openSidebarToggle={openSidebarToggle} />
          {activeItem === 'Dashboard' && <Home />}
          {/* {activeItem === 'Dashboard' && <StudentChat />} */}
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
