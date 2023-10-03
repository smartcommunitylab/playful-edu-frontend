import {
  DateInput,
  DeleteButton,
  Edit,
  Identifier,
  SaveButton,
  ShowButton,
  SimpleForm,
  TextInput,
  Toolbar,
  TopToolbar,
  required,
  useGetRecordId,
  useRedirect,
} from "react-admin";
import { useParams } from "react-router-dom";
import { DOMAIN_URL_PARAM, SCENARIO_URL_PARAM } from "../constants";
import { Title } from "../Title";
import Paper from "@mui/material/Paper";
import { FragmentList } from "../fragments/FragmentList";
import { ActivityList } from "../activities/ActivityList";
import Xarrow, { Xwrapper, useXarrow } from "react-xarrows";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
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

export const ModuleEdit = () => {
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = useGetRecordId();
  const [fragmentId, setFragmentId] = useState("");
  const [previosFragmentId, setPreviosFragmentId] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(true);
  const updateXarrow = useXarrow();

  const redirect = useRedirect();
  const onSuccess = () => {
    redirect(`/modules/d/${domainId}/s/${learningScenarioId}`);
  };

  const handleRowClick = (e: any, id: Identifier) => {
    if (isFirstTime) {
      setFragmentId(id as string);
      setPreviosFragmentId(id as string);
      setIsFirstTime(false);
    } else {
      setPreviosFragmentId(fragmentId);
      setFragmentId(id as string);
    }
  }

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

        <ModuleContext.Provider value={{ onRowClick: handleRowClick }}>
          <Xwrapper>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Paper>
                  <FragmentList edit={true} />
                </Paper>
              </Grid>

              {fragmentId && (
                <>
                  <Grid item xs={6}>
                    <Paper id="activitiesBox">
                      <ActivityList
                        learningModuleId={learningModuleId}
                        learningFragmentId={fragmentId}
                        edit={true}
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
      </SimpleForm>
    </Edit>
  );
};
