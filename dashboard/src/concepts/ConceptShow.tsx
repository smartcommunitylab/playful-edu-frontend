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
import { useSearchParams } from "react-router-dom";
import { DOMAIN_URL_PARAM } from "../constants";
import { BackButton } from "@smartcommunitylab/ra-back-button";

const PostShowActions = () => {
  const recordId = useGetRecordId();
  const [searchParams, setSearchParams] = useSearchParams();
  const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const to = `/concepts/${recordId}/edit?${DOMAIN_URL_PARAM}=${domainId}`;
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
    <Show actions={<PostShowActions />}>
      <BackButton />
      <SimpleShowLayout>
        <TextField source="title" />
      </SimpleShowLayout>
    </Show>
  );
};
