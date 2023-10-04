import {
  DateInput,
  DeleteButton,
  Edit,
  Identifier,
  Labeled,
  SaveButton,
  ShowButton,
  SimpleForm,
  TextInput,
  Toolbar,
  TopToolbar,
  required,
  useEditContext,
  useGetRecordId,
  useRedirect,
  useStore,
  useTranslate,
} from "react-admin";
import { useParams } from "react-router-dom";
import { DOMAIN_URL_PARAM, SCENARIO_URL_PARAM } from "../constants";
import { Title } from "../Title";
import Paper from "@mui/material/Paper";
import { FragmentList } from "../fragments/FragmentList";
import { ActivityList } from "../activities/ActivityList";
import Xarrow, { Xwrapper, useXarrow } from "react-xarrows";
import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { ModuleContext } from "./ModuleContext";

const PostEditActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const to = `/modules/d/${domainId}/s/${learningScenarioId}/m/${recordId}`;
  if (!recordId) return null;
  return (
    <>
      <TopToolbar>
        <ShowButton to={to}></ShowButton>
      </TopToolbar>
    </>
  );
};

const EditToolbar = (props: any) => {
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;

  const to = `/modules/d/${domainId}/s/${learningScenarioId}`;
  return (
    <Toolbar
      {...props}
      sx={{
        justifyContent: "space-between",
      }}
    >
      <SaveButton />
      <DeleteButton
        redirect={to}
        confirmTitle={<Title translationKey="titlePages.modules.delete" />}
      />
    </Toolbar>
  );
};

const FragmentsActivitiesLists = () => {
  const { isLoading } = useEditContext();
  const learningModuleId = useGetRecordId();
  const [fragmentId, setFragmentId] = useState("");
  const updateXarrow = useXarrow();
  const translate = useTranslate();
  const [storeFragmentId, setStoreFragmentId] = useStore("fragmentId");
  const [isLoadingActivities, setIsLoadingActivities] = useState<
    boolean | undefined
  >(undefined);

  const handleRowClick = (id: Identifier) => {
    setFragmentId(id as string);
    setStoreFragmentId(id as string);
  };

  const hideActivityList = (data: any[]) => {
    if (data && fragmentId) {
      const index = data.findIndex((item: any) => item.id === fragmentId);

      if (index === -1) {
        setFragmentId("");
      }

      updateXarrow();
    }
  };

  const setInitialState = (data: any[]) => {
    if (
      data &&
      data.length > 0 &&
      storeFragmentId &&
      storeFragmentId != fragmentId
    ) {
      const index = data.findIndex((item: any) => item.id === storeFragmentId);
      if (index != -1) {
        setFragmentId(storeFragmentId);
      } else setIsLoadingActivities(false);
    } else if (!data || data.length === 0 || !storeFragmentId) {
      setIsLoadingActivities(false);
    }
  };

  return (
    !isLoading && (
      <ModuleContext.Provider
        value={{
          onRowClick: handleRowClick,
          selectedFragmentId: fragmentId,
          hideActivityList: hideActivityList,
          setInitialState: setInitialState,
          updateXArrow: updateXarrow,
          setIsLoadingActivities: setIsLoadingActivities,
        }}
      >
        <Xwrapper>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Labeled
                label="resources.learningFragments.menu"
                width="100%"
                sx={{
                  "& .RaLabeled-label": {
                    marginBottom: "0.5rem",
                  },
                }}
              >
                <Paper>
                  <FragmentList edit={true} />
                </Paper>
              </Labeled>
            </Grid>

            <Grid item xs={6}>
              <Labeled
                label="resources.activities.menu"
                width="100%"
                sx={{
                  "& .RaLabeled-label": {
                    marginBottom: "0.5rem",
                  },
                }}
              >
                <Paper>
                  {fragmentId && (
                    <ActivityList
                      learningModuleId={learningModuleId}
                      learningFragmentId={fragmentId}
                      edit={true}
                    />
                  )}
                  {isLoadingActivities === false && !fragmentId && (
                    <Typography
                      variant="body1"
                      sx={{
                        padding: "1rem",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {translate("resources.activities.viewFragmentActivities")}
                    </Typography>
                  )}
                </Paper>
              </Labeled>
            </Grid>

            {isLoadingActivities === false && fragmentId && (
              <Xarrow
                start={"_" + fragmentId}
                end={"activitiesBox"}
                path={"smooth"}
                curveness={0.7}
                color="rgba(0, 0, 0, 0.1)"
                strokeWidth={3}
                showHead={false}
              />
            )}
          </Grid>
        </Xwrapper>
      </ModuleContext.Provider>
    )
  );
};

export const ModuleEdit = () => {
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;

  const redirect = useRedirect();
  const onSuccess = () => {
    redirect(`/modules/d/${domainId}/s/${learningScenarioId}`);
  };

  return (
    <Edit
      mutationOptions={{ onSuccess }}
      actions={<PostEditActions />}
      transform={(data: any) => ({ ...data, domainId, learningScenarioId })}
      mutationMode="pessimistic"
      title={<Title translationKey="titlePages.modules.edit" />}
    >
      <SimpleForm toolbar={<EditToolbar />}>
        <TextInput
          source="title"
          validate={[required()]}
          fullWidth
          label="resources.modules.title"
        />
        <TextInput source="desc" label="resources.modules.description" />
        <TextInput source="level" label="resources.modules.level" />
        <DateInput source="dateFrom" label="resources.modules.dateFrom" />
        <DateInput source="dateTo" label="resources.modules.dateTo" />

        <FragmentsActivitiesLists />
      </SimpleForm>
    </Edit>
  );
};
