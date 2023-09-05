import {
  EditButton,
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
  useGetRecordId,
  useRecordContext,
  useTranslate,
} from "react-admin";
import { useParams } from "react-router-dom";
import { BackButton } from "@dslab/ra-back-button";

const PostShowActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/learners/d/${domainId}/${recordId}/edit`;
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
  const title = translate("titlePages.learners.show") + " " + fullName;

  return title;
};

export const LearnerShow = () => {
  return (
    <Show actions={<PostShowActions />} title={<Title />}>
      <BackButton />
      <SimpleShowLayout>
        <TextField source="firstname" label="resources.learners.firstname"/>
        <TextField source="lastname" label="resources.learners.lastname"/>
        <TextField source="email" label="resources.learners.email"/>
        <TextField source="nickname" label="resources.learners.nickname"/>
      </SimpleShowLayout>
    </Show>
  );
};
