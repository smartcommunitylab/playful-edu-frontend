import {
  ArrayField,
  ChipField,
  Datagrid,
  EditButton,
  ReferenceArrayField,
  ReferenceManyField,
  Show,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
  TopToolbar,
  useGetRecordId,
  useRecordContext,
  useRedirect,
} from "react-admin";
import { DOMAIN_URL_PARAM } from "../constants";
import { useParams } from 'react-router-dom';
import { BackButton } from "@smartcommunitylab/ra-back-button";

const PostShowActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId =params.domainId;
  const to=`/competences/d/${domainId}/${recordId}/edit`;
  if (!recordId)
      return null;
  return (
      <>
          <TopToolbar>
              <EditButton  to={to}></EditButton>
          </TopToolbar>
          </>
      )
};
export const CompetencesShow = () => {
  return (
      <Show actions={<PostShowActions />}>
        <BackButton />
      <SimpleShowLayout>
        <TextField source="title" label="resources.competence.title" />
        <TextField source="desc" label="resources.competence.description" />
        <TextField source="type" label="resources.competence.type" />
        <ReferenceArrayField label="Concepts" reference="concepts" source="concepts" >
                 <Datagrid>
                    <TextField source="title" />
                </Datagrid>
          </ReferenceArrayField>
      </SimpleShowLayout>
    </Show>
  );
};
