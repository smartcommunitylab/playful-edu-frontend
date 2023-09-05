import {
  Datagrid,
  TextField,
  TopToolbar,
  EditButton,
  ReferenceArrayField,
  Show,
  useGetRecordId,
  List,
  Pagination,
  useTranslate,
  useRecordContext,
} from "react-admin";
import { useParams } from "react-router-dom";

const PostShowActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/scenarios/d/${domainId}/s/${recordId}/learners/edit`;
  if (!recordId) return null;
  return (
    <>
      <TopToolbar>
        <EditButton to={to}></EditButton>
      </TopToolbar>
    </>
  );
};

export const LearningScenarioLearnerShow = () => {
  const params = useParams();

  return (
    <Show actions={<PostShowActions />} title="titlePages.learningScenarios.learners.show">
      <ReferenceArrayField
        label="Learners"
        reference="learners"
        source="learners"
        pagination={<Pagination />}
      >
        <Datagrid bulkActionButtons={false}>
          <TextField source="firstname" label="resources.learners.firstname" />
          <span> </span>
          <TextField source="lastname" label="resources.learners.lastname" />
          <span> </span>
          <TextField source="email" label="resources.learners.email" />
          <TextField source="nickname" label="resources.learners.nickname" />
        </Datagrid>
      </ReferenceArrayField>
    </Show>
  );
};
