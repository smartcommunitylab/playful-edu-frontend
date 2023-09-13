import { useEffect } from "react";
import {
  Datagrid,
  TextField,
  TopToolbar,
  EditButton,
  Show,
  useGetRecordId,
  Pagination,
  useGetOne,
  useGetMany,
  useList,
  ListContextProvider,
  useStore,
} from "react-admin";
import { useParams } from "react-router-dom";

const PostShowActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/scenario-learners/d/${domainId}/s/${recordId}/edit`;
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

  const obj = {
    page: 1,
    perPage: 10,
    sort: "id",
    order: "ASC",
  };
  const [listParams, setListParams] = useStore(
    "scenarios.learners.show.listParams",
    obj
  );

  // get the learning scenario
  const { data: scenario } = useGetOne("scenarios", {
    id: learningScenarioId,
  });
  // get the learners of the learning scenario
  const { data, isLoading } = useGetMany("learners", {
    ids: scenario?.learners,
  });

  const listContext = useList({
    data,
    isLoading,
    page: listParams.page,
    perPage: listParams.perPage,
    sort: { field: listParams.sort, order: listParams.order },
  });

  useEffect(() => {
    const obj = {
      page: listContext.page,
      perPage: listContext.perPage,
      sort: listContext.sort.field,
      order: listContext.sort.order,
    };
    setListParams(obj);
  }, [listContext.perPage, listContext.page, listContext.sort]);

  useEffect(() => {
    const page = listContext.total
      ? listContext.page > Math.ceil(listContext.total / listContext.perPage)
        ? 1
        : listContext.page
      : 1;
      
    listContext.setPage(page);
  }, []);

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
};
