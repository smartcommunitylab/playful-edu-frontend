import {
  DateField,
  EditButton,
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
  useGetRecordId,
} from "react-admin";
import { useParams } from "react-router-dom";
import { FragmentShow } from "../fragments/FragmentShow";
import { Title } from "../Title";

const PostShowActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const to = `/modules/d/${domainId}/s/${learningScenarioId}/m/${recordId}/edit`;
  if (!recordId) return null;
  return (
    <>
      <TopToolbar>
        <EditButton to={to}></EditButton>
      </TopToolbar>
    </>
  );
};

export const ModuleShow = () => {
  return (
    <Show
      actions={<PostShowActions />}
      title={<Title translationKey="titlePages.modules.show" />}
    >
      <SimpleShowLayout>
        <TextField source="title" label="resources.modules.title" />
        <TextField source="desc" label="resources.modules.description" />
        <TextField source="level" label="resources.modules.level" />
        <DateField source="dateFrom" label="resources.modules.dateFrom" />
        <DateField source="dateTo" label="resources.modules.dateTo" />
      </SimpleShowLayout>
      {/* <FragmentShow /> */}
    </Show>
  );
};
