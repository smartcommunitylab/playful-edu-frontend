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
  useGetRecordId,
  SelectField,
  Link,
  FunctionField,
  useListContext,
  BulkDeleteButton,
  ResourceContextProvider,
} from "react-admin";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button as MuiButton,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Toolbar,
  IconButton,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ModuleContext } from "../modules/ModuleContext";
import Checkbox from "@mui/material/Checkbox";
import CloseIcon from "@mui/icons-material/Close";

const ListActions = () => (
  <TopToolbar sx={{ minHeight: "48px !important", zIndex: "2" }}>
    <CreateFragmentButton />
    <ExportButton />
  </TopToolbar>
);

const FragmentFilters = [
  <TextInput label="ra.action.search" source="name" alwaysOn />,
];

const DeleteButton = () => {
  const translate = useTranslate();
  const listContext = useListContext();

  const selectedIdsCount = listContext.selectedIds.length;
  const resourceName = translate(
    `resources.learningFragments.${
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

export const FragmentList = (props: { edit: boolean }) => {
  const params = useParams();
  const translate = useTranslate();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId
    ? params.learningModuleId
    : params.id;
  const title = " ";

  return (
    <ResourceContextProvider value="fragments">
      <List
        empty={<Empty />}
        actions={props.edit ? <ListActions /> : <></>}
        //filters={FragmentFilters}
        queryOptions={{
          meta: { domainId, learningScenarioId, learningModuleId },
        }}
        title={title}
        pagination={false}
        sx={{
          justifyContent: "center",
          "& .RaList-actions": {
            minHeight: props.edit ? "48px" : "0",
          },
          padding: "1rem",
          "& .RaList-content": {
            boxShadow: "none",
          },
        }}
      >
        <FragmentTable edit={props.edit} />
      </List>
    </ResourceContextProvider>
  );
};

const EditFragmentButton = (props: { record: any }) => {
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId
    ? params.learningModuleId
    : params.id;
  const to = `/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${props.record.id}/edit`;
  if (!props.record) return null;

  return (
    <>
      <EditButton to={to}></EditButton>
    </>
  );
};

const ShowFragmentButton = (props: { record: any }) => {
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId
    ? params.learningModuleId
    : params.id;
  const to = `/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${props.record.id}`;
  if (!props.record) return null;
  return (
    <>
      <ShowButton to={to}></ShowButton>
    </>
  );
};

const CreateFragmentButton = () => {
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId
    ? params.learningModuleId
    : params.id;
  const to = `/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/create`;
  return (
    <>
      <CreateButton to={to}></CreateButton>
    </>
  );
};

const Empty = () => {
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId
    ? params.learningModuleId
    : params.id;
  const translate = useTranslate();
  const to = `/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/create`;

  return (
    <Box display="flex" alignItems="start" textAlign="center">
      <div style={{ padding: "24px" }}>
        <Typography variant="h4" paragraph>
          {translate("resources.learningFragments.empty")}
        </Typography>
        <Typography variant="body1">
          {translate("resources.learningFragments.addOne")}
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

const FragmentTable = (props: { edit: boolean }) => {
  const translate = useTranslate();
  const listContext = useListContext();
  const { onRowClick } = useContext(ModuleContext);
  const data = listContext.data;
  const [isAtLeastOneCheckboxSelected, setIsAtLeastOneCheckboxSelected] =
    useState(listContext.selectedIds.length > 0);

  const handleBodyCheckboxClick = (e: any, id: string) => {
    e.stopPropagation();
    listContext.onToggleItem(id);
  };

  const handleHeaderCheckboxClick = (e: any) => {
    e.stopPropagation();
    if (e.target.checked) {
      const ids = data.map((item: any) => item.id);
      listContext.onSelect(ids);
    } else {
      listContext.onUnselectItems();
    }
  };

  const handleCancelButtonClick = (e: any) => {
    listContext.onUnselectItems();
  };

  useEffect(() => {
    setIsAtLeastOneCheckboxSelected(listContext.selectedIds.length > 0);
  }, [listContext.selectedIds]);

  useEffect(() => {
    return () => {
      if (props.edit) {
        listContext.onUnselectItems();
      }
    };
  }, []);

  return (
    <>
      {props.edit && isAtLeastOneCheckboxSelected && (
        <Toolbar
          sx={{
            position: "absolute",
            top: "-48px",
            backgroundColor: "rgb(217, 237, 253)",
            minHeight: "48px !important",
            width: "100%",
            zIndex: "3",
            alignItems: "center",
            justifyContent: "space-between",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
            // transform: "translateY(-48px)",
            // transition:
            //   "height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,min-height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              sx={{
                marginLeft: "-0.5rem",
                marginRight: "0.5rem",
                padding: "5px",
              }}
              onClick={(e) => handleCancelButtonClick(e)}
            >
              <CloseIcon sx={{ fontSize: "1.25rem" }} />
            </IconButton>
            <Typography variant="subtitle1" color="rgb(25, 118, 210)">
              {translate("ra.action.bulk_actions", {
                smart_count: listContext.selectedIds.length,
              })}
            </Typography>
          </div>

          <div>
            <DeleteButton />
          </div>
        </Toolbar>
      )}

      <Table sx={{ padding: 2 }} className="fragments-table">
        <TableHead>
          <TableRow>
            {props.edit && (
              <TableCell
                sx={{
                  width: "52px",
                }}
              >
                <Checkbox
                  sx={{ padding: "0" }}
                  onClick={(e) => handleHeaderCheckboxClick(e)}
                  checked={listContext.selectedIds.length === listContext.total}
                />
              </TableCell>
            )}
            <TableCell>
              {translate("resources.learningFragments.title")}
            </TableCell>
            <TableCell>
              {translate("resources.learningFragments.type")}
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data &&
            data.map((record: any) => {
              if (!record) return null;
              return (
                <TableRow
                  key={record.id}
                  id={"_" + record.id}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04) !important",
                    },
                  }}
                  onClick={(e) => onRowClick(e, record.id)}
                >
                  {props.edit && (
                    <TableCell
                      sx={{
                        width: "52px",
                      }}
                    >
                      <Checkbox
                        sx={{ padding: "0" }}
                        onClick={(e) => handleBodyCheckboxClick(e, record.id)}
                        checked={
                          listContext.selectedIds.indexOf(record.id) !== -1
                        }
                      />
                    </TableCell>
                  )}

                  <TableCell>
                    <Typography component="span" variant="body2">
                      {record.title}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography component="span" variant="body2">
                      {record.type
                        ? translate(
                            "resources.learningFragments.typeSelection." +
                              record.type
                          )
                        : ""}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <EditFragmentButton record={record} />
                  </TableCell>

                  <TableCell>
                    <ShowFragmentButton record={record} />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </>
  );
};
