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
  Button,
  useRedirect,
  useRecordContext,
  ResourceContextProvider,
  BooleanField,
  Link,
  useListContext,
  BulkDeleteButton,
  Labeled,
  DatagridProps,
  DatagridBodyProps,
  DatagridBody,
  DatagridRowProps,
  RecordContextProvider,
  FieldProps,
} from "react-admin";
import { DOMAIN_URL_PARAM, SCENARIO_URL_PARAM } from "../constants";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button as MuiButton,
  Chip,
  TableCell,
  TableRow,
  Checkbox,
} from "@mui/material";
import React from "react";

const ListActions = () => {
  const params = useParams();
  const domainId = params.domainId;

  return (
    <TopToolbar>
      <CreateScenarioButton />
      <ExportButton meta={{ domainId }} />
    </TopToolbar>
  );
};

const LearningScenarioFilters = [
  <TextInput label="ra.action.search" source="name" alwaysOn />,
];

const PostBulkActionButtons = () => {
  const translate = useTranslate();
  const listContext = useListContext();

  const selectedIdsCount = listContext.selectedIds.length;
  const resourceName = translate(
    `resources.learningScenarios.${
      selectedIdsCount === 1 ? "singular" : "plural"
    }`
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

const CustomDatagridRow = ({
  record,
  id,
  onToggleItem,
  children,
  selected,
}: DatagridRowProps) => {
  const translate = useTranslate();

  if (id) {
    return (
      <RecordContextProvider value={record}>
        <TableRow>
          <TableCell sx={{ padding: "0 12px 0 16px" }}>
            <Checkbox
              checked={selected}
              onClick={(event) => {
                if (onToggleItem) {
                  onToggleItem(id, event);
                }
              }}
              sx={{ padding: "0" }}
            />
          </TableCell>

          {React.Children.map(children, (field) => {
            if (React.isValidElement<FieldProps>(field) && field.props.source) {
              if (record && field.props.source === "publicScenario") {
                const fieldValue = record[field.props.source];
                const publicScenarioChipLabel = fieldValue
                  ? translate(
                      "resources.learningScenarios.publicScenarioOption.public"
                    )
                  : translate(
                      "resources.learningScenarios.publicScenarioOption.private"
                    );

                return (
                  <TableCell key={`${id}-${field.props.source}`}>
                    <Chip label={publicScenarioChipLabel} />
                  </TableCell>
                );
              } else if (record && field.props.source === "running") {
                const fieldValue = record[field.props.source];
                const runningChipLabel = fieldValue
                  ? translate(
                      "resources.learningScenarios.statusOption.inProgress"
                    )
                  : translate(
                      "resources.learningScenarios.statusOption.toStart"
                    );

                return (
                  <TableCell key={`${id}-${field.props.source}`}>
                    <Chip
                      label={runningChipLabel}
                      color={fieldValue ? "success" : "error"}
                      className="chip"
                    />
                  </TableCell>
                );
              } else {
                return (
                  <TableCell key={`${id}-${field.props.source}`}>
                    {field}
                  </TableCell>
                );
              }
            } else return null;
          })}

          <TableCell
            sx={{
              width: "8rem",
            }}
          >
            <EditScenarioButton />
          </TableCell>

          <TableCell
            sx={{
              width: "8rem",
            }}
          >
            <ShowScenarioButton />
          </TableCell>
        </TableRow>
      </RecordContextProvider>
    );
  } else return null;
};

const CustomDatagridBody = (props: DatagridBodyProps) => (
  <DatagridBody {...props} row={<CustomDatagridRow />} />
);

const CustomDatagrid = (props: DatagridProps) => {
  const { isLoading } = useListContext();

  return (
    <>
      {!isLoading && (
        <Datagrid
          {...props}
          body={<CustomDatagridBody />}
          bulkActionButtons={<PostBulkActionButtons />}
        />
      )}
    </>
  );
};

export const LearningScenarioList = () => {
  const params = useParams();
  const domainId = params.domainId;

  return (
    <ResourceContextProvider value="scenarios">
      <List
        empty={<Empty />}
        actions={<ListActions />}
        //filters={LearningScenarioFilters}
        queryOptions={{ meta: { domainId } }}
        title="titlePages.learningScenarios.list"
        sx={{ justifyContent: "center" }}
      >
        <CustomDatagrid
          sx={{
            "& .RaBulkActionsToolbar-topToolbar": {
              backgroundColor: "initial",
            },
          }}
        >
          <TextField source="title" label="resources.learningScenarios.title" />
          <TextField
            source="desc"
            label="resources.learningScenarios.description"
          />
          <TextField
            source="language"
            label="resources.learningScenarios.language"
          />
          <TextField
            source="publicScenario"
            label="resources.learningScenarios.publicScenario"
          />
          <TextField
            source="running"
            label="resources.learningScenarios.status"
          />
          <TextField></TextField>
          <TextField></TextField>
        </CustomDatagrid>
      </List>
    </ResourceContextProvider>
  );
};

const EditScenarioButton = () => {
  // const translate = useTranslate();
  const redirect = useRedirect();
  const record = useRecordContext();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/scenarios/d/${domainId}/s/${record.id}/element/edit`;
  if (!record) return null;
  return (
    <>
      <EditButton to={to}></EditButton>
    </>
  );
};

const ShowScenarioButton = () => {
  // const translate = useTranslate();
  const redirect = useRedirect();
  const record = useRecordContext();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/scenarios/d/${domainId}/s/${record.id}/element`;
  if (!record) return null;
  return (
    <>
      <ShowButton to={to}></ShowButton>
    </>
  );
};

const CreateScenarioButton = () => {
  const record = useRecordContext();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/scenarios/d/${domainId}/create`;
  return (
    <>
      <CreateButton to={to}></CreateButton>
    </>
  );
};

const Empty = () => {
  const params = useParams();
  const domainId = params.domainId;
  const translate = useTranslate();
  const to = `/scenarios/d/${domainId}/create`;

  return (
    <Box display="flex" alignItems="start" textAlign="center" mt={10}>
      <Card>
        <CardContent sx={{ padding: "33px !important" }}>
          <Typography variant="h4" paragraph>
            {translate("resources.learningScenarios.empty")}
          </Typography>
          <Typography variant="body1">
            {translate("resources.learningScenarios.addOne")}
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
