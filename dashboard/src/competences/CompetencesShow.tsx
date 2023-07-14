import {
  ArrayField,
  ChipField,
  Datagrid,
  ReferenceArrayField,
  ReferenceManyField,
  Show,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
} from "react-admin";

export const CompetencesShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="title" label="resources.competence.title" />
        <TextField source="desc" label="resources.competence.description" />
        <ReferenceArrayField label="Concepts" reference="concepts" source="concepts" />
      </SimpleShowLayout>
    </Show>
  );
};
