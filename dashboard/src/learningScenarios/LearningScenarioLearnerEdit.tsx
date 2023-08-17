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
  ReferenceArrayField,
  Show,
  useGetRecordId,
  AutocompleteArrayInput,
  Edit,
  ReferenceArrayInput,
  BooleanField,
  SimpleForm,
  Toolbar,
  DeleteButton,
  SaveButton,
} from "react-admin";
import { DOMAIN_URL_PARAM } from "../constants";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const PostEditActions = () => {
    const recordId = useGetRecordId();
    const params = useParams();
    const domainId =params.domainId;
    const to=`/scenarios/d/${domainId}/s/${recordId}/learners/view`;
    if (!recordId)
        return null;
    return (
        <>
            <TopToolbar>
                <ShowButton  to={to}></ShowButton>
            </TopToolbar>
            </>
        )
};
export const InfoLearner = () => {
  const params = useParams();
  const scenarioId = params.id;
  const record = useRecordContext();
  return (
    <>
      <TextField source="firstname" fullWidth/>
      <TextField source="lastname" fullWidth/>
      <TextField source="email" fullWidth/>
      <TextField source="nickname"fullWidth/>
      {/* TODO */}
      {record.id === scenarioId &&
                        <div>ciao</div>
                    }
                          {record.id != scenarioId &&
                        <div>ola</div>
                    }
    </>
  );
};
const EditToolbar = (props:any) => {
    const recordId = useGetRecordId();
    const params = useParams();
    const domainId =params.domainId;
    const to=`/scenarios/d/${domainId}/s/${recordId}/learners/view`;
    return (<Toolbar {...props}>
        <SaveButton/>
        <DeleteButton
            redirect={to}
        />
    </Toolbar>
    )
};
export const LearningScenarioLearnerEdit = () => {
  const params = useParams();
  const domainId = params.domainId;
  const scenarioId = params.scenarioId;
  const redirect = useRedirect();
  const record = useRecordContext();

  const onSuccess = () => {
    redirect(`/scenarios/d/${domainId}/s/${record.id}/learners/view`);
};
  return (
    <Edit mutationOptions={{ onSuccess }}  actions={<PostEditActions />} transform={(data: any) => ({ ...data, domainId })} mutationMode="pessimistic">
    <SimpleForm toolbar={<EditToolbar />}>
      <List 
        hasCreate={false}
        resource="learners"
        queryOptions={{
          meta: { domainId },
        }}
        title=" "
      >
        <Datagrid >
          <InfoLearner  />
        </Datagrid>
      </List>
      </SimpleForm>
    </Edit>
  );
};
