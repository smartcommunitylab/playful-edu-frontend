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
  ReferenceArrayInput,
  SimpleForm,
  Toolbar,
  DeleteButton,
  SaveButton,
  SelectArrayInput,
  AutocompleteArrayInput,
  CheckboxGroupInput,
  TextInput,
  SelectInput,
  useTranslate,
  useGetList,
  useStore,
  useGetMany,
  useList,
  ListContextProvider,
  Pagination,
  useGetOne,
  ReferenceInput,
  BulkUpdateButton,
  SaveContextProvider,
  useUpdate,
  useRecordSelection,
  FilterForm,
  useListFilterContext,
} from "react-admin";
import { useParams } from "react-router-dom";
import { useWatch } from "react-hook-form";
import { useEffect, useLayoutEffect, useState } from "react";

export const InfoLearner = () => {
  const params = useParams();

  return (
    <>
      <TextField source="firstname" fullWidth />
      <TextField source="lastname" fullWidth />
      <TextField source="email" fullWidth />
      <TextField source="nickname" fullWidth />
    </>
  );
};

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

// const FullNameField = () => {
//   const record = useRecordContext();
//   const translate = useTranslate();

//   return (
//     <>
//       <div>
//         {translate("resources.learners.firstname")}: <b>{record.firstname} </b>{" "}
//         &nbsp;
//         {translate("resources.learners.lastname")}: <b>{record.lastname}</b>{" "}
//         &nbsp;
//         {translate("resources.learners.email")}: <b>{record.email}</b> &nbsp;
//         {translate("resources.learners.nickname")}: <b>{record.nickname}</b>
//       </div>
//     </>
//   );
// };

// const ReferenceLearnerInput = (props: any) => {
//   const nameLearner = useWatch({ name: "name" });
//   // const perPageLearner = useWatch({ name: 'perPage' });
//   // const pageLearner = useWatch({ name: 'page' });
//   const params = useParams();
//   const domainId = params.domainId;

//   const { total } = useGetList("learners", {
//     meta: { domainId },
//   });

//   return (
//     <ReferenceArrayInput
//       source="learners"
//       reference="learners"
//       perPage={total}
//       // perPage={perPageLearner}
//       // page={pageLearner}
//       sort={{ field: "id", order: "ASC" }}
//       queryOptions={{ meta: { domainId, text: nameLearner } }}
//     >
//       <CheckboxGroupInput
//         row={false}
//         optionText={<FullNameField />}
//         label="resources.learningScenarios.learners.title"
//       />
//     </ReferenceArrayInput>
//   );
// };

const Title = () => {
  const translate = useTranslate();
  const record = useRecordContext();
  const recordTitle = record ? '"' + record.title + '"' : "";
  const title = translate("titlePages.learningScenarios.learners.edit", {
    name: recordTitle,
  });

  return title;
};

// export const LearningScenarioLearnerEdit = () => {
//   const params = useParams();
//   const domainId = params.domainId;
//   const learningScenarioId = params.id;
//   const redirect = useRedirect();

//   const onSuccess = () => {
//     redirect(`/scenarios/d/${domainId}/s/${learningScenarioId}/learners`);
//   };

//   return (
//     <Edit
//       mutationOptions={{ onSuccess }}
//       actions={<PostEditActions />}
//       transform={(data: any) => ({ ...data, domainId })}
//       mutationMode="pessimistic"
//       title={<Title />}
//     >
//       <SimpleForm toolbar={<EditToolbar />}>
//         <TextInput source="name" label="ra.action.search" />
//         <ReferenceLearnerInput />
//       </SimpleForm>
//     </Edit>
//   );
// };

const PostBulkActionButtons = () => <></>;

const PostEditActions = (props: { onFilterChange: any }) => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/scenarios/d/${domainId}/s/${recordId}/learners`;
  if (!recordId) return null;
  return (
    <>
      <TopToolbar
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <SimpleForm toolbar={false}>
          <TextInput
            label="ra.action.search"
            source="text"
            onChange={(e) => props.onFilterChange(e.target.value)}
          />
        </SimpleForm>
        <ShowButton to={to}></ShowButton>
      </TopToolbar>
    </>
  );
};

export const LearningScenarioLearnerEdit = () => {
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.id;
  const redirect = useRedirect();
  const [update] = useUpdate();
  const [filter, setFilter] = useState("");

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
    filterCallback: (filterValues: any) => {
      console.log("filter", filter);
      const c = filter;
      console.log("call filterCallback");
      return filterValues;
    },
  });

  useEffect(() => {
    const obj = {
      page: listContext.page,
      perPage: listContext.perPage,
      sort: listContext.sort.field,
      order: listContext.sort.order,
      filter: { text: "" },
    };

    setListParams(obj);
    console.log("listContext", listContext);
  }, [
    listContext.perPage,
    listContext.page,
    listContext.sort,
    listContext.filterValues,
  ]);

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

  function handleFilterChange(filterValues: any) {
    console.log("handleFilterChange", filterValues);
    setFilter(filterValues);
  }

  return (
    <ListContextProvider value={listContext}>
      <Edit
        actions={<PostEditActions onFilterChange={handleFilterChange} />}
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
