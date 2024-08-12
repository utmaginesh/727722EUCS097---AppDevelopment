import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import '../Assests/css/profilepage.css';

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState({
        name: false,
        rollno: false,
        department: false,
        phone: false,
    });

    const [profile, setProfile] = useState({
        name: '',
        rollno: '',
        department: '',
        email: '727722eucs097@skcet.ac.in',
        phone: '',
    });

    const handleEdit = (field) => {
        setIsEditing({ ...isEditing, [field]: true });
    };

    const handleSave = (field) => {
        setIsEditing({ ...isEditing, [field]: false });
    };

    const handleChange = (field, value) => {
        setProfile({ ...profile, [field]: value });
    };

    const handleUpdate = () => {
        Object.keys(isEditing).forEach(field => {
            setIsEditing(prevState => ({ ...prevState, [field]: false }));
        });
        console.log('Updated profile:', profile);
    };

    return (
        <div className="profilepage-container">
            <div className="profilepage-header-container">
                <p className="profilepage-header"><b>Details:</b></p>
            </div>
            <div className="profileform-container">
                <form className='profile-form'>
                    <div className='profile-item-con'>
                        <div className='profileform-group'>
                            <label className='profilelabel'><b>Name*</b></label>
                            {isEditing.name ? (
                                <>
                                    <TextField
                                        required
                                        className="profileinput"
                                        value={profile.name}
                                        size='small'
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        InputProps={{
                                            className: 'profile-textfield-input',
                                        }}
                                    />
                                    <SaveIcon className="profile-save-icon" onClick={() => handleSave('name')} />
                                </>
                            ) : (
                                <>
                                    <p className="profilevalue">{profile.name}</p>
                                    <EditIcon className="profile-edit-icon" onClick={() => handleEdit('name')} />
                                </>
                            )}
                        </div>

                        <div className='profileform-group'>
                            <label className='profilelabel'><b>Roll No*</b></label>
                            {isEditing.rollno ? (
                                <>
                                    <TextField
                                        required
                                        className="profileinput"
                                        value={profile.rollno}
                                        size='small'
                                        onChange={(e) => handleChange('rollno', e.target.value)}
                                        InputProps={{
                                            className: 'profile-textfield-input',
                                        }}
                                    />
                                    <SaveIcon className="profile-save-icon" onClick={() => handleSave('rollno')} />
                                </>
                            ) : (
                                <>
                                    <p className="profilevalue">{profile.rollno}</p>
                                    <EditIcon className="profile-edit-icon" onClick={() => handleEdit('rollno')} />
                                </>
                            )}
                        </div>

                        <div className='profileform-group'>
                            <label className='profilelabel'><b>Department*</b></label>
                            {isEditing.department ? (
                                <>
                                    <FormControl className="profileinput" size="small" variant="outlined">
                                        <InputLabel shrink>Department</InputLabel>
                                        <Select
                                            value={profile.department}
                                            onChange={(e) => handleChange('department', e.target.value)}
                                            required
                                            label="Department"
                                        >
                                            <MenuItem value="">Select Department</MenuItem>
                                            <MenuItem value="Computer Science">Computer Science</MenuItem>
                                            <MenuItem value="Mathematics">Mathematics</MenuItem>
                                            <MenuItem value="Physics">Physics</MenuItem>
                                            <MenuItem value="Chemistry">Chemistry</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <SaveIcon className="profile-save-icon" onClick={() => handleSave('department')} />
                                </>
                            ) : (
                                <>
                                    <p className="profilevalue">{profile.department}</p>
                                    <EditIcon className="profile-edit-icon" onClick={() => handleEdit('department')} />
                                </>
                            )}
                        </div>

                        <div className='profileform-group'>
                            <label className='profilelabel'><b>Email*</b></label>
                            <p className="profilevalueemail">{profile.email}</p>  
                        </div>

                        <div className='profileform-group'>
                            <label className='profilelabel'><b>Phone*</b></label>
                            {isEditing.phone ? (
                                <>
                                    <TextField
                                        required
                                        className="profileinput"
                                        value={profile.phone}
                                        size='small'
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                        inputProps={{ maxLength: 10, pattern: "[0-9]*" }}
                                        InputProps={{
                                            className: 'profile-textfield-input',
                                        }}
                                    />
                                    <SaveIcon className="profile-save-icon" onClick={() => handleSave('phone')} />
                                </>
                            ) : (
                                <>
                                    <p className="profilevalue">{profile.phone}</p>
                                    <EditIcon className="profile-edit-icon" onClick={() => handleEdit('phone')} />
                                </>
                            )}
                        </div>
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpdate}
                        className="profile-update-button"
                    >
                        Update
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;
