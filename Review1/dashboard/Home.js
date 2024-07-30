import React, { useEffect, useState } from 'react';
import {BsEye} from 'react-icons/bs'
import CancelIcon from '../Assests/img/cancel.svg';
import DoneIcon from '../Assests/img/done.svg';
import RefundedIcon from '../Assests/img/refunded.svg';

function Home() {

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
  const all_orders = [
    {
        id: "#1236",
        date: "1 Nov, 10:20 AM",
        email: "michael.lawson@reqres.in",
        first_name: "Michael",
        last_name: "Lawson",
        product: "Admission",
        price: "Computer Science",
        status: "Responded"
    },
    {
        id: "#1235",
        date: "1 Nov, 10:20 AM",
        email: "lindsay.ferguson@reqres.in",
        first_name: "Lindsay",
        last_name: "Ferguson",
        product: "Fees",
        price: "Information Technology",
        status: "Not Responded"
    },
    {
        id: "#1234",
        date: "1 Nov, 10:20 AM",
        email: "tobias.funke@reqres.in",
        first_name: "Tobias",
        last_name: "Funke",
        product: "Courses",
        price: "AIDS",
        status: "Responded"
    },
    {
        id: "#1233",
        date: "1 Nov, 10:20 AM",
        email: "byron.fields@reqres.in",
        first_name: "Byron",
        last_name: "Fields",
        product: "Courses",
        price: "Cyber Security",
        status: "Received"
    },
    {
        id: "#1232",
        date: "1 Nov, 10:20 AM",
        email: "george.edwards@reqres.in",
        first_name: "George",
        last_name: "Edwards",
        product: "Admission",
        price: "Computer Science",
        status: "Not Responded"
    },
    {
        id: "#1231",
        date: "1 Nov, 10:20 AM",
        email: "rachel.howell@reqres.in",
        first_name: "Rachel",
        last_name: "Howell",
        product: "Fees",
        price: "Computer Science",
        status: "Responded"
    },
    {
        id: "#1236",
        date: "1 Nov, 10:20 AM",
        email: "michael.lawson@reqres.in",
        first_name: "Michael",
        last_name: "Lawson",
        product: "Admission",
        price: "Cyber Security",
        status: "Responded"
    },
    {
        id: "#1235",
        date: "1 Nov, 10:20 AM",
        email: "lindsay.ferguson@reqres.in",
        first_name: "Lindsay",
        last_name: "Ferguson",
        product: "Fees",
        price: "AIDS",
        status: "Not Responded"
    },
    {
        id: "#1234",
        date: "1 Nov, 10:20 AM",
        email: "tobias.funke@reqres.in",
        first_name: "Tobias",
        last_name: "Funke",
        product: "Courses",
        price: "Information Technology",
        status: "Responded"
    },
    {
        id: "#1233",
        date: "1 Nov, 10:20 AM",
        email: "byron.fields@reqres.in",
        first_name: "Byron",
        last_name: "Fields",
        product: "Admission",
        price: "Information Technology",
        status: "Received"
    },
    {
        id: "#1232",
        date: "1 Nov, 10:20 AM",
        email: "george.edwards@reqres.in",
        first_name: "George",
        last_name: "Edwards",
        product: "Admission",
        price: "Computer Science",
        status: "Not Responded"
    },
    {
        id: "#1231",
        date: "1 Nov, 10:20 AM",
        email: "rachel.howell@reqres.in",
        first_name: "Rachel",
        last_name: "Howell",
        product: "Courses",
        price: "Cyber Security",
        status: "Responded"
    }
]
    const [search, setSearch] = useState('');
    const [orders, setOrders] = useState(all_orders);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);

    useEffect(() => {
        setPagination(calculateRange(all_orders, 5));
        setOrders(sliceData(all_orders, page, 5));
    }, []);

    // Search
    const __handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value !== '') {
            let search_results = orders.filter((item) =>
                item.first_name.toLowerCase().includes(search.toLowerCase()) ||
                item.last_name.toLowerCase().includes(search.toLowerCase()) ||
                item.product.toLowerCase().includes(search.toLowerCase())
            );
            setOrders(search_results);
        }
        else {
            __handleChangePage(1);
        }
    };

    const __handleChangePage = (new_page) => {
        setPage(new_page);
        setOrders(sliceData(all_orders, new_page, 5));
    }


    return (
      <main className='main-container'>
          <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                <h3>Total Inquiries</h3>
                <i className='bx bx-message-square-detail card_icon'></i>
                </div>
                <h1>300</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                <h3>Total Responded</h3>
                <i className='bx bx-check-circle card_icon'></i>
                </div>
                <h1>12</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                <h3>Total Not Responded</h3>
                <i className='bx bx-time-five card_icon'></i>
                </div>
                <h1>33</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                <h3>ALERTS</h3>
                <i className='bx bx-bell card_icon'></i>
                </div>
                <h1>42</h1>
            </div>
        </div>
          <div className='dashboard-content'>

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Inquiry List</h2>
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            value={search}
                            placeholder='Search..'
                            className='dashboard-content-input'
                            onChange={e => __handleSearch(e)} />
                    </div>
                </div>

                <table className='listtable'>
                    <thead>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>STATUS</th>
                        <th>STUDENT</th>
                        <th>SUBJECT</th>
                        <th>DEPARTMENT</th>
                    </thead>

                    {orders.length !== 0 ?
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td><span>{order.id}</span></td>
                                    <td><span>{order.date}</span></td>
                                    <td>
                                        <div>
                                            {order.status === 'Responded' ?
                                                <img
                                                    src={DoneIcon}
                                                    alt='paid-icon'
                                                    className='dashboard-content-icon' />
                                            : order.status === 'Not Responded' ?
                                                <img
                                                    src={CancelIcon}
                                                    alt='canceled-icon'
                                                    className='dashboard-content-icon' />
                                            : order.status === 'Received' ?
                                                <img
                                                    src={RefundedIcon}
                                                    alt='refunded-icon'
                                                    className='dashboard-content-icon' />
                                            : null}
                                            <span>{order.status}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>

                                            <span>{order.first_name} {order.last_name}</span>
                                        </div>
                                    </td>
                                    <td><span>{order.product}</span></td>
                                    <td><span>{order.price}</span></td>
                                    {order.status === 'Responded' &&
                                    <td><BsEye style={{cursor:"pointer",fontSize:"22px"}} /></td>}
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
        </div>

      </main>
  )
}

export default Home;