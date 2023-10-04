import {
  DateField,
  EditButton,
  Identifier,
  Labeled,
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
  useGetRecordId,
  useStore,
  useTranslate,
} from "react-admin";
import { useParams } from "react-router-dom";
import { Title } from "../Title";
import Paper from "@mui/material/Paper";
import { FragmentList } from "../fragments/FragmentList";
import { ActivityList } from "../activities/ActivityList";
import Xarrow, { Xwrapper, useXarrow } from "react-xarrows";
import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { ModuleContext } from "./ModuleContext";

const PostShowActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const to = `/modules/d/${domainId}/s/${learningScenarioId}/m/${recordId}/edit`;
  if (!recordId) return null;
  return (
    <>
      <TopToolbar>
        <EditButton to={to}></EditButton>
      </TopToolbar>
    </>
  );
};

export const ModuleShow = () => {
  const learningModuleId = useGetRecordId();
  const [fragmentId, setFragmentId] = useState("");
  const updateXarrow = useXarrow();
  const translate = useTranslate();
  const [storeFragmentId, setStoreFragmentId] = useStore("fragmentId");

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
    if (data && storeFragmentId && storeFragmentId != fragmentId) {
      const index = data.findIndex((item: any) => item.id === storeFragmentId);
      if (index != -1) {
        setFragmentId(storeFragmentId);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      updateXarrow();
    }, 80);
  }, [fragmentId]);

  return (
    <Show
      actions={<PostShowActions />}
      title={<Title translationKey="titlePages.modules.show" />}
    >
      <SimpleShowLayout>
        <TextField source="title" label="resources.modules.title" />
        <TextField source="desc" label="resources.modules.description" />
        <TextField source="level" label="resources.modules.level" />
        <DateField source="dateFrom" label="resources.modules.dateFrom" />
        <DateField source="dateTo" label="resources.modules.dateTo" />
      </SimpleShowLayout>

      <ModuleContext.Provider
        value={{
          onRowClick: handleRowClick,
          selectedFragmentId: fragmentId,
          hideActivityList: hideActivityList,
          setInitialState: setInitialState,
        }}
      >
        <Xwrapper>
          <Grid
            container
            spacing={4}
            sx={{
              padding: "16px",
            }}
          >
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
                <Paper id="fragmentListShowPaper">
                  <FragmentList edit={false} />
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
                      edit={false}
                      learningModuleId={learningModuleId}
                      learningFragmentId={fragmentId}
                    />
                  )}
                  {!fragmentId && (
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

            {fragmentId && (
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
    </Show>
  );
};
