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
  {name: "APROBACION", uid: "sol_aprobacion", sortable: true},
  {name: "CANDIDATO", uid: "cand_id", sortable: true},
  {name: "RECURSOS HUMANOS", uid: "rh_id", sortable: true},
  {name: "ACCIONES", uid: "actions"},
];

const INITIAL_VISIBLE_COLUMNS = ["sol_aprobacion", "cand_id","actions", "rh_id"];

const campoA = [
  {
    sol_id: 1,
    sol_aprobacion: true,
    rh_id: 1,
    cand_id: 1,
  },
  {
    sol_id: 2,
    sol_aprobacion: false,
    rh_id: 2,
    cand_id: 2,
},
];

const candidatos = [
    {
        cand_id: 1,
        nombreCA: "C1",
    },
    {
        cand_id: 2,
        nombreCA: "C2",
    }
]

const recursos = [
    {
        rh_id: 1,
        nombreRH: "R1",
    },
    {
        rh_id: 2,
        nombreRH: "R2",
    }
]

const statusOptions = [];
const statusOptionsR = [];

campoA.forEach(campo => {
  const matchingNomCampA = candidatos.find(item => item.cand_id === campo.cand_id);
  if (matchingNomCampA && !statusOptions.some(option => option.name === matchingNomCampA.nombreCA)) {
    statusOptions.push({ name: matchingNomCampA.nombreCA, uid: matchingNomCampA.nombreCA });
  }

  console.log(statusOptions);
});

campoA.forEach(campo => {
    const matchingNomCampAR = recursos.find(item => item.rh_id === campo.rh_id);
    if (matchingNomCampAR && !statusOptionsR.some(option => option.name === matchingNomCampAR.nombreRH)) {
      statusOptionsR.push({ name: matchingNomCampAR.nombreRH, uid: matchingNomCampAR.nombreRH });
    }
  
    console.log(statusOptionsR);
  });


const getCaIdFromNombreCA = (nameCA) => {
    const foundItem = candidatos.find((item) => item.nombreCA === nameCA);
    return foundItem ? foundItem.cand_id : null;
  };

const getRHIdFromNombreRH = (nameCA) => {
    const foundItem = recursos.find((item) => item.nombreRH === nameCA);
    return foundItem ? foundItem.rh_id : null;
};

const findNombreById = (cand_id) => {
  const candidato = candidatos.find((c) => c.cand_id === cand_id);

  if (candidato) {
    return candidato.nombreCA;
  } else {
    return "Candidato not found";
  }
}

export default function App() {

  //!Variables para rellenar a todas las campoA
  const [actividad, setActividad] = React.useState(campoA);

  //!Variables de agregacion y actualizacion
  const [sol_id, setId] = React.useState(0); //Para actualizar
  const [sol_aprobacion, setSol_aprobacion] = React.useState(false);
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Selecciona"])); //Candidatos
  const [selectedKeysR, setSelectedKeysR] = React.useState(new Set(["Selecciona"])); //RRHH
  const [selectedKeysB, setSelectedKeysB] = React.useState(new Set(["Selecciona"])); //Aprobacion

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const selectedValueR = React.useMemo(
    () => Array.from(selectedKeysR).join(", ").replaceAll("_", " "),
    [selectedKeysR]
  );

  const selectedValueB = React.useMemo(
    () => Array.from(selectedKeysB).join(", ").replaceAll("_", " "),
    [selectedKeysB]
  );

  //!Variables para abrir y cerrar los modales de agregar y actualizar
  const { isOpen: isOpenModal1, onOpen: onOpenModal1, onOpenChange: onOpenChangeModal1 } = useDisclosure();
  const { isOpen: isOpenModal2, onOpen: onOpenModal2, onOpenChange: onOpenChangeModal2 } = useDisclosure();

  //Limpio los valores
  const clearInputFields = () => {
    setSol_aprobacion("");
    setSelectedKeys(new Set(["Selecciona"]));
    setSelectedKeysR(new Set(["Selecciona"]));
    setSelectedKeysB(new Set(["Selecciona"]));
  };

  // const validacionN = React.useMemo(() => {
  //   if (sol_aprobacion === "") return undefined;

  //   return sol_aprobacion === "" ? "invalido" : "valido";
  // }, [sol_aprobacion]);

  //!Funcion para agregar una nueva actividad
  const handleAgregar = React.useCallback(() => {
    console.log(selectedKeysB.currentKey);
    const newUser = {
        sol_id: campoA.length + 1,  
        sol_aprobacion: selectedKeysB.currentKey === "si" ? true : false,
        rh_id: getRHIdFromNombreRH(selectedValueR),
        cand_id: getCaIdFromNombreCA(selectedValue),
    };
    setActividad((prevUsers) => [...prevUsers, newUser]);
    clearInputFields(); // Call the function to clear input fields
  }, [selectedValue, selectedValueR, selectedKeysB]);

  //!Funcion de eliminado
  const handleDelete = React.useCallback((sol_id) => {
    console.log("Deleting user with sol_id: ", sol_id);
    console.log(actividad);
    setActividad((prevUsers) => prevUsers.filter((user) => user.sol_id !== sol_id));
    console.log(actividad);
  }, [actividad]);

  //!Funcion de actualizar
  const handleActualizar = React.useCallback(() => {
    const editedUser = {
        sol_id: sol_id,
        sol_aprobacion: sol_aprobacion === "true" ? true : false,
        rh_id: getRHIdFromNombreRH(selectedValueR),
        cand_id: getCaIdFromNombreCA(selectedValue),
    };
    setActividad((prevUsers) => prevUsers.map((user) => (user.sol_id === sol_id ? editedUser : user)));
    clearInputFields(); // Call the function to clear input fields
  }, [sol_id, sol_aprobacion, selectedValue, selectedValueR]);


  const renderCell = React.useCallback((user, columnKey) => {

    const cellValue = user[columnKey];

    const handleButtonPress = (sol_id, sol_aprobacion) => {
        onOpenModal1(); // Open the modal
        setId(sol_id); // Clear the sol_id
        setSol_aprobacion(sol_aprobacion);
    }

    switch (columnKey) {
      case "sol_aprobacion":
        return (
          <Chip className="capitalize" color={cellValue === true ? "success" : "danger"} size="sm" variant="flat">
            {cellValue === true ? "Si" : "No"}
          </Chip>
        );
      case "cand_id":
        const foundCampoA = campoA.find(item => item.cand_id === user.cand_id);
        const matchingNomCampA = foundCampoA ? candidatos.find(item => item.cand_id === foundCampoA.cand_id) : null;

        return (
            <Chip className="capitalize" color="warning" size="sm" variant="flat">
            {matchingNomCampA ? matchingNomCampA.nombreCA : 'No matching value'}
            </Chip>
        );
        case "rh_id":
          const foundCampoAR = campoA.find(item => item.rh_id === user.rh_id);
          const matchingNomCampAR = foundCampoAR ? recursos.find(item => item.rh_id === foundCampoAR.rh_id) : null;
  
          return (
              <Chip className="capitalize" color="primary" size="sm" variant="flat">
              {matchingNomCampAR ? matchingNomCampAR.nombreRH : 'No matching value'}
              </Chip>
          );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">

          <Button color="success" 
            isIconOnly 
            variant="faded" 
            onPress={ () => handleButtonPress(user.sol_id, user.sol_aprobacion, user.rh_id)}
            >
              <EditIcon />
            </Button>

            <Button isIconOnly color="danger" variant="faded" aria-label="Like" onClick={() => handleDelete(user.sol_id)}>
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
        findNombreById(user.cand_id).toLowerCase().includes(filterValue.toLowerCase()),
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
      console.log(first);
      console.log(second);
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
            placeholder="Buscar por candidato..."
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
                    <ModalHeader className="flex flex-col gap-1">Agregar solicitud</ModalHeader>
                    <ModalBody>
                      <div className="flex justify-between items-center">
                        <div className="m-2">
                
                            <Chip color="success" variant="bordered">Aprobación: </Chip> 
                                    
                        </div>
                              <Dropdown>
                                <DropdownTrigger>
                                    <Button 
                                      variant="flat"
                                      className="capitalize"
                                    >
                                      {selectedValueB}
                                    </Button>
                                  </DropdownTrigger>
                                  <DropdownMenu 
                                    aria-label="Single selection actions"
                                    variant="flat"
                                    disallowEmptySelection
                                    selectionMode="single"
                                    selectedKeys={selectedKeysB}
                                    onSelectionChange={setSelectedKeysB}
                                  >

                                  <DropdownItem key="si">Si</DropdownItem>
                                  <DropdownItem key="no">No</DropdownItem>
                                      
                                  </DropdownMenu>
                              </Dropdown>   
                 
                        <div className=" m-2">
                            <Chip color="warning" variant="bordered">Candidato: </Chip> 
                                
                            </div>
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

                      <div className="flex justify-center items-center">
                            
                            <div className="flex-grow-0">
                            <Chip color="primary" variant="bordered">Recursos humanos: </Chip> 
                            </div>

                            <div className="m-2 flex-grow-2">
                              <Dropdown>
                                <DropdownTrigger>
                                    <Button 
                                      variant="flat"
                                      className="capitalize"
                                    >
                                      {selectedValueR}
                                    </Button>
                                  </DropdownTrigger>
                                  <DropdownMenu 
                                    aria-label="Single selection actions"
                                    variant="flat"
                                    disallowEmptySelection
                                    selectionMode="single"
                                    selectedKeys={selectedKeysR}
                                    onSelectionChange={setSelectedKeysR}
                                  >

                                  {statusOptionsR.map((column) => (
                                    <DropdownItem key={column.name} className="capitalize">
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                    ))}
                                      
                                  </DropdownMenu>
                              </Dropdown>  
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
    handleAgregar,
    isOpenModal2,
    onOpenChangeModal2,
    selectedKeys,
    selectedValue,
    selectedKeysB,
    selectedKeysR,
    selectedValueB, 
    selectedValueR
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
        <TableRow key={item.sol_id}>
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
              <div className="flex justify-between items-center">
                <div className="m-2">
        
                    <Chip color="success" variant="bordered">Aprobación: </Chip> 
                            
                </div>
                      <Dropdown>
                        <DropdownTrigger>
                            <Button 
                              variant="flat"
                              className="capitalize"
                            >
                              {selectedValueB}
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu 
                            aria-label="Single selection actions"
                            variant="flat"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedKeysB}
                            onSelectionChange={setSelectedKeysB}
                          >

                          <DropdownItem key="si">Si</DropdownItem>
                          <DropdownItem key="no">No</DropdownItem>
                              
                          </DropdownMenu>
                      </Dropdown>   
          
                <div className=" m-2">
                    <Chip color="warning" variant="bordered">Candidato: </Chip> 
                        
                    </div>
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

              <div className="flex justify-center items-center">
                    
                    <div className="flex-grow-0">
                    <Chip color="primary" variant="bordered">Recursos humanos: </Chip> 
                    </div>

                    <div className="m-2 flex-grow-2">
                      <Dropdown>
                        <DropdownTrigger>
                            <Button 
                              variant="flat"
                              className="capitalize"
                            >
                              {selectedValueR}
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu 
                            aria-label="Single selection actions"
                            variant="flat"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedKeysR}
                            onSelectionChange={setSelectedKeysR}
                          >

                          {statusOptionsR.map((column) => (
                            <DropdownItem key={column.name} className="capitalize">
                                {capitalize(column.name)}
                            </DropdownItem>
                            ))}
                              
                          </DropdownMenu>
                      </Dropdown>  
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