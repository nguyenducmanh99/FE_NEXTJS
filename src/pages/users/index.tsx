import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { ReactElement, useCallback, useMemo, useState } from "react";
import { sample } from "lodash";
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
} from "@mui/material";
// components
import Iconify from "@/components/utils/iconify";
import UserListHead from "@/components/ui/UserListHead";
import UserListToolbar from "@/components/ui/UserListToolbar";
// layout
import FullLayout from "@/layout/FullLayout";

// ----------------------------------------------------------------------
export enum IStatus {
  UNKNOWN = "UNKNOWN",
  ACTIVE = "ACTIVE",
}
export interface IUser {
  id: string | number;
  avatarUrl: string;
  name: string;
  company: string;
  status: IStatus;
  isVerified: boolean;
  role: string;
}
export interface ITABLE_HEAD {
  id: string;
  label: string;
  alignRight: boolean;
}

const USERLIST: IUser[] = [
  {
    id: 1,
    avatarUrl:
      "https://static.vecteezy.com/system/resources/previews/002/002/297/original/beautiful-woman-avatar-character-icon-free-vector.jpg",
    name: "Nguyen Van A",
    company: "FaceBook",
    isVerified: true,
    status: IStatus.ACTIVE,
    role: "Leader",
  },
  {
    id: 2,
    avatarUrl:
      "https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg",
    name: "Nguyen Van B",
    company: "Google",
    isVerified: true,
    status: IStatus.UNKNOWN,
    role: "Full Stack Developer",
  },
  {
    id: 3,
    avatarUrl:
      "https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    name: "Nguyen Van C",
    company: "Twitter",
    isVerified: true,
    status: IStatus.UNKNOWN,
    role: "Backend Developer",
  },
  {
    id: 4,
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI3vvVZ-pOGsyhaNEm9s-tm96lh7OGxJrpPQ&usqp=CAU",
    name: "Nguyen Van E",
    company: "Twitter",
    isVerified: true,
    status: IStatus.UNKNOWN,
    role: "UX/UI Designer",
  },
  {
    id: 5,
    avatarUrl:
      "https://mir-s3-cdn-cf.behance.net/project_modules/disp/ce54bf11889067.562541ef7cde4.png",
    name: "Nguyen Van M",
    company: "Instagram",
    isVerified: true,
    status: IStatus.ACTIVE,
    role: "Tester Engineer",
  },
];

const TABLE_HEAD: ITABLE_HEAD[] = [
  { id: "name", label: "Name", alignRight: false },
  { id: "company", label: "Company", alignRight: false },
  { id: "role", label: "Role", alignRight: false },
  { id: "isVerified", label: "Verified", alignRight: true },
  { id: "status", label: "Status", alignRight: true },
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
  array: IUser[],
  comparator: any | number,
  query: string,
): IUser[] {
  const stabilizedThis: any = array.map((el, index) => [el, index]);
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

export default function Users() {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState<"desc" | "asc">("asc");

  const [selected, setSelected] = useState<string[]>();

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

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
    if (event.target?.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
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
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0,
    [page, rowsPerPage],
  );
  const filteredUsers = applySortFilter(
    USERLIST,
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
          >
            New User
          </Button>
        </Stack>

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
                rowCount={USERLIST.length}
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
                      name,
                      role,
                      status,
                      company,
                      avatarUrl,
                      isVerified,
                    } = row;
                    const selectedUser =
                      selected && selected?.indexOf(name) !== -1;
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
                            onChange={(event) => handleClick(event, name)}
                          />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Avatar src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{company}</TableCell>

                        <TableCell align="left">{role}</TableCell>

                        <TableCell align="center">
                          {isVerified ? "Yes" : "No"}
                        </TableCell>

                        <TableCell align="center">
                          {renderStatus(status)}
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
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={() => handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

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
        <MenuItem>
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
Users.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
