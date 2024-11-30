import React, { useCallback, useEffect } from "react";
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
  Pagination,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  useDisclosure
} from "@nextui-org/react";

import {EditIcon} from "../../assets/EditIcon";
import {DeleteIcon} from "../../assets/DeleteIcon";
import { SearchIcon } from "../../assets/SearchIcon";
import {ChevronDownIcon} from "../../assets/ChevronDownIcon";
import {capitalize} from "../utils";
import { PlusIcon } from "../../assets/PlusIcon";
import { extraerContrato, agregarContrato, editarContrato, eliminarContrato } from "../../api/contratacion";

const columns = [
  {name: "PERIODO", uid: "nombreA", sortable: true},
  {name: "ACCIONES", uid: "actions"},
];

const INITIAL_VISIBLE_COLUMNS = ["nombreA", "actions"];

// const campoA = [
//   {
//     idA: 1,
//     nombreA: "Contratacion 1",
//   },
//   {
//     idA: 2,
//     nombreA: "Contratacion 2",
// },
// ];


export default function App() {

  //!Variables para rellenar a todas las campoA
  const [actividad, setActividad] = React.useState([]);

  useEffect(() => {
    const fetchData = () => {
      extraerContrato()
        .then((response) => {
          const contratoData = response.data.contrato;
          const formattedData = contratoData.map((item) => ({
            idA: item[0],
            nombreA: item[1]
          }));
          setActividad(formattedData);
        })
        .catch((error) => {
          console.error("Error al obtener contrato:", error);
        });
    };
    fetchData();
    const intervalId = setInterval(fetchData, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  //!Variables de agregacion y actualizacion
  const [idA, setIdA] = React.useState(0); //Para actualizar
  const [nombreA, setNombreA] = React.useState("");

  //!Variables para abrir y cerrar los modales de agregar y actualizar
  const { isOpen: isOpenModal1, onOpen: onOpenModal1, onOpenChange: onOpenChangeModal1 } = useDisclosure();
  const { isOpen: isOpenModal2, onOpen: onOpenModal2, onOpenChange: onOpenChangeModal2 } = useDisclosure();

  //Limpio los valores
  const clearInputFields = () => {
    setNombreA("");
  };

  const validacionN = React.useMemo(() => {
    if (nombreA === "") return undefined;

    return nombreA === "" ? "invalido" : "valido";
  }, [nombreA]);

  //!Funcion para agregar una nueva actividad
  const handleAgregar = React.useCallback(() => {
    if (nombreA.trim() === "") {
      window.alert("Error: Los campos no pueden estar vacíos");
      return;
    }

    const newActividad = {
      post_periodo: nombreA,
    };
    agregarContrato(newActividad);
    clearInputFields(); // Llama a la función para limpiar los campos de entrada
    onOpenChangeModal2(); // Cierra el modal de agregar
  }, [nombreA, onOpenChangeModal2]);

  //!Funcion de eliminado
  const handleDelete = React.useCallback((idA) => {
    eliminarContrato(idA);
  }, []);

  //!Funcion de actualizar
  const handleActualizar = React.useCallback(() => {
    if (nombreA.trim() === "") {
      window.alert("Error: Los campos no pueden estar vacíos");
      return;
    }

    const editedUser = {
      post_id: idA,
      post_periodo: nombreA,
    };
    
    editarContrato(idA, editedUser);

    clearInputFields(); // Llama a la función para limpiar los campos de entrada
    onOpenChangeModal1(); // Cierra el modal de editar
  }, [idA, nombreA, onOpenChangeModal1]);


  const renderCell = React.useCallback((user, columnKey) => {

    const cellValue = user[columnKey];

    const handleButtonPress = (idA, nombreA, descripcion) => {
      onOpenModal1(); // Open the modal
      setIdA(idA); // Clear the idA
      setNombreA(nombreA);
    }

    switch (columnKey) {
      case "nombreA":
        return (
        <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">

          <Button color="success" 
            isIconOnly 
            variant="faded" 
            onPress={ () => handleButtonPress(user.idA, user.nombreA)}
            >
              <EditIcon />
            </Button>

            <Button isIconOnly color="danger" variant="faded" aria-label="Like" onClick={() => handleDelete(user.idA)}>
              <DeleteIcon />
            </Button>  
          </div>
        );
      default:
        return cellValue;
    }
  }, [handleDelete, onOpenModal1]);
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  //!Funciones de filtro
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
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
    let filteredUsers = [...actividad];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.nombreA.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    // if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
    //   filteredUsers = filteredUsers.filter((user) =>
    //     Array.from(statusFilter).includes(user.sexo),
    //   );
    // }

    return filteredUsers;
  }, [filterValue, hasSearchFilter, actividad]);

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

            <Button color="success" 
            endContent={<PlusIcon />}
            onPress={onOpenModal2}
            >
              Agregar nuevo
            </Button>
            
            <Modal 
              isOpen={isOpenModal2} 
              onOpenChange={onOpenChangeModal2}
              placement="top-center"
              size="lg" 
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">Agregar postulacion</ModalHeader>
                    <ModalBody>
                      <div className="flex flex-wrap gap-8">
                        <div className="w-full">
                          <Input
                            isRequired
                            isClearable
                            onClear={() => console.log("input cleared")}
                            value={nombreA}
                            type="text"
                            label="Periodo"
                            variant="bordered"
                            color={validacionN === "invalido" ? "danger" : "success"}
                            errorMessage={validacionN === "invalido" && "Ingresa un nombreA valido"}
                            validationState={validacionN}
                            onValueChange={setNombreA}
                          />
                        </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button variant="outline" onClick={onClose}>
                        Cancelar
                      </Button>
                      <Button color="success" onClick={handleAgregar}>Agregar</Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>

          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {actividad.length} postulaciones</span>
          <label className="flex items-center text-default-400 text-small">
            Postulaciones por pagina:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="1">1</option>
              <option value="5">5</option>
              <option value="10">10</option>
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
   actividad.length,
    onOpenModal2,
    nombreA,
    handleAgregar,
    isOpenModal2,
    onOpenChangeModal2,
    validacionN,
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
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, pages, onNextPage, onPreviousPage]);

  return (
    <div>
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
    <TableBody emptyContent={"No se encontraron postulaciones"} items={sortedItems}>
      {(item) => (
        <TableRow key={item.idA}>
          {(columnKey) => <TableCell>{renderCell(item, columnKey, onOpenModal1)}</TableCell>}
        </TableRow>
      )}
    </TableBody>
    </Table>

    <Modal isOpen={isOpenModal1} onOpenChange={onOpenChangeModal1}>
    <ModalContent>
      {(onClose) => ( 
        <>
          <ModalHeader className="flex flex-col gap-1">Actualizar postulacion</ModalHeader>
          <ModalBody>
          <div className="flex flex-wrap gap-8">
                <div className="w-full">
                    <Input
                    isRequired
                    isClearable
                    onClear={() => console.log("input cleared")}
                    value={nombreA}
                    type="text"
                    label="Nombre"
                    variant="bordered"
                    color={validacionN === "invalido" ? "danger" : "success"}
                    errorMessage={validacionN === "invalido" && "Ingresa un nombreA valido"}
                    validationState={validacionN}
                    onValueChange={setNombreA}
                    />
                </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button color="success" onClick={handleActualizar}>Actualizar</Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
    </Modal>
    
    </div>

  );
}