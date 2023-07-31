import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import _ from "lodash";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Chip,
  Tooltip,
} from "@mui/material";
// components
import Iconify from "@/components/utils/iconify";
import UserListHead from "@/components/ui/UserListHead";
import UserListToolbar from "@/components/ui/UserListToolbar";
// layout
import FullLayout from "@/layout/FullLayout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import { IUserData, IUser } from "@/store/user-slice/types";
import { useUserSlice, wrapper, store, useHistorySlice } from "@/store";
import Cookies from "universal-cookie";
import { selectUser } from "@/store/selectors";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import useUpdateEffect from "@/hook/useUpdateEffect";
import SignUpDialogs from "@/components/shared/SignUpDialog";
import { useLocalStorage } from "@/hook";
import { AUTH_INFO, AUTH_TOKEN, IModalType, RequestStatus } from "@/constant";
import React from "react";

// ----------------------------------------------------------------------
export enum IStatus {
  UNKNOWN = "UNKNOWN",
  ACTIVE = "ACTIVE",
}

export interface ITABLE_HEAD {
  id: string;
  label: string;
  alignRight: boolean;
}

const TABLE_HEAD: ITABLE_HEAD[] = [
  { id: "fullName", label: "Name", alignRight: false },
  { id: "address", label: "Address", alignRight: false },
  { id: "description", label: "Role", alignRight: false },
  { id: "phone", label: "Phone", alignRight: true },
  { id: "email", label: "Status", alignRight: true },
  { id: "", label: "", alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a: any, b: any, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order: "desc" | "asc", orderBy: string) {
  return order === "desc"
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(
  array: IUser[] | [],
  comparator: any | number,
  query: string,
): IUser[] | [] {
  const stabilizedThis: any = array?.map((el, index) => [el, index]);
  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1,
    );
  }
  return stabilizedThis.map((el: Record<number, any>) => el[0]);
}

export default function Users({
  dataServer,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<"desc" | "asc">("asc");
  const [selected, setSelected] = useState<string[]>();
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userData, setUserData] = useState(dataServer);
  const { getUserSuccess, resetUserStatus, getUserRequest } =
    useUserSlice().actions;
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [modalType, setModalType] = useState<IModalType>(IModalType.CREATE);
  const { createHistoryRequest } = useHistorySlice().actions;
  const { createUserStatus, userCreateRes, userDataRes } =
    useSelector(selectUser);
  const [authInfo, setAuthInfo] = useLocalStorage(AUTH_INFO, "");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!_.isEmpty(dataServer)) {
      // When has data from server => update state userData data and pass to store
      setUserData(dataServer);
      dispatch(getUserSuccess(dataServer));
    }
  }, [dataServer, dispatch, getUserSuccess]);

  useUpdateEffect(() => {
    if (!_.isEmpty(userDataRes)) {
      setUserData(userDataRes);
    }
  }, [userDataRes]);

  useEffect(() => {
    if (!_.isEmpty(userData)) {
      setRowsPerPage(userData.meta.itemsPerPage);
      setPage(userData.meta.currentPage - 1);
    }
  }, [userData]);

  useEffect(() => {
    (async () => {
      if (createUserStatus === RequestStatus.SUCCESS) {
        const dataSave = {
          authorId: Number(authInfo.id),
          authorUrl: authInfo.avatarUrl,
          action: `${userCreateRes?.fullName} has been created`,
          categoryName: "Create new User",
          fullName: authInfo.fullName,
        };

        await dispatch(createHistoryRequest(dataSave));
        await dispatch(
          getUserRequest({
            data: {
              page: 1,
              limit: 10,
              sortBy: "ASC",
            },
          }),
        );
        await setOpenDialog(false);
      }
      await dispatch(resetUserStatus());
    })();
  }, [
    authInfo,
    createHistoryRequest,
    createUserStatus,
    dispatch,
    getUserRequest,
    resetUserStatus,
    userCreateRes?.fullName,
  ]);

  const isEditDialog = useMemo(() => {
    return modalType === IModalType.EDIT;
  }, [modalType]);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event: Event, property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target?.checked && userData) {
      const newSelecteds = userData.data.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string,
  ) => {
    if (!selected) return;
    const selectedIndex = selected.indexOf(name);
    let newSelected: any = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: Event, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = useMemo(
    () =>
      page > 0
        ? Math.max(
            0,
            (1 + page) * rowsPerPage - (userData ? userData?.data.length : 0),
          )
        : 0,
    [page, rowsPerPage, userData],
  );
  const filteredUsers = applySortFilter(
    userData?.data || [],
    getComparator(order, orderBy),
    filterName,
  );

  const isNotFound = useMemo(
    () => !filteredUsers.length && !!filterName,
    [filterName, filteredUsers.length],
  );

  const renderStatus = useCallback((status: IStatus) => {
    const color = status === IStatus.ACTIVE ? "success" : "error";
    return <Chip label={status} color={color} />;
  }, []);

  const openCreateUserDialog = useCallback(async () => {
    await setModalType(IModalType.CREATE);
    await setOpenDialog(true);
  }, []);

  const openEditUserDialog = useCallback(async () => {
    await setModalType(IModalType.EDIT);
    await setOpenDialog(true);
  }, []);

  return (
    <>
      <Helmet>
        <title>User</title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={openCreateUserDialog}
          >
            New User
          </Button>
        </Stack>
        {/* Content ~ Table */}
        <Card>
          <UserListToolbar
            numSelected={selected?.length || 0}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={userData?.data.length || 0}
                numSelected={selected?.length || 0}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const {
                      id,
                      fullName,
                      phone,
                      description,
                      address,
                      avatarUrl,
                      email,
                    } = row;
                    const selectedUser =
                      selected && selected?.indexOf(fullName) !== -1;
                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={selectedUser || false}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedUser}
                            onChange={(event) => handleClick(event, fullName)}
                          />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Tooltip title={email} arrow>
                              <Avatar src={avatarUrl || undefined} />
                            </Tooltip>
                            <Typography variant="subtitle2" noWrap>
                              {fullName}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{address}</TableCell>

                        <TableCell align="left">{description}</TableCell>

                        <TableCell align="center">{phone}</TableCell>

                        <TableCell align="center">
                          {renderStatus(
                            email ? IStatus.ACTIVE : IStatus.UNKNOWN,
                          )}
                        </TableCell>

                        <TableCell align="right">
                          <IconButton
                            size="large"
                            color="inherit"
                            onClick={handleOpenMenu}
                          >
                            <Iconify icon={"eva:more-vertical-fill"} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              {isNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <Paper
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="h6" paragraph>
                          Not found
                        </Typography>

                        <Typography variant="body2">
                          No results found for &nbsp;
                          <strong>&quot;{filterName}&quot;</strong>.
                          <br /> Try checking for typos or using complete words.
                        </Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={userData?.meta.totalItems || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={() => handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      {/* Dialog create user */}
      <SignUpDialogs
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        isEdit={isEditDialog}
      />
      {/* Action popup for table */}
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={openEditUserDialog}>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  dataServer: IUserData | undefined;
}> = wrapper.getServerSideProps(() => async ({ req, res }: any) => {
  const { getUserRequest } = useUserSlice().actions;
  const cookies = new Cookies(req.headers.cookie);
  const token = cookies.get("token");
  const payload = {
    data: {
      page: 1,
      limit: 10,
      sortBy: "ASC",
    },
    token,
  };

  await store.dispatch(getUserRequest(payload));
  await store.dispatch(END);
  await store.sagaTask.toPromise();
  const dataServer: IUserData | undefined =
    store.getState().userInfo?.userDataRes;
  if (dataServer) return { props: { dataServer } };
});

Users.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
