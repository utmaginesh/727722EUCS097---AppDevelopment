import React, { useContext, useState } from 'react';
import '../Assests/css/inquirysub.css';
import { Button, TextField } from '@mui/material';
import 'boxicons/css/boxicons.min.css';
import axios from 'axios';
import { UserContext } from '../../../UserContext';

const InquirySubmission = () => {
    const {user} = useContext(UserContext);
    const [name, setname] = useState('');
    const [rollno, setrollno] = useState('');
    const [gender, setgender] = useState('');
    const [phone, setphone] = useState('');
    const [subject, setsubject] = useState('');
    const [department, setdepartment] = useState('');
    const [inquiry, setinquiry] = useState('');
    const [inquirytype, setinquirytype] = useState('');
    // const [fileupload, setfileupload] = useState();
    // const handleFile = (event) => {
    //     const file = event.target.files[0];
    //     setfileupload(file);
    // };
    const handlePhoneKeyDown = (e) => {
        const key = e.key;
        if (!/^\d$/.test(key) && key !== 'Backspace' && key !== 'ArrowLeft' && key !== 'ArrowRight') {
            e.preventDefault();
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/registerinquiry', {
                inquirycode: 'IN108', 
                name: name,
                rollno: rollno,
                gender: gender,
                phone: phone,
                subject: subject,
                department: department,
                inquirytype: inquirytype,
                inquiry: inquiry,
                studentEmail: user
            });
            console.log(response.data);
            alert("Submitted Successfully!");
            window.location.reload();
            // Handle success (e.g., display a success message, reset the form, etc.)
        } catch (error) {
            console.error('There was an error submitting the form!', error);
            // Handle error (e.g., display an error message)
        }
    };

    return (
        <div className="inquirysub-container">
            <div className="inquirysub-header-container">
                <p style={{ fontSize: '22px' }}><b>Inquiry Submission Form</b></p>
                <Button sx={{ backgroundColor: 'rgb(226, 62, 62)' }} variant="contained" color='secondary'>Back</Button>
            </div>
            <div className="inquiryform-container"  >
                <form className='inquiryform' onSubmit={handleSubmit}>
                    <fieldset className='inquiryfieldset'>
                        <legend><b>Personal and Communication Details:</b></legend>
                        <div className='inquiryform-group'>
                            <label className='inquirylabel'><b>Full Name*</b></label>
                            <TextField required className="inquiryinput1" value={name} type='text' size='small' onChange={(e) => { setname(e.target.value) }} />
                        </div>
                        <div className='inquiryform-group'>
                            <label className='inquirylabel'><b>Student ID*</b></label>
                            <TextField required className="inquiryinput1" value={rollno} type='text' size='small' onChange={(e) => { setrollno(e.target.value) }} />
                        </div>
                        <div className='inquiryform-group'>
                            <label className='inquirylabel'><b>Gender*</b></label>
                            <select id="gender" value={gender} onChange={(e) => { setgender(e.target.value) }} className="inquiryinput1" required>
                                <option value="" >Select one</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className='inquiryform-group'>
                            <label className='inquirylabel'><b>Department*</b></label>
                            <TextField required className="inquiryinput1" value={department} type='text' size='small' onChange={(e) => { setdepartment(e.target.value) }} />
                        </div>
                        <div className='inquiryform-group'>
                            <label className='inquirylabel'><b>Mobile Number*</b></label>
                            <TextField required className="inquiryinput1" value={phone} size='small' onKeyDown={handlePhoneKeyDown} inputProps={{ maxLength: 10 }}
                             onChange={(e) => { setphone(e.target.value) }} />
                        </div>
                    </fieldset>
                    <fieldset className='inquiryfieldset'>
                        <legend><b>Inquiry Details:</b></legend>
                        <div className="inquiryform-group">
                            <label className='inquirylabel'><b>Inquiry Type*</b></label>
                            <select className="inquiryinput1" required value={inquirytype} onChange={(e) => { setinquirytype(e.target.value) }}>
                                <option value="">Select one</option>
                                <option>Courses</option>
                                <option>Admission</option>
                                <option>Fees Payment/Structure</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="inquiryform-group">
                            <label className='inquirylabel'><b>Subject*</b></label>
                            <textarea
                                autoComplete="off"
                                className="inquiryinput1"
                                cols="50"
                                id="Remarks"
                                maxLength="100"
                                name="Remarks"
                                placeholder="Purpose of your Inquiry"
                                required
                                rows="3"
                                value={subject}
                                onChange={(e) => { setsubject(e.target.value) }}
                            ></textarea>
                        </div>
                        <div className="inquiryform-group">
                            <label className='inquirylabel'><b>Text of Grievance*</b></label>
                            <textarea
                                autoComplete="off"
                                className="inquiryinput1"
                                cols="50"
                                id="Remarks"
                                maxLength="2000"
                                name="Remarks"
                                placeholder="Please Enter Text of Grievance (Remarks)"
                                required
                                rows="5"
                                value={inquiry}
                                onChange={(e) => { setinquiry(e.target.value) }}
                            ></textarea>
                        </div>
                        {/* <div className="inquiryform-group">
                            <label className='inquirylabel'><b>Attach relevant/supporting documents (if any)</b></label>
                            <input style={{ marginTop: '12px', marginBottom: '26px', marginLeft: '18px' }} type='file' id='fileupload' onChange={handleFile} />
                        </div> */}
                    </fieldset>
                    <div className='inquirysbutton'>
                        <Button  variant="contained" sx={{ backgroundColor: 'green' }} color='secondary' type='submit' >Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InquirySubmission;
