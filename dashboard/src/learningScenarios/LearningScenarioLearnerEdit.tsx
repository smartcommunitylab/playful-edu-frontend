import {
  List,
  Datagrid,
  TextField,
  TopToolbar,
  ShowButton,
  useRedirect,
  useRecordContext,
  useGetRecordId,
  Edit,
  SimpleForm,
  Toolbar,
  SaveButton,
  TextInput,
  useTranslate,
  useGetList,
  useStore,
  useList,
  ListContextProvider,
  Pagination,
  useGetOne,
  SaveContextProvider,
  useUpdate,
} from "react-admin";
import { useParams } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";

const PostEditActions = (props: {
  onTextFilterChange: any;
  defaultValue: string;
}) => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/scenarios/d/${domainId}/s/${recordId}/learners`;
  if (!recordId) return null;
  return (
    <>
      <TopToolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        <SimpleForm
          toolbar={false}
          sx={{
            padding: "0 !important",
          }}
        >
          <TextInput
            label="ra.action.search"
            source="text"
            onChange={(e) => props.onTextFilterChange(e.target.value)}
            defaultValue={props.defaultValue}
            sx={{
              "& .MuiFormHelperText-root": {
                display: "none",
              },
            }}
          />
        </SimpleForm>
        <ShowButton to={to}></ShowButton>
      </TopToolbar>
    </>
  );
};

const PostBulkActionButtons = () => <></>;

const EditToolbar = (props: any) => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/scenarios/d/${domainId}/s/${recordId}/learners`;

  return (
    <Toolbar {...props}>
      <SaveButton alwaysEnable />
    </Toolbar>
  );
};

const Title = () => {
  const translate = useTranslate();
  const record = useRecordContext();
  const recordTitle = record ? '"' + record.title + '"' : "";
  const title = translate("titlePages.learningScenarios.learners.edit", {
    name: recordTitle,
  });

  return title;
};

export const LearningScenarioLearnerEdit = () => {
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.id;
  const redirect = useRedirect();
  const [update] = useUpdate();

  const obj = {
    page: 1,
    perPage: 10,
    sort: "id",
    order: "ASC",
    filter: { text: "" },
  };
  const [listParams, setListParams] = useStore(
    "scenarios.learners.edit.listParams",
    obj
  );

  const [textFilter, setTextFilter] = useState(listParams.filter.text);

  // get the total number of learners
  const { total } = useGetList("learners", {
    meta: { domainId },
  });

  // get the learners of the domain
  const { data, isLoading } = useGetList("learners", {
    meta: { domainId },
    pagination: { perPage: total ? total : 0, page: 1 },
  });

  // get the learning scenario
  const { data: scenario } = useGetOne("scenarios", {
    id: learningScenarioId,
  });

  // initialize listContext
  const listContext = useList({
    data,
    isLoading,
    page: listParams.page,
    perPage: listParams.perPage,
    sort: { field: listParams.sort, order: listParams.order },
    filterCallback: (record: any) => {
      const ids =
        listContext.selectedIds.length > 0
          ? listContext.selectedIds
          : scenario?.learners;

      if (ids.includes(record.id)) return true;
      else if (textFilter === "") return true;
      else if (
        record.firstname.toLowerCase().indexOf(textFilter.toLowerCase()) !== -1
      )
        return true;
      else if (
        record.lastname &&
        record.lastname.toLowerCase().indexOf(textFilter.toLowerCase()) !== -1
      )
        return true;
      else if (
        record.email &&
        record.email?.toLowerCase().indexOf(textFilter.toLowerCase()) !== -1
      )
        return true;
      else if (
        record.nickname &&
        record.nickname?.toLowerCase().indexOf(textFilter.toLowerCase()) !== -1
      )
        return true;
      else return false;
    },
  });

  useEffect(() => {
    const obj = {
      page: listContext.page,
      perPage: listContext.perPage,
      sort: listContext.sort.field,
      order: listContext.sort.order,
      filter: { text: textFilter },
    };

    setListParams(obj);
  }, [listContext.perPage, listContext.page, listContext.sort, textFilter]);

  useEffect(() => {
    const ids = scenario?.learners.filter((scenarioLearnerId: any) => {
      if (data?.find((learner: any) => learner.id === scenarioLearnerId)) {
        return scenarioLearnerId;
      }
    });
    listContext.onSelect(ids);
  }, [scenario, data]);

  useEffect(() => {
    const page = listContext.total
      ? listContext.page > Math.ceil(listContext.total / listContext.perPage)
        ? 1
        : listContext.page
      : 1;

    listContext.setPage(page);
  }, []);

  useLayoutEffect(() => {
    return () => {
      listContext.onUnselectItems();
    };
  }, []);

  // save
  const save = (data: any) => {
    const previousData = data;
    const currentData = { ...previousData };
    currentData.learners = listContext.selectedIds;

    update(
      "scenarios",
      {
        id: learningScenarioId,
        data: currentData,
        previousData,
      },
      {
        onSuccess: () => {
          redirect(`/scenarios/d/${domainId}/s/${learningScenarioId}/learners`);
        },
        //onError: () => {},
      }
    );
  };

  function handleTextFilterChange(value: any) {
    setTextFilter(value);

    // call setFilters to trigger filterCallback
    const filters = {};
    const displayedFilters = {};
    listContext.setFilters(filters, displayedFilters);
  }

  return (
    <ListContextProvider value={listContext}>
      <Edit
        actions={
          <PostEditActions
            onTextFilterChange={handleTextFilterChange}
            defaultValue={listParams.filter.text}
          />
        }
        title={<Title />}
      >
        <SaveContextProvider
          value={{ save, saving: false, mutationMode: "pessimistic" }}
        >
          <SimpleForm
            toolbar={<EditToolbar />}
            sx={{
              "& .MuiStack-root": { alignItems: "stretch", marginTop: "3rem" },
            }}
          >
            <Datagrid
              bulkActionButtons={<PostBulkActionButtons />}
              sx={{
                "& .RaBulkActionsToolbar-icon": {
                  display: "none",
                },
              }}
            >
              <TextField
                source="firstname"
                label="resources.learners.firstname"
              />
              <TextField
                source="lastname"
                label="resources.learners.lastname"
              />
              <TextField source="email" label="resources.learners.email" />
              <TextField
                source="nickname"
                label="resources.learners.nickname"
              />
            </Datagrid>
            <Pagination />
          </SimpleForm>
        </SaveContextProvider>
      </Edit>
    </ListContextProvider>
  );
};
