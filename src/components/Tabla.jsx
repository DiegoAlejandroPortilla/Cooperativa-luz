import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from "@nextui-org/react";

import { SearchIcon } from "../assets/SearchIcon";
import {ChevronDownIcon} from "../assets/ChevronDownIcon";
import {capitalize} from "./utils";
import { useAuth } from "../context/AuthContext";

const columns = [
  {name: "NOMBRE", uid: "nombre", sortable: true},
  {name: "NÚMERO DE IDENTIFICACIÓN", uid: "noIdentificacion", sortable: true},
  {name: "EDAD", uid: "fechaNacimiento", sortable: true},
  {name: "SEXO", uid: "sexo", sortable: true},
  {name: "TÍTULO", uid: "titulo", sortable: true},
];

const INITIAL_VISIBLE_COLUMNS = ["nombre", "noIdentificacion", "fechaNacimiento", "sexo", "titulo"];

const statusOptions = [
  {name: "Masculino", uid: "Masculino"},
  {name: "Femenino", uid: "Otro"},
  {name: "Otro", uid: "Otro"},
];

const statusColorMap = {
  Masculino: "success",
  Femenino: "danger",
  Otro: "warning",
};

export default function App() {
  const { getUsuarios } = useAuth();
  const [users, setUsers] = useState([]);
  function calculateAge(birthdate) {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  }
  useEffect(() => {
    getUsuarios()
      .then((contratoData) => {
        const formattedUsuarios = contratoData.map((data) => ({
          id: data[5],
          nombre: `${data[8]} ${data[9]} ${data[10]} ${data[11]}`,
          noIdentificacion: data[1],
          tipoIdentificacion: data[0],
          fechaNacimiento: data[4],
          edad: calculateAge(data[4]),
          avatar: "https://i.pravatar.cc/300",
          email: data[6],
          sexo: data[2] === "M" ? "Masculino" : data[2] === "F" ? "Femenino" : "Otro",
          titulo: data[3],
        }));
  
        setUsers(formattedUsuarios);
      })
      .catch((error) => {
        console.error("Error al obtener contrato:", error);
      });
  }, [getUsuarios]);

  const renderCell = React.useCallback((user, columnKey) => {

    const cellValue = user[columnKey];

    switch (columnKey) {
      case "nombre":
        return (

              <User
                avatarProps={{ radius: "lg", src: user.avatar }}
                description={user.email}
                name={cellValue}
              >
                {user.email}
              </User>
  
        );
      case "noIdentificacion":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{user.tipoIdentificacion}</p>
          </div>
        );
      case "sexo":
        return (
          <Chip className="capitalize" color={statusColorMap[user.sexo]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "fechaNacimiento":
        return (
          <div className="flex flex-col">
          <p className="text-bold text-sm capitalize">{cellValue}</p>
          <p className="text-bold text-sm capitalize text-default-400">{user.edad} años</p>
        </div>
        );
      case "titulo":
        return (
          <div className="flex flex-col">
          <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  //!Funciones de filtro
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(1);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];
    console.log("Usuarios Filtrados:", filteredUsers);

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.nombre.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.sexo),
      );
    }

    return filteredUsers;
  }, [filterValue, statusFilter, hasSearchFilter, users]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  //!Funciones de paginacion
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])

  //!Contenido de arriba 
  const topContent = React.useMemo(() => {
  
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar por nombre..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {users.length} usuarios</span>
          <label className="flex items-center text-default-400 text-small">
            Usuarios por pagina:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="1">1</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    onRowsPerPageChange,
    onSearchChange,
    onClear,
    users.length,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="success"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Anterior
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Siguiente
          </Button>
        </div>
      </div>
    );
  }, [page, pages, onNextPage, onPreviousPage]);

  return (
    <div >
    <Table
    aria-label="Example table with custom cells, pagination and sorting"
    isHeaderSticky
    bottomContent={bottomContent}
    bottomContentPlacement="outside"
    classNames={{
      wrapper: "max-h-[382px]",
    }}
    sortDescriptor={sortDescriptor}
    topContent={topContent}
    topContentPlacement="outside"
    onSortChange={setSortDescriptor}
  >
    <TableHeader columns={headerColumns}>
      {(column) => (
        <TableColumn
          key={column.uid}
          align={column.uid === "actions" ? "center" : "start"}
          allowsSorting={column.sortable}
        >
          {column.name}
        </TableColumn>
      )}
    </TableHeader>
    <TableBody emptyContent={"No users found"} items={sortedItems}>
      {(item) => (
        <TableRow key={item.id}>
          {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
        </TableRow>
      )}
    </TableBody>
    </Table>
    
    </div>

  );
}
