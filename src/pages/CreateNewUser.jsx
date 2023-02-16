import { useEffect } from 'react';
import CreateNewUserComponent from '../components/CreateNewUserComponent'

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getMe } from '../redux/slices/authSlices';

export default function CreateNewUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isError } = useSelector((state => state.auth));
    console.log(user?.role);
    useEffect(() => {
        if (!user) {
            dispatch(getMe());
        }
        else if (isError) {
            navigate("/");
        }
        else if (user?.role !== "admin") {
            navigate("/");
        }

    }, [dispatch, isError, navigate]);


    return (
        <>
            {user?.role === "admin" && <CreateNewUserComponent />}
        </>
    )
}
