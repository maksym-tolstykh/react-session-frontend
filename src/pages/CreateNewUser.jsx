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
        if (user)
            dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/");
        }
        if (user?.role !== "admin") {
            navigate("/");
        }
    }, [isError, navigate, user])
    return (
        <>
            {user?.role === "admin" && <CreateNewUserComponent />}
        </>
    )
}
