import { React, useState, useEffect } from 'react';
import '../Assests/css/dashboard.css';
import { BsPencil, BsSave } from 'react-icons/bs';
import { Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';

const AdminCourses = () => {
    const [selectedYear, setSelectedYear] = useState('first');
    const [selectedDepartment, setSelectedDepartment] = useState('Computer Science');
    
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


    const [orders, setOrders] = useState([]);
    const [evsem, setEvsem] = useState([]);
    const [oddpage, setOddPage] = useState(1);
    const [evnpage, setEvnPage] = useState(1);
    const [oddpagination, setOddPagination] = useState([]);
    const [evnpagination, setEvnPagination] = useState([]);

    const [editingOrderIndex, setEditingOrderIndex] = useState(null);
    const [editingEvsemIndex, setEditingEvsemIndex] = useState(null);

    const [editedOrders, setEditedOrders] = useState([]);
    const [editedEvsem, setEditedEvsem] = useState([]);

    useEffect(() => {
        setEditedOrders(orders);
    }, [orders]);

    useEffect(() => {
        setEditedEvsem(evsem);
    }, [evsem]);

    const handleEditClick = (index) => {
        setEditingOrderIndex(index);
    }

    const handleEvsemEditClick = (index) => {
        setEditingEvsemIndex(index);
    }

    const handleChange = (e, index, type) => {
        const { name, value } = e.target;
        const newData = [...(type === 'odd' ? editedOrders : editedEvsem)];
        newData[index][name] = value;
        type === 'odd' ? setEditedOrders(newData) : setEditedEvsem(newData);
    }

    const handleSaveClick = async (index, type) => {
        if (type === 'odd') {
            const updatedOrders = [...orders];
            updatedOrders[index] = editedOrders[index];
            setOrders(updatedOrders);
            setEditingOrderIndex(null);
            try {
                console.log(orders);
                const response = await axios.put(`http://localhost:8080/api/updatecourse/${orders[index].id}`, {
                    code: orders[index].code,
                    name: orders[index].name,
                    credits: orders[index].credits,
                    contactHrs: orders[index].contactHrs,
                });
                console.log('Update successful:', response.data);
                alert("Updated Successfully!");
            }catch (error) {
              console.error('Error updating orders:', error);
            }
            
        } else {
            const updatedEvsem = [...evsem];
            updatedEvsem[index] = editedEvsem[index];
            setEvsem(updatedEvsem);
            setEditingEvsemIndex(null);
            try {
                console.log(orders);
                const response = await axios.put(`http://localhost:8080/api/updatecourse/${evsem[index].id}`, {
                    code: evsem[index].code,
                    name: evsem[index].name,
                    credits: evsem[index].credits,
                    contactHrs: evsem[index].contactHrs,
                });
                console.log('Update successful:', response.data);
                alert("Updated Successfully!");
            }catch (error) {
              console.error('Error updating orders:', error);
            }
        }
    }


    useEffect(() => {
        // Fetch odd semester courses
        axios.get(`http://localhost:8080/api/getoddsem/${selectedYear}/${selectedDepartment}`)
        .then(response => {
            setOrders(response.data);
            setOddPagination(calculateRange(response.data, 6));
        })
        .catch(error => {
            console.error('Error fetching odd semester courses:', error);
        });

        // Fetch even semester courses
        axios.get(`http://localhost:8080/api/getevensem/${selectedYear}/${selectedDepartment}`)
        .then(response => {
            setEvsem(response.data);
            setEvnPagination(calculateRange(response.data, 6));
        })
        .catch(error => {
            console.error('Error fetching even semester courses:', error);
        });
    }, [selectedYear, selectedDepartment]);


    const __handleChangePage = (new_page) => {
        setOddPage(new_page);
    }

    const __handleEvenChangePage = (new_page) => {
        setEvnPage(new_page);
    }

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    }

    const handleDepartmentChange = (event) => {
        setSelectedDepartment(event.target.value);
    }
    // const handleOddUpdate = async () => {
    //     try {
    //         console.log(orders);
    //       const response = await axios.put(`http://localhost:8080/api/updateoddcourse/${selectedYear}/${selectedDepartment}`, orders);
    //       console.log('Update successful:', response.data);
    //       alert("Updated Successfully!");
    //       return;
    //     } catch (error) {
    //       console.error('Error updating orders:', error);
    //     }
    // };


    return (
        <div className='courseenrolled'>
            <div className='dashboard-content-header'>
                <h2>Courses Enrolled:</h2>
                <FormControl variant="outlined" style={{width: "18%", marginLeft: "42%",font: "italic small-caps bold 20px/1 cursive"}}>
                    <InputLabel id="select-year-label">Select Year</InputLabel>
                    <Select
                        value={selectedYear}
                        onChange={handleYearChange}
                        label="Select Year"
                    >
                        <MenuItem value="first">First</MenuItem>
                        <MenuItem value="second">Second</MenuItem>
                        <MenuItem value="third">Third</MenuItem>
                        <MenuItem value="fourth">Fourth</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" style={{width: "18%", marginRight:'10px', font: "italic small-caps bold 20px/1 cursive"}}>
                    <InputLabel id="select-year-label">Select Department</InputLabel>
                    <Select
                        value={selectedDepartment}
                        onChange={handleDepartmentChange}
                        label="Select Department">
                        <MenuItem value="Computer Science">Computer Science</MenuItem>
                        <MenuItem value="Information Technology">Information Technology</MenuItem>
                        <MenuItem value="Mechanical Engineering">Mechanical Engineering</MenuItem>
                        <MenuItem value="Civil Engineering">Civil Engineering</MenuItem>
                        <MenuItem value="Electrical Engineering">Electrical Engineering</MenuItem>
                    </Select>
                </FormControl>
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
                            <th>Contact Hrs</th>
                        </thead>

                        {orders.length !== 0 ?
                            <tbody>
                                {sliceData(orders, oddpage, 6).map((order, index) => (
                                    <tr key={index}>
                                        <td>
                                            {editingOrderIndex === index ? (
                                                <input
                                                    type="text"
                                                    name="code"
                                                    value={editedOrders[index].code}
                                                    onChange={(e) => handleChange(e, index, 'odd')}
                                                />
                                            ) : (
                                                <span>{order.code}</span>
                                            )}
                                        </td>
                                        <td>
                                            {editingOrderIndex === index ? (
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={editedOrders[index].name}
                                                    onChange={(e) => handleChange(e, index, 'odd')}
                                                />
                                            ) : (
                                                <span>{order.name}</span>
                                            )}
                                        </td>
                                        <td>
                                            {editingOrderIndex === index ? (
                                                <input
                                                    type="text"
                                                    name="credits"
                                                    value={editedOrders[index].credits}
                                                    onChange={(e) => handleChange(e, index, 'odd')}
                                                />
                                            ) : (
                                                <span>{order.credits}</span>
                                            )}
                                        </td>
                                        <td>
                                            {editingOrderIndex === index ? (
                                                <input
                                                    type="text"
                                                    name="contactHrs"
                                                    value={editedOrders[index].contactHrs}
                                                    onChange={(e) => handleChange(e, index, 'odd')}
                                                />
                                            ) : (
                                                <span>{order.contactHrs}</span>
                                            )}
                                        </td>
                                        <td>
                                            {editingOrderIndex === index ? (
                                                <SaveIcon style={{ cursor: "pointer", fontSize: "24px" }} onClick={() => handleSaveClick(index, 'odd')} />
                                            ) : (
                                                <BsPencil
                                                    style={{ cursor: "pointer", fontSize: "20px" }}
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
                        </thead>

                        {evsem.length !== 0 ?
                            <tbody>
                                {sliceData(evsem, evnpage, 6).map((order, index) => (
                                    <tr key={index}>
                                        <td>
                                            {editingEvsemIndex === index ? (
                                                <input
                                                    type="text"
                                                    name="code"
                                                    value={editedEvsem[index].code}
                                                    onChange={(e) => handleChange(e, index, 'even')}
                                                />
                                            ) : (
                                                <span>{order.code}</span>
                                            )}
                                        </td>
                                        <td>
                                            {editingEvsemIndex === index ? (
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={editedEvsem[index].name}
                                                    onChange={(e) => handleChange(e, index, 'even')}
                                                />
                                            ) : (
                                                <span>{order.name}</span>
                                            )}
                                        </td>
                                        <td>
                                            {editingEvsemIndex === index ? (
                                                <input
                                                    type="text"
                                                    name="credits"
                                                    value={editedEvsem[index].credits}
                                                    onChange={(e) => handleChange(e, index, 'even')}
                                                />
                                            ) : (
                                                <span>{order.credits}</span>
                                            )}
                                        </td>
                                        <td>
                                            {editingEvsemIndex === index ? (
                                                <input
                                                    type="text"
                                                    name="contactHrs"
                                                    value={editedEvsem[index].contactHrs}
                                                    onChange={(e) => handleChange(e, index, 'even')}
                                                />
                                            ) : (
                                                <span>{order.contactHrs}</span>
                                            )}
                                        </td>
                                        <td>
                                            {editingEvsemIndex === index ? (
                                                <SaveIcon
                                                    style={{ cursor: "pointer", fontSize: "24px" }}
                                                    onClick={() => handleSaveClick(index, 'even')}
                                                />
                                            ) : (
                                                <BsPencil
                                                    style={{ cursor: "pointer", fontSize: "20px" }}
                                                    onClick={() => handleEvsemEditClick(index)}
                                                />
                                            )}
                                        </td>
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
                                    onClick={() => __handleEvenChangePage(item)}>
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
    );
}

export default AdminCourses;
