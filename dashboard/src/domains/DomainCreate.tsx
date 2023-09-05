import { BackButton } from "@dslab/ra-back-button";
import {
  Create,
  SimpleForm,
  TextInput,
  required,
  useTranslate,
} from "react-admin";

export const DomainCreate = () => {
  const translate = useTranslate();
  return (
    <>
      <Create redirect="list" title="titlePages.domains.create">
        <BackButton />
        <SimpleForm>
          <TextInput source="title" validate={[required()]} fullWidth label="resources.domains.title" />
        </SimpleForm>
      </Create>
    </>
  );
};
