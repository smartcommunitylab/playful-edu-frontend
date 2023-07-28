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
import { useSearchParams } from 'react-router-dom';
import { BackButton } from "@smartcommunitylab/ra-back-button";

const PostShowActions = () => {
  const recordId = useGetRecordId();
  const [searchParams, setSearchParams] = useSearchParams();
  const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const to=`/competences/${recordId}/edit?${DOMAIN_URL_PARAM}=${domainId}`;
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
        <ReferenceArrayField label="Concepts" reference="concepts" source="concepts" />
      </SimpleShowLayout>
    </Show>
  );
};
