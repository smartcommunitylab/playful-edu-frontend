import {
  List,
  Datagrid,
  TextField,
  TopToolbar,
  CreateButton,
  ExportButton,
  EditButton,
  ShowButton,
  TextInput,
  useTranslate,
  useStore,
  useRedirect,
  useRecordContext,
  BooleanField,
  Button,
  ResourceContextProvider,
  SelectField,
  ReferenceArrayField,
  ChipField,
  SingleFieldList,
  ReferenceField,
  Link,
  FunctionField,
  useListContext,
  BulkDeleteButton,
} from "react-admin";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button as MuiButton,
} from "@mui/material";
import { useEffect, useLayoutEffect } from "react";
import { useModuleContex } from "../modules/ModuleContext";

const ListActions = (props: {
  learningModuleId: string;
  learningFragmentId: string;
}) => {
  const listContext = useListContext();

  return listContext.data?.length > 0 ? (
    <TopToolbar sx={{ minHeight: "48px !important" }}>
      <CreateActivityButton
        learningModuleId={props.learningModuleId}
        learningFragmentId={props.learningFragmentId}
      />
      <ExportButton />
    </TopToolbar>
  ) : null;
};

// const ActivityFilters = [<TextInput label="ra.action.search" source="title" alwaysOn />];

const PostBulkActionButtons = () => {
  const translate = useTranslate();
  const listContext = useListContext();

  const selectedIdsCount = listContext.selectedIds.length;
  const resourceName = translate(
    `resources.activities.${selectedIdsCount === 1 ? "singular" : "plural"}`
  );

  const title = translate("ra.message.bulk_delete_title", {
    name: resourceName,
    smart_count: selectedIdsCount,
  });

  const content = translate("ra.message.bulk_delete_content", {
    name: resourceName,
    smart_count: selectedIdsCount,
  });

  return (
    <BulkDeleteButton
      mutationMode="pessimistic"
      confirmTitle={title}
      confirmContent={content}
    />
  );
};

export const ActivityList = (props: {
  edit: boolean;
  learningModuleId: any;
  learningFragmentId: any;
}) => {
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = props.learningModuleId
    ? props.learningModuleId
    : params.learningModuleId;
  const learningFragmentId = props.learningFragmentId
    ? props.learningFragmentId
    : params.id;
  const title = " ";

  return (
    <div id="activitiesBox">
      <ResourceContextProvider value="activities">
        <List
          empty={
            <Empty
              learningModuleId={learningModuleId}
              learningFragmentId={learningFragmentId}
            />
          }
          actions={
            props.edit ? (
              <ListActions
                learningModuleId={learningModuleId}
                learningFragmentId={learningFragmentId}
              />
            ) : (
              <></>
            )
          }
          // filters={ActivityFilters}
          queryOptions={{
            meta: {
              domainId,
              learningScenarioId,
              learningModuleId,
              learningFragmentId,
            },
          }}
          title={title}
          sx={{
            justifyContent: "center",
            width: "100%",
            "& .RaList-actions": {
              minHeight: props.edit ? "48px" : "0",
            },
            padding: "1rem",
            "& .RaList-content": {
              boxShadow: "none",
            },
          }}
          pagination={false}
        >
          <ActivityDatagrid
            edit={props.edit}
            learningModuleId={learningModuleId}
            learningFragmentId={learningFragmentId}
          />
        </List>
      </ResourceContextProvider>
    </div>
  );
};

const ActivityDatagrid = (props: {
  edit: boolean;
  learningModuleId: string;
  learningFragmentId: string;
}) => {
  const record = useRecordContext();
  const translate = useTranslate();
  const bulkActionButtons = props.edit ? <PostBulkActionButtons /> : false;
  const { data, onUnselectItems, isLoading, isFetching } = useListContext();
  const { updateXArrow, setIsLoadingActivities } = useModuleContex();

  useEffect(() => {
    return () => {
      onUnselectItems();
    };
  }, [data]);

  useLayoutEffect(() => {
    if (!isFetching) {
      updateXArrow();
    }
  }, [isFetching]);

  useLayoutEffect(() => {
    setIsLoadingActivities(isLoading);
  }, [isLoading]);

  return (
    <Datagrid
      bulkActionButtons={bulkActionButtons}
      sx={{
        "& .RaBulkActionsToolbar-topToolbar": {
          backgroundColor: "initial",
        },
        "& .RaDatagrid-table": {
          borderCollapse: "separate",
        },
      }}
      className="fragments-activities-table"
    >
      <TextField
        source="title"
        label="resources.activities.title"
        sortable={false}
      />
      <TextField
        source="desc"
        label="resources.activities.description"
        sortable={false}
      />
      <FunctionField
        label="resources.activities.type"
        render={(record: any) =>
          record && record.type
            ? translate("resources.activities.typeSelection." + record.type)
            : ""
        }
      />
      {record && record.type === "abstr" && (
        <ReferenceArrayField
          label="Concepts"
          reference="concepts"
          source="concepts"
        >
          <SingleFieldList linkType={false}>
            <ChipField source="title" />
          </SingleFieldList>
        </ReferenceArrayField>
      )}
      {record && record.type === "group" && (
        <TextField source="groupCorreletator" />
      )}
      {record && record.type === "concrete" && (
        <ReferenceField
          source="externalActivityId"
          reference="xternal-activities"
        >
          <TextField source="title" />
          <TextField source="desc" />
        </ReferenceField>
      )}
      <EditActivityButton
        learningModuleId={props.learningModuleId}
        learningFragmentId={props.learningFragmentId}
      />
      <ShowActivityButton
        learningModuleId={props.learningModuleId}
        learningFragmentId={props.learningFragmentId}
      />
    </Datagrid>
  );
};

const EditActivityButton = (props: {
  learningModuleId: string;
  learningFragmentId: string;
}) => {
  const record = useRecordContext();
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = props.learningModuleId;
  const learningFragmentId = props.learningFragmentId;

  const to = `/activities/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${learningFragmentId}/a/${record.id}/edit`;
  if (!record) return null;
  return (
    <>
      <EditButton to={to}></EditButton>
    </>
  );
};

const ShowActivityButton = (props: {
  learningModuleId: string;
  learningFragmentId: string;
}) => {
  const record = useRecordContext();
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = props.learningModuleId;
  const learningFragmentId = props.learningFragmentId;

  const to = `/activities/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${learningFragmentId}/a/${record.id}`;
  if (!record) return null;
  return (
    <>
      <ShowButton to={to}></ShowButton>
    </>
  );
};

const CreateActivityButton = (props: {
  learningModuleId: string;
  learningFragmentId: string;
}) => {
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = props.learningModuleId;
  const learningFragmentId = props.learningFragmentId;

  const to = `/activities/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${learningFragmentId}/a/create`;
  return (
    <>
      <CreateButton to={to}></CreateButton>
    </>
  );
};

const Empty = (props: {
  learningModuleId: string;
  learningFragmentId: string;
}) => {
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = props.learningModuleId;
  const learningFragmentId = props.learningFragmentId;
  const translate = useTranslate();
  const to = `/activities/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${learningFragmentId}/a/create`;
  const { isLoading, isFetching } = useListContext();
  const { updateXArrow, setIsLoadingActivities } = useModuleContex();

  useLayoutEffect(() => {
    if (!isFetching) {
      updateXArrow();
    }
  }, [isFetching]);

  useLayoutEffect(() => {
    setIsLoadingActivities(isLoading);
  }, [isLoading]);

  return (
    <Box display="flex" alignItems="start" textAlign="center">
      <div style={{ padding: "24px" }}>
        <Typography variant="h4" paragraph>
          {translate("resources.activities.empty")}
        </Typography>
        <Typography variant="body1">
          {translate("resources.activities.addOne")}
        </Typography>

        <Box mt={3}>
          <Link to={to}>
            <MuiButton color="primary" variant="contained">
              {translate("ra.action.create")}
            </MuiButton>
          </Link>
        </Box>
      </div>
    </Box>
  );
};
