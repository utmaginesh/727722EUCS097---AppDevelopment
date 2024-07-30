import {React,useState, useEffect} from 'react'
import '../Assests/css/dashboard.css';
const Courses = () => {


    const calculateRange = (data, rowsPerPage) => {
        const range = [];
        const num = Math.ceil(data.length / rowsPerPage);
        for (let i = 1; i <= num; i++) {
            range.push(i);
        }
        return range;
    }
  
    const sliceData = (data, page, rowsPerPage) => {
        return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    }
    const odd_sem = [
        {
            code: "#1236",
            name: "Data Structures and Algorithms",
            credits: "4",
            contacthrs: "15",
            marks: "50/50"
        },
        {
            code: "#1232",
            name: "C++ Programming",
            credits: "4",
            contacthrs: "8",
            marks: "50/50"
        },
        {
            code: "#1229",
            name: "Advanced Java Programming",
            credits: "5",
            contacthrs: "12",
            marks: "50/50"
        },
        {
            code: "#1230",
            name: "React Programming",
            credits: "4",
            contacthrs: "10",
            marks: "50/50"
        },
        {
            code: "#1220",
            name: "Cloud Computing",
            credits: "3",
            contacthrs: "7",
            marks: "50/50"
        },
        {
            code: "#1217",
            name: "Database Management System",
            credits: "3",
            contacthrs: "8",
            marks: "50/50"
        }
    ]
      const even_sem = [
        {
            code: "#1136",
            name: "Application Development",
            credits: "5",
            contacthrs: "10",
            marks: "50/50"
        },
        {
            code: "#1146",
            name: "Design and Analysis of Algorithms",
            credits: "3",
            contacthrs: "14",
            marks: "50/50"
        },
        {
            code: "#1046",
            name: "Spring Boot Programming",
            credits: "4",
            contacthrs: "16",
            marks: "50/50"
        },
        {
            code: "#2156",
            name: "Theory of Computation",
            credits: "3",
            contacthrs: "5",
            marks: "60/40"
        },
        {
            code: "#2154",
            name: "Computer Applications",
            credits: "3",
            contacthrs: "6",
            marks: "60/40"
        },
        {
            code: "#2155",
            name: "Operating Systems",
            credits: "3",
            contacthrs: "6",
            marks: "60/40"
        }
    ]
      const [orders, setOrders] = useState(odd_sem);
      const [evsem, setevsem] = useState(even_sem);
      const [oddpage, setoddPage] = useState(1);
      const [evnpage, setevnPage] = useState(1);
      const [oddpagination, setoddPagination] = useState([]);
      const [evnpagination, setevnPagination] = useState([]);
  
      useEffect(() => {
          setoddPagination(calculateRange(odd_sem, 5));
          setOrders(sliceData(odd_sem, oddpage, 5))
          setevnPagination(calculateRange(even_sem,5));
          setevsem(sliceData(even_sem,evnpage, 5 ));
      }, []);



    const __handleChangePage = (new_page) => {
        setoddPage(new_page);
        setOrders(sliceData(odd_sem, new_page, 5));
    }
    const __handleevenChangePage = (new_page) => {
        setevnPage(new_page);
        setevsem(sliceData(odd_sem, new_page, 5));
    }

  return (
        <div  className='courseenrolled'>
            <div className='dashboard-content-header'>
                <h2>Courses Enrolled:</h2><br></br><br></br><br></br><br></br>
            </div>
        <div className='dashboard-content'>
            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Odd Semester</h2>
                </div>
                <table className='listtable'>
                    <thead>
                        <th>Course Code</th>
                        <th>Course Name</th>
                        <th>Total Credits</th>
                        <th>Contact hrs</th>
                        <th>Ext/Int</th>
                    </thead>

                    {orders.length !== 0 ?
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td><span>{order.code}</span></td>
                                    <td><span>{order.name}</span></td>
                                    <td><span>{order.credits}</span></td>
                                    <td><span>{order.contacthrs}</span></td>
                                    <td><span>{order.marks}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    : null}
                </table>
                {orders.length !== 0 ?
                    <div className='dashboard-content-footer'>
                        {oddpagination.map((item, index) => (
                            <span 
                                key={index} 
                                className={item === oddpage ? 'active-pagination' : 'pagination'}
                                onClick={() => __handleChangePage(item)}>
                                    {item}
                            </span>
                        ))}
                    </div>
                : 
                <div className='dashboard-content-footer'>
                        <span className='empty-table'>No data</span>
                    </div>
                }
            </div>
            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Even Semester</h2>
                </div>
                <table className='listtable'>
                    <thead>
                        <th>Course Code</th>
                        <th>Course Name</th>
                        <th>Total Credits</th>
                        <th>Contact hrs</th>
                        <th>Ext/Int</th>
                    </thead>

                    {evsem.length !== 0 ?
                        <tbody>
                            {evsem.map((order, index) => (
                                <tr key={index}>
                                    <td><span>{order.code}</span></td>
                                    <td><span>{order.name}</span></td>
                                    <td><span>{order.credits}</span></td>
                                    <td><span>{order.contacthrs}</span></td>
                                    <td><span>{order.marks}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    : null}
                </table>
                {evsem.length !== 0 ?
                    <div className='dashboard-content-footer'>
                        {evnpagination.map((item, index) => (
                            <span 
                                key={index} 
                                className={item === evnpage ? 'active-pagination' : 'pagination'}
                                onClick={() => __handleevenChangePage(item)}>
                                    {item}
                            </span>
                        ))}
                    </div>
                : 
                <div className='dashboard-content-footer'>
                        <span className='empty-table'>No data</span>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default Courses
