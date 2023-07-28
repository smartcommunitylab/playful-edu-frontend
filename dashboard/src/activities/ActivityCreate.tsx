import {
  BooleanInput,
  Create,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
  useRecordContext,
} from "react-admin";
import { useSearchParams } from "react-router-dom";
import { DOMAIN_URL_PARAM } from "../constants";
import { BackButton } from "@smartcommunitylab/ra-back-button";

export const ActivityCreate = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const record = useRecordContext();

  return (
    <Create redirect="list" transform={(data: any) => ({ ...data, domainId })}>
      <BackButton />
      <SimpleForm>
        <TextInput source="title" validate={[required()]} fullWidth />
        <TextInput source="desc" />
        <BooleanInput source="group" />
        <SelectInput
          source="type"
          choices={[
            { id: "concrete", name: "Concreta" },
            { id: "abstract", name: "Astratta" },
          ]}
        />
        {record.type && record.type == "concrete" && (
          <TextInput source="concrete" />
        )}
        {record.type && record.type == "abstract" && (
          <TextInput source="abstract" />
        )}
      </SimpleForm>
    </Create>
  );
};
