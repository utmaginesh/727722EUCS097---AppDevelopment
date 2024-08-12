import {React,useState, useEffect} from 'react'
import '../Assests/css/dashboard.css';
import { BsPencil ,BsSave} from 'react-icons/bs';
import { Button } from '@mui/material';

const AdminFeesStructure = () => {


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
    const clg_fees = [
        {
            department: "Computer Science and Engineering",
            tution: "60,000/-",
            special_course: "90,000/-",
            total: "1,50,000/-",
        },
        {
            department: "Information Technology",
            tution: "60,000/-",
            special_course: "90,000/-",
            total: "1,50,000/-",
        },
        {
            department: "Electronics and Communication Engineering",
            tution: "50,000/-",
            special_course: "80,000/-",
            total: "1,30,000/-",
        },
        {
            department: "Mechanical Engineering",
            tution: "50,000/-",
            special_course: "75,000/-",
            total: "1,25,000/-",
        },
        {
            department: "Electrical and Electronics Engineering",
            tution: "50,000/-",
            special_course: "80,000/-",
            total: "1,30,000/-",
        },
        {
            department: "Civil Engineering",
            tution: "50,000/-",
            special_course: "50,000/-",
            total: "1,00,000/-",
        }
    ]
      const hostel_fees = [
        {
            block: "A-Block",
            h_fees: "60,000/-",
            mess_fees: "75,000/-",
            total: "1,35,000/-",
        },
        {
            block: "B-Block",
            h_fees: "60,000/-",
            mess_fees: "75,000/-",
            total: "1,35,000/-",
        },
        {
            block: "C-Block",
            h_fees: "55,000/-",
            mess_fees: "75,000/-",
            total: "1,30,000/-",
        },
        {
            block: "D/E-Block",
            h_fees: "60,000/-",
            mess_fees: "75,000/-",
            total: "1,35,000/-",
        },
        {
            block: "F/G-Block",
            h_fees: "80,000/-",
            mess_fees: "75,000/-",
            total: "1,55,000/-",
        },
  
    ]
    const [orders, setOrders] = useState(clg_fees);
    const [hostel, setHostel] = useState(hostel_fees);
    const [page, setPage] = useState(1);
    const [hostelpage, sethostelPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    const [hostelpagination, sethostelPagination] = useState([]);

    const [editingOrderIndex, setEditingOrderIndex] = useState(null);
    const [editingHostelIndex, setEditingHostelIndex] = useState(null);
    const [editedOrders, setEditedOrders] = useState([]);
    const [editedHostel, setEditedHostel] = useState([]);

    useEffect(() => {
        setEditedOrders(orders);
    }, [orders]);

    useEffect(() => {
        setEditedHostel(hostel);
    }, [hostel]);


  
      useEffect(() => {
          setPagination(calculateRange(clg_fees, 5));
          setOrders(sliceData(clg_fees, page, 5));
          sethostelPagination(calculateRange(hostel_fees, 5));
          setHostel(sliceData(hostel_fees,hostelpage, 5));
      }, []);



    const __handleChangePage = (new_page) => {
        setPage(new_page);
        setOrders(sliceData(clg_fees, new_page, 5));
    }

    const __handlehostelChangePage = (new_page) => {
        sethostelPage(new_page);
        setHostel(sliceData(hostel_fees, new_page, 5));
    }

    const handleEditClick = (index) => {
        setEditingOrderIndex(index);
    }

    const handleHostelEditClick = (index) => {
        setEditingHostelIndex(index);
    }
    const handleChange = (e, index, type) => {
        const { name, value } = e.target;
        const newData = [...(type === 'college' ? editedOrders : editedHostel)];
        newData[index][name] = value;
        type === 'college' ? setEditedOrders(newData) : setEditedHostel(newData);
    }

    const handleSaveClick = (index, type) => {
        if (type === 'college') {
            const updatedOrders = [...orders];
            updatedOrders[index] = editedOrders[index];
            setOrders(updatedOrders);
            setEditingOrderIndex(null);
        } else {
            const updatedHostel = [...hostel];
            updatedHostel[index] = editedHostel[index];
            setHostel(updatedHostel);
            setEditingHostelIndex(null);
        }
    }

    const handleUpdateAll = () => {
        setOrders(editedOrders); 
        setHostel(editedHostel); 
    }



  return (
        <div  className='courseenrolled'>
            <div className='dashboard-content-header'>
                <h2>Fees Structure:</h2><br></br><br></br><br></br><br></br>
            </div>
        <div className='dashboard-content'>
            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>College Fees</h2>
                </div>
                <table className='listtable'>
                    <thead>
                        <th>Department</th>
                        <th>Tution Fees</th>
                        <th>Special Course Fees</th>
                        <th>Total Fees</th>
                    </thead>

                    {orders.length !== 0 ?
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td><span>{order.department}</span></td>
                                    <td>
                                        {editingOrderIndex === index ? (
                                            <input
                                                type="text"
                                                name="tution"
                                                value={editedOrders[index].tution}
                                                onChange={(e) => handleChange(e, index, 'college')}
                                            />
                                        ) : (
                                            <span>{order.tution}</span>
                                        )}
                                    </td>
                                    <td>
                                        {editingOrderIndex === index ? (
                                            <input
                                                type="text"
                                                name="special_course"
                                                value={editedOrders[index].special_course}
                                                onChange={(e) => handleChange(e, index, 'college')}
                                            />
                                        ) : (
                                            <span>{order.special_course}</span>
                                        )}
                                    </td>
                                    <td>
                                        {editingOrderIndex === index ? (
                                            <input
                                                type="text"
                                                name="total"
                                                value={editedOrders[index].total}
                                                onChange={(e) => handleChange(e, index, 'college')}
                                            />
                                        ) : (
                                            <span>{order.total}</span>
                                        )}
                                    </td>
                                    <td>
                                        {editingOrderIndex === index ? (
                                            <BsSave
                                                style={{ cursor: "pointer", fontSize: "22px" }}
                                                onClick={() => handleSaveClick(index, 'college')}
                                            />
                                        ) : (
                                            <BsPencil
                                                style={{ cursor: "pointer", fontSize: "22px" }}
                                                onClick={() => handleEditClick(index)}
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    : null}
                </table>
                {orders.length !== 0 ?
                    <div className='dashboard-content-footer'>
                        {pagination.map((item, index) => (
                            <span 
                                key={index} 
                                className={item === page ? 'active-pagination' : 'pagination'}
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
                        <th>Block</th>
                        <th>Hostel Fees</th>
                        <th>Mess Fees</th>
                        <th>Total</th>
                    </thead>

                    {hostel.length !== 0 ?
                        <tbody>
                            {hostel.map((order, index) => (
                                <tr key={index}>
                                    <td><span>{order.block}</span></td>
                                    <td>
                                        {editingHostelIndex === index ? (
                                            <input
                                                type="text"
                                                name="h_fees"
                                                value={editedHostel[index].h_fees}
                                                onChange={(e) => handleChange(e, index, 'hostel')}
                                            />
                                        ) : (
                                            <span>{order.h_fees}</span>
                                        )}
                                    </td>
                                    <td>
                                        {editingHostelIndex === index ? (
                                            <input
                                                type="text"
                                                name="mess_fees"
                                                value={editedHostel[index].mess_fees}
                                                onChange={(e) => handleChange(e, index, 'hostel')}
                                            />
                                        ) : (
                                            <span>{order.mess_fees}</span>
                                        )}
                                    </td>
                                    <td>
                                        {editingHostelIndex === index ? (
                                            <input
                                                type="text"
                                                name="total"
                                                value={editedHostel[index].total}
                                                onChange={(e) => handleChange(e, index, 'hostel')}
                                            />
                                        ) : (
                                            <span>{order.total}</span>
                                        )}
                                    </td>
                                    <td>
                                        {editingHostelIndex === index ? (
                                            <BsSave
                                                style={{ cursor: "pointer", fontSize: "22px" }}
                                                onClick={() => handleSaveClick(index, 'hostel')}
                                            />
                                        ) : (
                                            <BsPencil
                                                style={{ cursor: "pointer", fontSize: "22px" }}
                                                onClick={() => handleHostelEditClick(index)}
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    : null}
                </table>
                {hostel.length !== 0 ?
                    <div className='dashboard-content-footer'>
                        {hostelpagination.map((item, index) => (
                            <span 
                                key={index} 
                                className={item === hostelpage ? 'active-pagination' : 'pagination'}
                                onClick={() => __handlehostelChangePage(item)}>
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
        <div>
            <Button type='submit' variant="contained" sx={{ backgroundColor: 'green' }} color='secondary'>Update</Button>
        </div>
    </div>
  )
}

export default AdminFeesStructure;
