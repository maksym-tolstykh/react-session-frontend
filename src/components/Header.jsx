import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';



import { LogOut, reset } from '../redux/slices/authSlices';

export default function Header() {
    const { user } = useSelector((state => state.auth));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(LogOut());
        dispatch(reset());
        navigate("/login")
    }
    return (
        <AppBar position="relative">
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Box>
                    <NavLink to="/"><Button variant="contained" sx={{ marginRight: "15px" }}>Головна</Button></NavLink>
                    {user?.role === "admin" && <NavLink to="/users"><Button sx={{ marginRight: "15px" }} variant="contained">Список коритувачів</Button></NavLink>}
                    {user?.role === "admin" && <NavLink to="/newuser"><Button variant="contained">Додати нового користувача</Button></NavLink>}
                </Box>
                <Box sx={{ display: "flex" }}>
                    <Typography variant="h6" color="inherit" noWrap>
                        {user?.email}
                    </Typography>
                    {user && <Button sx={{ marginLeft: "15px" }} onClick={logout} variant="contained">Вийти</Button>}
                </Box>
            </Toolbar>

        </AppBar>
    )
}
