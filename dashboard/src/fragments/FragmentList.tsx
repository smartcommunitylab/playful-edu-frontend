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
  useRecordContext,
  Link,
  useListContext,
  BulkDeleteButton,
  ResourceContextProvider,
  DatagridProps,
  DatagridBodyProps,
  DatagridBody,
  RecordContextProvider,
  DatagridRowProps,
  FieldProps,
} from "react-admin";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button as MuiButton,
  TableRow,
  TableCell,
} from "@mui/material";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useModuleContex } from "../modules/ModuleContext";
import Checkbox from "@mui/material/Checkbox";
import React from "react";

const ListActions = () => {
  const listContext = useListContext();
  
  return listContext.data?.length > 0 ? (
    <TopToolbar sx={{ minHeight: "48px !important", zIndex: "2" }}>
      <CreateFragmentButton />
      <ExportButton />
    </TopToolbar>
  ) : null;
};

const FragmentFilters = [
  <TextInput label="ra.action.search" source="name" alwaysOn />,
];

const PostBulkActionButtons = () => {
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

const CustomDatagridRow = ({
  record,
  id,
  onToggleItem,
  children,
  selected,
}: DatagridRowProps) => {
  const translate = useTranslate();
  const { edit } = useEditContex();
  const { onRowClick, selectedFragmentId } = useModuleContex();

  if (id) {
    return (
      <RecordContextProvider value={record}>
        <TableRow
          id={"_" + id}
          sx={{
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04) !important",
            },
            backgroundColor:
              selectedFragmentId === id ? "rgba(0, 0, 0, 0.08)" : "",
          }}
          onClick={(e) => onRowClick(id)}
        >
          {edit && (
            <TableCell sx={{ padding: "0 12px 0 16px" }}>
              <Checkbox
                checked={selected}
                onClick={(event) => {
                  event.stopPropagation();
                  if (onToggleItem) {
                    onToggleItem(id, event);
                  }
                }}
                sx={{ padding: "0" }}
              />
            </TableCell>
          )}

          {React.Children.map(children, (field) => {
            if (React.isValidElement<FieldProps>(field) && field.props.source) {
              if (record && field.props.source === "type") {
                const translation = record[field.props.source]
                  ? translate(
                      "resources.learningFragments.typeSelection." +
                        record[field.props.source]
                    )
                  : "";

                return (
                  <TableCell key={`${id}-${field.props.source}`}>
                    <Typography component="span" variant="body2">
                      {translation}
                    </Typography>
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

          <TableCell>
            <EditFragmentButton />
          </TableCell>

          <TableCell>
            <ShowFragmentButton />
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
  const { edit } = useEditContex();
  const bulkActionButtons = edit ? <PostBulkActionButtons /> : false;
  const listContext = useListContext();
  const { hideActivityList, setInitialState } = useModuleContex();

  useEffect(() => {
    hideActivityList(listContext.data);
  }, [listContext.data]);

  useLayoutEffect(() => {
    setInitialState(listContext.data);
  }, [listContext.data]);

  return (
    <Datagrid
      {...props}
      body={<CustomDatagridBody />}
      bulkActionButtons={bulkActionButtons}
      className="fragments-activities-table"
    />
  );
};

export const FragmentList = (props: { edit: boolean }) => {
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId
    ? params.learningModuleId
    : params.id;
  const title = " ";

  return (
    <EditContext.Provider value={{ edit: props.edit }}>
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
          <CustomDatagrid
            sx={{
              "& .RaBulkActionsToolbar-topToolbar": {
                backgroundColor: "initial",
              },
              "& .RaDatagrid-table": {
                borderCollapse: "separate",
              },
            }}
          >
            <TextField
              source="title"
              label="resources.learningFragments.title"
              sortable={false}
            />
            <TextField
              source="type"
              label="resources.learningFragments.type"
              sortable={false}
            />
            <TextField></TextField>
            <TextField></TextField>
          </CustomDatagrid>
        </List>
      </ResourceContextProvider>
    </EditContext.Provider>
  );
};

const EditFragmentButton = () => {
  const record = useRecordContext();
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId
    ? params.learningModuleId
    : params.id;
  const to = `/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${record.id}/edit`;

  if (!record) return null;
  return (
    <>
      <EditButton to={to}></EditButton>
    </>
  );
};

const ShowFragmentButton = () => {
  const record = useRecordContext();
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId
    ? params.learningModuleId
    : params.id;
  const to = `/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${record.id}`;

  if (!record) return null;
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
  const listContext = useListContext();
  const { hideActivityList, setInitialState } = useModuleContex();

  useEffect(() => {
    hideActivityList(listContext.data);
  }, [listContext.data]);

  useLayoutEffect(() => {
    setInitialState(listContext.data);
  }, [listContext.data]);

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

// const FragmentTable = (props: { edit: boolean }) => {
//   const translate = useTranslate();
//   const listContext = useListContext();
//   const { onRowClick } = useModuleContex();
//   const data = listContext.data;
//   const [isAtLeastOneCheckboxSelected, setIsAtLeastOneCheckboxSelected] =
//     useState(listContext.selectedIds.length > 0);

//   const handleBodyCheckboxClick = (e: any, id: string) => {
//     e.stopPropagation();
//     listContext.onToggleItem(id);
//   };

//   const handleHeaderCheckboxClick = (e: any) => {
//     e.stopPropagation();
//     if (e.target.checked) {
//       const ids = data.map((item: any) => item.id);
//       listContext.onSelect(ids);
//     } else {
//       listContext.onUnselectItems();
//     }
//   };

//   const handleCancelButtonClick = (e: any) => {
//     listContext.onUnselectItems();
//   };

//   useEffect(() => {
//     setIsAtLeastOneCheckboxSelected(listContext.selectedIds.length > 0);
//   }, [listContext.selectedIds]);

//   useEffect(() => {
//     return () => {
//       if (props.edit) {
//         listContext.onUnselectItems();
//       }
//     };
//   }, []);

//   return (
//     <>
//       <Table sx={{ padding: 2 }} className="fragments-activities-table">
//         <TableHead>
//           <TableRow>
//             {props.edit && (
//               <TableCell
//                 sx={{
//                   width: "52px",
//                 }}
//               >
//                 <Checkbox
//                   sx={{ padding: "0" }}
//                   onClick={(e) => handleHeaderCheckboxClick(e)}
//                   checked={listContext.selectedIds.length === listContext.total}
//                 />
//               </TableCell>
//             )}
//             <TableCell>
//               {translate("resources.learningFragments.title")}
//             </TableCell>
//             <TableCell>
//               {translate("resources.learningFragments.type")}
//             </TableCell>
//             <TableCell></TableCell>
//             <TableCell></TableCell>
//           </TableRow>
//         </TableHead>

//         <TableBody>
//           {data &&
//             data.map((record: any) => {
//               if (!record) return null;
//               return (
//                 <TableRow
//                   key={record.id}
//                   id={"_" + record.id}
//                   sx={{
//                     cursor: "pointer",
//                     "&:hover": {
//                       backgroundColor: "rgba(0, 0, 0, 0.04) !important",
//                     },
//                   }}
//                   onClick={(e) => onRowClick(e, record.id)}
//                 >
//                   {props.edit && (
//                     <TableCell
//                       sx={{
//                         width: "52px",
//                       }}
//                     >
//                       <Checkbox
//                         sx={{ padding: "0" }}
//                         onClick={(e) => handleBodyCheckboxClick(e, record.id)}
//                         checked={
//                           listContext.selectedIds.indexOf(record.id) !== -1
//                         }
//                       />
//                     </TableCell>
//                   )}

//                   <TableCell>
//                     <Typography component="span" variant="body2">
//                       {record.title}
//                     </Typography>
//                   </TableCell>

//                   <TableCell>
//                     <Typography component="span" variant="body2">
//                       {record.type
//                         ? translate(
//                             "resources.learningFragments.typeSelection." +
//                               record.type
//                           )
//                         : ""}
//                     </Typography>
//                   </TableCell>
//                 </TableRow>
//               );
//             })}
//         </TableBody>
//       </Table>
//     </>
//   );
// };

interface EditContextValue {
  edit: boolean;
}

const EditContext = createContext<EditContextValue | undefined>(undefined);

const useEditContex = () => {
  const editContext = useContext(EditContext);
  if (editContext === undefined) {
    throw new Error("useEditContext must be inside a provider");
  }
  return editContext;
};
