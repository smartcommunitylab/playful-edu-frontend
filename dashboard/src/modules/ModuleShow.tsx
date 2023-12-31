import {
  DateField,
  EditButton,
  Identifier,
  Labeled,
  RaRecord,
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
  useGetRecordId,
  useShowContext,
  useSidebarState,
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
import { Grid, Typography, useMediaQuery, Theme } from "@mui/material";
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

const FragmentsActivitiesLists = () => {
  const { isLoading } = useShowContext();
  const learningModuleId = useGetRecordId();
  const updateXarrow = useXarrow();
  const translate = useTranslate();

  const [fragmentId, setFragmentId] = useState("");
  const [storedFragmentInfo, setStoredFragmentInfo] = useStore<{
    fragmentId: string;
  }>("fragmentInfo");
  const [areLoadingActivities, setAreLoadingActivities] = useState<
    boolean | undefined
  >(undefined);

  const isSmallerThanBreakpoint = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down(1700)
  );
  const [sidebarState] = useSidebarState();

  const handleRowClick = (record: RaRecord<Identifier> | undefined) => {
    const fragmentId = record ? (record.id as string) : "";
    setFragmentId(fragmentId);
    setStoredFragmentInfo({ fragmentId });
  };

  // Hide the activity list if the fragment associated with it has been deleted
  const hideActivityList = (data: any[]) => {
    if (data && fragmentId) {
      const index = data.findIndex((item: any) => item.id === fragmentId);

      if (index === -1) {
        setFragmentId("");
      }

      updateXarrow();
    }
  };

  // Update fragment-related state based on changes in the provided data or stored information
  const handleFragmentListChanges = (data: any[]) => {
    if (
      data &&
      data.length > 0 &&
      storedFragmentInfo &&
      storedFragmentInfo.fragmentId != fragmentId
    ) {
      const index = data.findIndex(
        (item: any) => item.id === storedFragmentInfo.fragmentId
      );
      if (index != -1) {
        setFragmentId(storedFragmentInfo.fragmentId);
      } else setAreLoadingActivities(false);
    } else if (!data || data.length === 0 || !storedFragmentInfo) {
      setAreLoadingActivities(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      updateXarrow();
    }, 195);
  }, [sidebarState]);

  return (
    !isLoading && (
      <ModuleContext.Provider
        value={{
          onRowClick: handleRowClick,
          selectedFragmentId: fragmentId,
          hideActivityList: hideActivityList,
          handleFragmentListChanges: handleFragmentListChanges,
          updateXArrow: updateXarrow,
          setAreLoadingActivities: setAreLoadingActivities,
        }}
      >
        <Xwrapper>
          <Grid container spacing={4}>
            <Grid
              item
              xs={isSmallerThanBreakpoint ? 12 : 6}
              sx={{ zIndex: isSmallerThanBreakpoint ? "1" : "0" }}
            >
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

            <Grid item xs={isSmallerThanBreakpoint ? 12 : 6}>
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
                  {areLoadingActivities === false && !fragmentId && (
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

            {areLoadingActivities === false && fragmentId && (
              <Xarrow
                start={"_" + fragmentId}
                end={"activitiesBox"}
                startAnchor={isSmallerThanBreakpoint ? "bottom" : "right"}
                endAnchor={isSmallerThanBreakpoint ? "top" : "left"}
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

export const ModuleShow = () => {
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
        <FragmentsActivitiesLists />
      </SimpleShowLayout>
    </Show>
  );
};
