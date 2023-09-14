import {
  List,
  TextField,
  TopToolbar,
  useRedirect,
  useRecordContext,
  useGetRecordId,
  SimpleForm,
  Toolbar,
  SaveButton,
  TextInput,
  useTranslate,
  useStore,
  useGetOne,
  SaveContextProvider,
  useUpdate,
  Datagrid,
  ResourceContextProvider,
  Button,
  Empty,
} from "react-admin";
import { useParams } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Card } from "@mui/material";

const PostEditActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/scenarios/d/${domainId}/s/${recordId}/learners`;
  const redirect = useRedirect();
  if (!recordId) return null;
  return (
    <>
      <TopToolbar
        sx={{
          alignItems: "center",
        }}
      >
        <Button
          color="primary"
          onClick={() => redirect(to)}
          label="ra.action.show"
        >
          <VisibilityIcon />
        </Button>
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
  const [selectedIds, setSelectedIds] = useStore(
    "scenario-learners.selectedIds"
  );

  // get the learning scenario
  const { data: scenario } = useGetOne("scenarios", {
    id: learningScenarioId,
  });

  useLayoutEffect(() => {
    return () => {
      setSelectedIds([]);
    };
  }, []);

  useEffect(() => {
    setSelectedIds(scenario?.learners);
  }, [scenario]);

  // save
  const save = (data: any) => {
    const previousData = scenario;
    const currentData = { ...previousData };
    currentData.learners = selectedIds;

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

  const postFilters = [
    <TextInput
      label="ra.action.search"
      source="text"
      sx={{
        "& .MuiFormHelperText-root": {
          display: "none",
        },
      }}
      alwaysOn
    />,
  ];

  return (
    <ResourceContextProvider value="scenario-learners">
      <Card
        sx={{
          marginTop: "2rem",
        }}
      >
        <SaveContextProvider
          value={{ save, saving: false, mutationMode: "pessimistic" }}
        >
          <SimpleForm
            toolbar={<EditToolbar />}
            sx={{
              "& .MuiStack-root": { alignItems: "stretch" },
            }}
          >
            <List
              //empty={<Empty />}
              actions={<PostEditActions />}
              filters={postFilters}
              queryOptions={{
                meta: { domainId: params.domainId },
              }}
              sx={{
                justifyContent: "center",
                "& .RaList-actions": {
                  marginBottom: "3rem",
                  alignItems: "center",
                },
              }}
              title={<Title />}
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
                <span> </span>
                <TextField
                  source="lastname"
                  label="resources.learners.lastname"
                />
                <span> </span>
                <TextField source="email" label="resources.learners.email" />
                <TextField
                  source="nickname"
                  label="resources.learners.nickname"
                />
              </Datagrid>
            </List>
          </SimpleForm>
        </SaveContextProvider>
      </Card>
    </ResourceContextProvider>
  );
};
