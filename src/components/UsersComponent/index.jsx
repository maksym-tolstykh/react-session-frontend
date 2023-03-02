import { useEffect, useState } from 'react';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from 'axios';
import { api, deleteUserData } from '../../redux/slices/authSlices';
import PopUpEditUser from './PopUpEditUser';
import PopUpDeleteItem from './DeleteItemModal';



const columns = [
    { id: 'uuid', label: 'ID', minWidth: 170 },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'lastName', label: 'Last Name', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'role', label: 'Role', minWidth: 100 },
    { id: 'er', label: '', minWidth: 100 },


];

export default function UsersComponent() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [usersData, setUsersData] = useState([]);

    const [openModalDel, setOpenModalDel] = useState(false); //for "accept modal"
    const [openModalEdit, setOpenModalEdit] = useState(false); //for "edit modal"

    const [idUser, setIdUser] = useState("");
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {

        getData();
    }, [])

    const getData = async () => {
        const data = await axios.get(api + "/users");
        setUsersData(data.data);

    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    /*Functions "open" for modals */
    /*Delete Modal */
    const handleCloseModalDel = () => setOpenModalDel(false);
    const handleOpenModalDel = (id) => {
        setOpenModalDel(true);
        setIdUser(id);
    };
    /*Edit Modal */
    const handleCloseModalEdit = () => setOpenModalEdit(false);
    const handleOpenModalEdit = (user) => {
        setOpenModalEdit(true);
        setCurrentUser(user);
    };


    const deleteUser = async () => {
        try {
            await deleteUserData(idUser);
            setIdUser(null);
            handleCloseModalDel();
            setUsersData(usersData.filter((a) => a.uuid !== idUser));
            console.log("delete");
            //alert("Користувача видалено");
        } catch (error) {
            console.log(error);
            //alert("Сталася помилка");
        }


    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ height: "calc(100vh - 118px)" }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell
                                    key={index}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usersData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((item, index) => {
                                console.log(item.uuid);
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        <TableCell>{item.uuid} </TableCell>
                                        <TableCell>{item.name} </TableCell>
                                        <TableCell>{item.lastName} </TableCell>
                                        <TableCell>{item.email} </TableCell>
                                        <TableCell>{item.role} </TableCell>
                                        <TableCell
                                            sx={{
                                                padding: { xs: "4px", sm: "10px" },
                                                width: { xs: "42px", sm: "auto" },
                                            }}
                                            align="right"
                                        >
                                            <IconButton onClick={() => handleOpenModalEdit(item)}>
                                                <EditIcon sx={{ color: "#0d6efd" }} />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleOpenModalDel(item.uuid)}
                                                sx={{ marginLeft: { xs: "0px", sm: "8px" } }}
                                            >
                                                <DeleteForeverIcon sx={{ color: "#dc3545" }} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={usersData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {/*PopUp Edit user */}
            <PopUpEditUser
                usersData={usersData}
                openModal={openModalEdit}
                handleClose={handleCloseModalEdit}
                currentUser={currentUser}
                getAllUsers={getData}
            />
            {/*END PopUp Edit user */}
            <PopUpDeleteItem
                title={"Ви дійсно бажаєте видалити користувача?"}
                firstButtonTitle={"Помилувати"}
                secondButtonTitle={"Видалити"}
                openModal={openModalDel}
                handleClose={handleCloseModalDel}
                deleteItemFunc={deleteUser}
            />
            {/*END PupUp delete user */}
        </Paper>
    )
}
