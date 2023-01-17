import { useState } from "react";
import { CrudModal } from "../components/CrudModal";
import { FabAddNew } from "../components/FabAddNew";
import { List } from "../components/List";
import { Navbar } from "../components/Navbar";

export const CrudPage = () => {

  // const { openModal } = useUiStore();
  const [isOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    title: '',
    notes: ''
  });

  return (
    <>
      <Navbar />
      <CrudModal 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        formValues={formValues}
        setFormValues={setFormValues}
      />

      <List />

      <FabAddNew 
        setIsOpen={setIsOpen}
      />
    </>
  )
}
