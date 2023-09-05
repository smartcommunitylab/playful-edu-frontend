import {
  EditButton,
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
  useGetRecordId,
  useRecordContext,
  useRedirect,
  useTranslate,
} from "react-admin";
import { useParams } from "react-router-dom";
import { DOMAIN_URL_PARAM } from "../constants";
import { BackButton } from "@dslab/ra-back-button";

const PostShowActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const to = `/educators/d/${params.domainId}/${recordId}/edit`;
  if (!recordId) return null;
  return (
    <>
      <TopToolbar>
        <EditButton to={to}></EditButton>
      </TopToolbar>
    </>
  );
};

const Title = () => {
  const translate = useTranslate();
  const record = useRecordContext();
  const fullName = record
    ? '"' +
      record.firstname +
      (record.lastname ? " " + record.lastname : "") +
      '"'
    : "";
  const title = translate("titlePages.educators.show") + " " + fullName;

  return title;
};

export const EducatorShow = () => {
  return (
    <Show actions={<PostShowActions />} title={<Title />}>
      <BackButton />
      <SimpleShowLayout>
        <TextField source="firstname" label="resources.educators.firstname" />
        <TextField source="lastname" label="resources.educators.lastname"/>
        <TextField source="email" label="resources.educators.email"/>
        <TextField source="nickname" label="resources.educators.nickname"/>
      </SimpleShowLayout>
    </Show>
  );
};
