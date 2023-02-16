import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UsersComponent from '../components/UsersComponent';

import { getMe } from '../redux/slices/authSlices';

export default function Users() {
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

    // useEffect(() => {
    //     if (isError) {
    //         navigate("/");
    //     }
    //     if (user?.role !== "admin") {
    //         navigate("/");
    //     }
    // }, [isError, navigate, user])
    return (
        <>
            {user?.role === "admin" && <UsersComponent />}
        </>

    )
}
