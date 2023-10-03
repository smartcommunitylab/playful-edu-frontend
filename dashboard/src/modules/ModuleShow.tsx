import {
  DateField,
  EditButton,
  Identifier,
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
  useGetRecordId,
} from "react-admin";
import { useParams } from "react-router-dom";
import { Title } from "../Title";
import Paper from "@mui/material/Paper";
import { FragmentList } from "../fragments/FragmentList";
import { ActivityList } from "../activities/ActivityList";
import Xarrow, { Xwrapper, useXarrow } from "react-xarrows";
import { createContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
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
  const [previosFragmentId, setPreviosFragmentId] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(true);
  const updateXarrow = useXarrow();

  const handleRowClick = (e: any, id: Identifier) => {
    if (isFirstTime) {
      setFragmentId(id as string);
      setPreviosFragmentId(id as string);
      setIsFirstTime(false);
    } else {
      setPreviosFragmentId(fragmentId);
      setFragmentId(id as string);
    }
  };

  useEffect(() => {
    const currentRow = document.getElementById(`_${fragmentId}`) as HTMLElement;
    const previousRow = document.getElementById(
      `_${previosFragmentId}`
    ) as HTMLElement;

    if (previousRow) {
      previousRow.style.backgroundColor = "";
    }
    if (currentRow) {
      currentRow.style.backgroundColor = "rgba(0, 0, 0, 0.08)";
    }

    setTimeout(() => {
      updateXarrow();
    }, 80);
  }, [fragmentId, previosFragmentId]);

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

      <ModuleContext.Provider value={{ onRowClick: handleRowClick }}>
        <Xwrapper>
          <Grid
            container
            spacing={4}
            sx={{
              padding: "16px",
            }}
          >
            <Grid item xs={6}>
              <Paper>
                <FragmentList edit={false} />
              </Paper>
            </Grid>

            {fragmentId && (
              <>
                <Grid item xs={6}>
                  <Paper>
                    <ActivityList
                      edit={false}
                      learningModuleId={learningModuleId}
                      learningFragmentId={fragmentId}
                    />
                  </Paper>
                </Grid>

                <Xarrow
                  start={"_" + fragmentId}
                  end={"activitiesBox"}
                  path={"smooth"}
                  curveness={0.7}
                  color="rgba(0, 0, 0, 0.1)"
                  strokeWidth={3}
                  showHead={false}
                />
              </>
            )}
          </Grid>
        </Xwrapper>
      </ModuleContext.Provider>
    </Show>
  );
};
