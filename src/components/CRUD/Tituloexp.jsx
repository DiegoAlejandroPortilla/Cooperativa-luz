import React, { useCallback } from "react";
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
  useDisclosure,
  Chip
} from "@nextui-org/react";

import {EditIcon} from "../../assets/EditIcon";
import {DeleteIcon} from "../../assets/DeleteIcon";
import { SearchIcon } from "../../assets/SearchIcon";
import {ChevronDownIcon} from "../../assets/ChevronDownIcon";
import {capitalize} from "../utils";
import { PlusIcon } from "../../assets/PlusIcon";

const columns = [
  {name: "DETALLE", uid: "tx_detalle", sortable: true},
  {name: "REQUISITO", uid: "campoAmplio"},
  {name: "DESCRIPCION", uid: "tx_descripcion"},
  {name: "PUNTAJE MINIMO", uid: "tx_puntaje_min"},
  {name: "PUNTAJE MAXIMO", uid: "tx_puntaje_max"},
  {name: "PUNTAJE ASIGNADO", uid: "tx_puntaje_asignado"},
  {name: "OBSERVACION", uid: "tx_observacion"},
  {name: "ACCIONES", uid: "actions"},
];

const INITIAL_VISIBLE_COLUMNS = ["tx_detalle", "tx_descriRequisitpcion", "campoAmplio","actions", "tx_puntaje_min", "tx_puntaje_max", "tx_puntaje_asignado", " tx_observacion"];

const campoA = [
  {
    tx_id: 1,
    tx_detalle: "Titulo exp 1",
    tx_descripcion: "Descripcion 1",
    rq_id: 1,
    tx_puntaje_min: 0,
    tx_puntaje_max: 20,
    tx_puntaje_asignado: 15,
    tx_observacion: "Observacion 1"
  },
  {
    tx_id: 2,
    tx_detalle: "Titulo exp 2",
    tx_descripcion: "Descripcion 2",
    rq_id: 2,
    tx_puntaje_min: 1,
    tx_puntaje_max: 18,
    tx_puntaje_asignado: 12,
    tx_observacion: "Observacion 2"
},
];

const requisitos = [
    {
        rq_id: 1,
        nombreCA: "R1",
    },
    {
        rq_id: 2,
        nombreCA: "R2",
    }
]

const statusOptions = [];

campoA.forEach(campo => {
  const matchingNomCampA = requisitos.find(item => item.rq_id === campo.rq_id);
  if (matchingNomCampA && !statusOptions.some(option => option.name === matchingNomCampA.nombreCA)) {
    statusOptions.push({ name: matchingNomCampA.nombreCA, uid: matchingNomCampA.nombreCA });
  }

  console.log(statusOptions);
});

const getCaIdFromNombreCA = (nameCA) => {
    const foundItem = requisitos.find((item) => item.nombreCA === nameCA);
    return foundItem ? foundItem.rq_id : null;
  };

export default function App() {

  //!Variables para rellenar a todas las campoA
  const [actividad, setActividad] = React.useState(campoA);

  //!Variables de agregacion y actualizacion
  const [tx_id, setIdA] = React.useState(0); //Para actualizar
  const [tx_detalle, setNombreA] = React.useState("");
  const [tx_descripcion, setDescripcion] = React.useState("");
  const [tx_puntaje_min, setTx_puntaje_min] = React.useState(0);
  const [tx_puntaje_max, setTx_puntaje_max] = React.useState(0);
  const [tx_puntaje_asignado, setTx_puntaje_asignado] = React.useState(0);
  const [tx_observacion, setTx_observacion] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Selecciona"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  //!Variables para abrir y cerrar los modales de agregar y actualizar
  const { isOpen: isOpenModal1, onOpen: onOpenModal1, onOpenChange: onOpenChangeModal1 } = useDisclosure();
  const { isOpen: isOpenModal2, onOpen: onOpenModal2, onOpenChange: onOpenChangeModal2 } = useDisclosure();

  //Limpio los valores
  const clearInputFields = () => {
    setNombreA("");
    setDescripcion("");
    setTx_puntaje_min(0);
    setTx_puntaje_max(0);
    setTx_puntaje_asignado(0);
    setTx_observacion("");
    setSelectedKeys(new Set(["Selecciona"]));
  };

  const validacionN = React.useMemo(() => {
    if (tx_detalle === "") return undefined;

    return tx_detalle === "" ? "invalido" : "valido";
  }, [tx_detalle]);

  //!Funcion para agregar una nueva actividad
  const handleAgregar = React.useCallback(() => {
    const newUser = {
        tx_id: campoA.length + 1,  
        tx_detalle: tx_detalle,
        tx_descripcion: tx_descripcion,
        rq_id: getCaIdFromNombreCA(selectedValue),
        tx_puntaje_min: tx_puntaje_min,
        tx_puntaje_max: tx_puntaje_max,
        tx_puntaje_asignado: tx_puntaje_asignado,
        tx_observacion: tx_observacion,
    };
    setActividad((prevUsers) => [...prevUsers, newUser]);
    clearInputFields(); // Call the function to clear input fields
  }, [tx_detalle, tx_descripcion, selectedValue, tx_puntaje_min, tx_puntaje_max, tx_puntaje_asignado, tx_observacion]);

  //!Funcion de eliminado
  const handleDelete = React.useCallback((tx_id) => {
    console.log("Deleting user with tx_id: ", tx_id);
    console.log(actividad);
    setActividad((prevUsers) => prevUsers.filter((user) => user.tx_id !== tx_id));
    console.log(actividad);
  }, [actividad]);

  //!Funcion de actualizar
  const handleActualizar = React.useCallback(() => {
    const editedUser = {
        tx_id: tx_id,
        tx_detalle: tx_detalle,
        tx_descripcion: tx_descripcion,
        rq_id: getCaIdFromNombreCA(selectedValue),
        tx_puntaje_min: tx_puntaje_min,
        tx_puntaje_max: tx_puntaje_max,
        tx_puntaje_asignado: tx_puntaje_asignado,
        tx_observacion: tx_observacion,
    };
    setActividad((prevUsers) => prevUsers.map((user) => (user.tx_id === tx_id ? editedUser : user)));
    clearInputFields(); // Call the function to clear input fields
  }, [tx_id, tx_detalle, tx_descripcion, selectedValue, tx_puntaje_min, tx_puntaje_max, tx_puntaje_asignado, tx_observacion]);


  const renderCell = React.useCallback((user, columnKey) => {

    const cellValue = user[columnKey];

    const handleButtonPress = (tx_id, tx_detalle, tx_descripcion, tx_puntaje_min, tx_puntaje_max, tx_puntaje_asignado, tx_observacion) => {
        onOpenModal1(); // Open the modal
        setIdA(tx_id); // Clear the tx_id
        setNombreA(tx_detalle);
        setDescripcion(tx_descripcion);
        setTx_puntaje_min(tx_puntaje_min);
        setTx_puntaje_max(tx_puntaje_max);
        setTx_puntaje_asignado(tx_puntaje_asignado);
        setTx_observacion(tx_observacion);
    }

    switch (columnKey) {
      case "tx_detalle":
        return (
        <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "tx_descripcion":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">Descripcion del Titulo</p>
            <p className="text-bold text-sm capitalize text-default-400">{user.tx_descripcion}</p>
          </div>
        );
        case "tx_puntaje_min":
        return (
          <Chip className="capitalize" color={user.tx_puntaje_min <= 10 ? "danger" : "warning"} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
        case "tx_puntaje_max":
        return (
            <Chip className="capitalize" color={user.tx_puntaje_max <= 10 ? "danger" : "warning"} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
        case "tx_puntaje_asignado":
        return (
            <Chip className="capitalize" color={user.tx_puntaje_asignado <= 10 ? "danger" : "warning"} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
        case "tx_observacion":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">Observacion</p>
            <p className="text-bold text-sm capitalize text-default-400">{user.tx_observacion}</p>
          </div>
        );
      case "campoAmplio":
        const foundCampoA = campoA.find(item => item.rq_id === user.rq_id);
        const matchingNomCampA = foundCampoA ? requisitos.find(item => item.rq_id === foundCampoA.rq_id) : null;

        return (
            <Chip className="capitalize" color="success" size="sm" variant="flat">
            {matchingNomCampA ? matchingNomCampA.nombreCA : 'No matching value'}
            </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">

          <Button color="success" 
            isIconOnly 
            variant="faded" 
            onPress={ () => handleButtonPress(user.tx_id, user.tx_detalle, user.tx_descripcion)}
            >
              <EditIcon />
            </Button>

            <Button isIconOnly color="danger" variant="faded" aria-label="Like" onClick={() => handleDelete(user.tx_id)}>
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
        user.tx_detalle.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

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
            placeholder="Buscar por detalle..."
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
                    <ModalHeader className="flex flex-col gap-1">Agregar titulo</ModalHeader>
                    <ModalBody>
                      <div className="flex flex-wrap gap-8">
                        <div className="w-full">
                          <Input
                            isRequired
                            isClearable
                            onClear={() => console.log("input cleared")}
                            value={tx_detalle}
                            type="text"
                            label="Nombre"
                            variant="bordered"
                            color={validacionN === "invalido" ? "danger" : "success"}
                            errorMessage={validacionN === "invalido" && "Ingresa un tx_detalle valido"}
                            validationState={validacionN}
                            onValueChange={setNombreA}
                          />
                        </div>
                        <div className="flex gap-4 w-full">
                        <Input
                            isRequired
                            isClearable
                            onClear={() => console.log("input cleared")}
                            value={tx_descripcion}
                            type="text"
                            label="Descripcion"
                            variant="bordered"
                            color={validacionN === "invalido" ? "danger" : "success"}
                            errorMessage={validacionN === "invalido" && "Ingresa un tx_detalle valido"}
                            validationState={validacionN}
                            onValueChange={setDescripcion}
                          />
                        </div>

                        <div className="flex gap-4 w-full">
                            <Input
                                type="number"
                                label="Puntaje Minimo"
                                placeholder="0"
                                value={tx_puntaje_min}
                                onValueChange={setTx_puntaje_min}
                            />    
                            <Input
                                type="number"
                                label="Puntaje Maximo"
                                placeholder="0"
                                value={tx_puntaje_max}
                                onValueChange={setTx_puntaje_max}
                            />         

                            </div>

                            <div className="flex gap-4 w-full">
                                <Input
                                    type="number"
                                    label="Puntaje Asignado"
                                    placeholder="0"
                                    value={tx_puntaje_asignado}
                                    onValueChange={setTx_puntaje_asignado}
                                />     
                            </div>
                            
                            <div className="flex items-center gap-4">
                            <Chip color="success" variant="bordered">Item: </Chip> 

                            <Dropdown>
                                        <DropdownTrigger>
                                            <Button 
                                                variant="flat"
                                                className="capitalize"
                                            >
                                                {selectedValue}
                                            </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu 
                                            aria-label="Single selection actions"
                                            variant="flat"
                                            disallowEmptySelection
                                            selectionMode="single"
                                            selectedKeys={selectedKeys}
                                            onSelectionChange={setSelectedKeys}
                                            >
                                                {statusOptions.map((column) => (
                                                <DropdownItem key={column.name} className="capitalize">
                                                    {capitalize(column.name)}
                                                </DropdownItem>
                                                ))}
                                            </DropdownMenu>
                            </Dropdown>  
                            </div>

                            <div className="flex gap-4 w-full">
                            <Input
                                isRequired
                                isClearable
                                onClear={() => console.log("input cleared")}
                                value={tx_observacion}
                                type="text"
                                label="Observacion"
                                variant="bordered"
                                color={validacionN === "invalido" ? "danger" : "success"}
                                errorMessage={validacionN === "invalido" && "Ingresa un tx_detalle valido"}
                                validationState={validacionN}
                                onValueChange={setTx_observacion}
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
          <span className="text-default-400 text-small">Total {actividad.length} titulos</span>
          <label className="flex items-center text-default-400 text-small">
            Titulo por pagina:
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
    tx_detalle,
    tx_descripcion,
    handleAgregar,
    isOpenModal2,
    onOpenChangeModal2,
    validacionN,
    selectedKeys,
    selectedValue,
    tx_puntaje_min,
    tx_puntaje_max,
    tx_puntaje_asignado,
    tx_observacion,
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
            Previo
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Siguiente
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
    <TableBody emptyContent={"No se encontraron titulos"} items={sortedItems}>
      {(item) => (
        <TableRow key={item.tx_id}>
          {(columnKey) => <TableCell>{renderCell(item, columnKey, onOpenModal1)}</TableCell>}
        </TableRow>
      )}
    </TableBody>
    </Table>

    <Modal isOpen={isOpenModal1} onOpenChange={onOpenChangeModal1}>
    <ModalContent>
      {(onClose) => ( 
        <>
          <ModalHeader className="flex flex-col gap-1">Actualizar Titulo</ModalHeader>
          <ModalBody>
          <div className="flex flex-wrap gap-8">
                <div className="w-full">
                    <Input
                    isRequired
                    isClearable
                    onClear={() => console.log("input cleared")}
                    value={tx_detalle}
                    type="text"
                    label="Nombre"
                    variant="bordered"
                    color={validacionN === "invalido" ? "danger" : "success"}
                    errorMessage={validacionN === "invalido" && "Ingresa un tx_detalle valido"}
                    validationState={validacionN}
                    onValueChange={setNombreA}
                    />
                </div>
                <div className="flex gap-4 w-full">
                <Input
                    isRequired
                    isClearable
                    onClear={() => console.log("input cleared")}
                    value={tx_descripcion}
                    type="text"
                    label="Descripcion"
                    variant="bordered"
                    color={validacionN === "invalido" ? "danger" : "success"}
                    errorMessage={validacionN === "invalido" && "Ingresa un tx_detalle valido"}
                    validationState={validacionN}
                    onValueChange={setDescripcion}
                    />
                </div>

                <div className="flex gap-4 w-full">
                <Input
                    type="number"
                    label="Puntaje Minimo"
                    placeholder="0"
                    value={tx_puntaje_min}
                    onValueChange={setTx_puntaje_min}
                />    
                <Input
                    type="number"
                    label="Puntaje Maximo"
                    placeholder="0"
                    value={tx_puntaje_max}
                    onValueChange={setTx_puntaje_max}
                />         

                </div>

                <div className="flex gap-4 w-full">
                    <Input
                        type="number"
                        label="Puntaje Asignado"
                        placeholder="0"
                        value={tx_puntaje_asignado}
                        onValueChange={setTx_puntaje_asignado}
                    />     
                </div>
                
                <div className="flex items-center gap-4">
                <Chip color="success" variant="bordered">Item: </Chip> 

                <Dropdown>
                              <DropdownTrigger>
                                  <Button 
                                    variant="flat"
                                    className="capitalize"
                                  >
                                    {selectedValue}
                                  </Button>
                                </DropdownTrigger>
                                <DropdownMenu 
                                  aria-label="Single selection actions"
                                  variant="flat"
                                  disallowEmptySelection
                                  selectionMode="single"
                                  selectedKeys={selectedKeys}
                                  onSelectionChange={setSelectedKeys}
                                >
                                    {statusOptions.map((column) => (
                                    <DropdownItem key={column.name} className="capitalize">
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                    ))}
                                </DropdownMenu>
                </Dropdown>  
                </div>

                <div className="flex gap-4 w-full">
                <Input
                    isRequired
                    isClearable
                    onClear={() => console.log("input cleared")}
                    value={tx_observacion}
                    type="text"
                    label="Observacion"
                    variant="bordered"
                    color={validacionN === "invalido" ? "danger" : "success"}
                    errorMessage={validacionN === "invalido" && "Ingresa un tx_detalle valido"}
                    validationState={validacionN}
                    onValueChange={setTx_observacion}
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