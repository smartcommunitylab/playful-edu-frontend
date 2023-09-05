import {
  EditButton,
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
  useGetRecordId,
  useRecordContext,
  useRedirect,
} from "react-admin";
import { useParams } from "react-router-dom";
import { DOMAIN_URL_PARAM } from "../constants";
import { BackButton } from "@dslab/ra-back-button";
import { Title } from "../Title";

const PostShowActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/concepts/d/${domainId}/${recordId}/edit`;
  if (!recordId) return null;
  return (
    <>
      <TopToolbar>
        <EditButton to={to}></EditButton>
      </TopToolbar>
    </>
  );
};

export const ConceptShow = () => {
  return (
    <Show
      actions={<PostShowActions />}
      title={<Title translationKey="titlePages.concepts.show" />}
    >
      <BackButton />
      <SimpleShowLayout>
        <TextField source="title" label="resources.concepts.title" />
      </SimpleShowLayout>
    </Show>
  );
};
