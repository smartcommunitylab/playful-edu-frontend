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
  useRedirect,
  useRecordContext,
  DateField,
  ResourceContextProvider,
  Link,
  useListContext,
  BulkDeleteButton,
  useGetOne,
} from "react-admin";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button as MuiButton,
} from "@mui/material";
import { useLayoutEffect, useState } from "react";

const ListActions = (props: {
  isScenarioRunning: boolean | undefined;
  isLoading: boolean;
}) => {
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const to = `/modules/d/${domainId}/s/${learningScenarioId}/create`;

  return (
    <>
      {!props.isLoading && (
        <TopToolbar>
          <CreateButton
            to={to}
            disabled={props.isScenarioRunning}
          ></CreateButton>
          <ExportButton meta={{ domainId, learningScenarioId }} />
        </TopToolbar>
      )}
    </>
  );
};

const ModuleFilters = [
  <TextInput label="ra.action.search" source="name" alwaysOn />,
];

const PostBulkActionButtons = (props: {
  isScenarioRunning: boolean | undefined;
}) => {
  const translate = useTranslate();
  const listContext = useListContext();

  const selectedIdsCount = listContext.selectedIds.length;
  const resourceName = translate(
    `resources.modules.${selectedIdsCount === 1 ? "singular" : "plural"}`
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
      disabled={props.isScenarioRunning}
    />
  );
};

export const ModuleList = () => {
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const [isScenarioRunning, setIsScenarioRunning] = useState<
    boolean | undefined
  >(undefined);
  const { data, isLoading } = useGetOne("scenarios", {
    id: learningScenarioId,
  });

  useLayoutEffect(() => {
    if (data) {
      setIsScenarioRunning(data.running);
    }
  }, [data]);

  return (
    <ResourceContextProvider value="modules">
      <List
        empty={<Empty />}
        actions={
          <ListActions
            isScenarioRunning={isScenarioRunning}
            isLoading={isLoading}
          />
        }
        //filters={ModuleFilters}
        queryOptions={{ meta: { domainId, learningScenarioId } }}
        title="titlePages.modules.list"
        sx={{ justifyContent: "center" }}
        pagination={false}
      >
        <Datagrid
          bulkActionButtons={
            <PostBulkActionButtons isScenarioRunning={isScenarioRunning} />
          }
          sx={{
            "& .RaBulkActionsToolbar-topToolbar": {
              backgroundColor: "initial",
            },
            "& .column-undefined": {
              width: "8rem",
            },
          }}
        >
          <TextField
            source="title"
            label="resources.modules.title"
            sortable={false}
          />
          <TextField
            source="desc"
            label="resources.modules.description"
            sortable={false}
          />
          <TextField
            source="level"
            label="resources.modules.level"
            sortable={false}
          />
          <DateField
            source="dateFrom"
            label="resources.modules.dateFrom"
            sortable={false}
          />
          <DateField
            source="dateTo"
            label="resources.modules.dateTo"
            sortable={false}
          />
          <EditModuleButton isScenarioRunning={isScenarioRunning} />
          <ShowModuleButton />
        </Datagrid>
      </List>
    </ResourceContextProvider>
  );
};

const EditModuleButton = (props: {
  isScenarioRunning: boolean | undefined;
}) => {
  const record = useRecordContext();
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const to = `/modules/d/${domainId}/s/${learningScenarioId}/m/${record.id}/edit`;

  if (!record) return null;
  return (
    <>
      <EditButton to={to} disabled={props.isScenarioRunning}></EditButton>
    </>
  );
};

const ShowModuleButton = () => {
  const redirect = useRedirect();
  const record = useRecordContext();
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const to = `/modules/d/${domainId}/s/${learningScenarioId}/m/${record.id}`;

  if (!record) return null;
  return (
    <>
      <ShowButton to={to}></ShowButton>
    </>
  );
};

const Empty = () => {
  const params = useParams();
  const domainId = params.domainId;
  const translate = useTranslate();
  const learningScenarioId = params.learningScenarioId;
  const to = `/modules/d/${domainId}/s/${learningScenarioId}/create`;

  return (
    <Box display="flex" alignItems="start" textAlign="center" mt={10}>
      <Card>
        <CardContent sx={{ padding: "33px !important" }}>
          <Typography variant="h4" paragraph>
            {translate("resources.modules.empty")}
          </Typography>
          <Typography variant="body1">
            {translate("resources.modules.addOne")}
          </Typography>

          <Box mt={3}>
            <Link to={to}>
              <MuiButton color="primary" variant="contained">
                {translate("ra.action.create")}
              </MuiButton>
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
