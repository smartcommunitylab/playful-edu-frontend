import {
  Datagrid,
  TextField,
  TopToolbar,
  EditButton,
  ReferenceArrayField,
  Show,
  useGetRecordId,
  Pagination,
  useGetOne,
  useGetMany,
  useList,
  ListContextProvider,
  Title,
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
  const learningScenarioId = params.id;

  const { data: scenario } = useGetOne("scenarios", {
    id: learningScenarioId,
  });

  const { data, isLoading } = useGetMany("learners", {
    ids: scenario?.learners,
  });

  const listContext = useList({ data, isLoading });

  return (
    <ListContextProvider value={listContext}>
      <Show
        actions={<PostShowActions />}
        title="titlePages.learningScenarios.learners.show"
      >
        <Datagrid bulkActionButtons={false}>
          <TextField source="firstname" label="resources.learners.firstname" />
          <TextField source="lastname" label="resources.learners.lastname" />
          <TextField source="email" label="resources.learners.email" />
          <TextField source="nickname" label="resources.learners.nickname" />
        </Datagrid>
      </Show>
      <Pagination />
    </ListContextProvider>
  );

  // return (
  //   <Show
  //     actions={<PostShowActions />}
  //     title="titlePages.learningScenarios.learners.show"
  //   >
  //     <ReferenceArrayField
  //       label="Learners"
  //       reference="learners"
  //       source="learners"
  //       pagination={<Pagination /> }
  //     >
  //       <Datagrid bulkActionButtons={false}>
  //         <TextField source="firstname" label="resources.learners.firstname" />
  //         <span> </span>
  //         <TextField source="lastname" label="resources.learners.lastname" />
  //         <span> </span>
  //         <TextField source="email" label="resources.learners.email" />
  //         <TextField source="nickname" label="resources.learners.nickname" />
  //       </Datagrid>
  //     </ReferenceArrayField>
  //   </Show>
  // );
};
