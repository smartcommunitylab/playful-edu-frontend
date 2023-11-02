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
  Datagrid,
  Edit,
  ShowButton,
  useListContext,
  Link,
  useGetList,
} from "react-admin";
import { useParams } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button as MuiButton,
} from "@mui/material";

const EditActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/scenarios/d/${domainId}/s/${recordId}/learners`;
  if (!recordId) return null;

  return (
    <TopToolbar sx={{ flex: "0 1 auto !important" }}>
      <ShowButton to={to} />
    </TopToolbar>
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

interface DatagridProps {
  onSelectedIdsChange: React.Dispatch<React.SetStateAction<string[]>>;
}

const ScenarioLearnerDatagrid = ({ onSelectedIdsChange }: DatagridProps) => {
  const { onUnselectItems, onSelect, selectedIds } = useListContext();
  const record = useRecordContext();

  useEffect(() => {
    onUnselectItems();
    onSelect(record?.learners);

    return () => {
      onUnselectItems();
    };
  }, []);

  useEffect(() => {
    if (selectedIds) {
      onSelectedIdsChange(selectedIds);
    }
  }, [selectedIds]);

  return (
    <Datagrid
      bulkActionButtons={<PostBulkActionButtons />}
      sx={{
        "& .RaBulkActionsToolbar-icon": {
          display: "none",
        },
        "& .RaBulkActionsToolbar-topToolbar": {
          backgroundColor: "initial",
        },
      }}
    >
      <TextField source="firstname" label="resources.learners.firstname" />
      <span> </span>
      <TextField source="lastname" label="resources.learners.lastname" />
      <span> </span>
      <TextField source="email" label="resources.learners.email" />
      <TextField source="nickname" label="resources.learners.nickname" />
    </Datagrid>
  );
};

const Empty = () => {
  const params = useParams();
  const domainId = params.domainId;
  const translate = useTranslate();
  const to = `/learners/d/${domainId}/create`;

  return (
    <Box display="flex" textAlign="center" justifyContent="center" mt={10}>
      <Card>
        <CardContent sx={{ padding: "33px !important" }}>
          <Typography variant="h4" paragraph>
            {translate("resources.learningScenarios.noDomainLearners")}
          </Typography>
          <Typography variant="body1">
            {translate("resources.learners.addOne")}
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

const Filters = [<TextInput label="ra.action.search" source="text" alwaysOn />];

export const LearningScenarioLearnerEdit = () => {
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.id;
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { total, isLoading } = useGetList("learners", { meta: { domainId } });
  const [isLearnersListEmpty, setIsLearnersListEmpty] = useState<
    boolean | undefined
  >(undefined);

  useLayoutEffect(() => {
    if (total !== undefined) {
      setIsLearnersListEmpty(total === 0);
    }
  }, [total]);

  const redirect = useRedirect();
  const onSuccess = () => {
    redirect(`/scenarios/d/${domainId}/s/${learningScenarioId}/learners`);
  };

  return (
    <>
      {isLoading === false && (
        <>
          {!isLearnersListEmpty && (
            <Edit
              actions={<EditActions />}
              mutationMode="pessimistic"
              transform={(data: any) => ({ ...data, learners: selectedIds })}
              mutationOptions={{ onSuccess }}
              title={<Title />}
            >
              <SimpleForm
                toolbar={<EditToolbar />}
                sx={{
                  "& .MuiStack-root": { alignItems: "stretch" },
                }}
              >
                <List
                  resource="learners"
                  empty={false}
                  actions={false}
                  filters={Filters}
                  queryOptions={{
                    meta: { domainId },
                  }}
                  sx={{
                    justifyContent: "center",
                    "& .RaList-actions": {
                      marginBottom: "3rem",
                      alignItems: "center",
                    },
                  }}
                  title=" "
                  storeKey="scenarioLearners.edit.listParams"
                >
                  <ScenarioLearnerDatagrid
                    onSelectedIdsChange={setSelectedIds}
                  />
                </List>
              </SimpleForm>
            </Edit>
          )}
          {isLearnersListEmpty && <Empty />}
        </>
      )}
    </>
  );
};
