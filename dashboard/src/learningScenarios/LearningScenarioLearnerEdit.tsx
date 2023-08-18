import {
  List,
  Datagrid,
  TextField,
  TopToolbar,
  ShowButton,
  useRedirect,
  useRecordContext,
  useGetRecordId,
  Edit,
  ReferenceArrayInput,
  SimpleForm,
  Toolbar,
  DeleteButton,
  SaveButton,
  SelectArrayInput,
  AutocompleteArrayInput,
  CheckboxGroupInput,
  TextInput,
  SelectInput,
} from "react-admin";
import { useParams } from "react-router-dom";
import { useWatch } from 'react-hook-form';


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
        {/* <DeleteButton
            redirect={to}
        /> */}
    </Toolbar>
    )
};
const FullNameField = () => {
  const record = useRecordContext();
  return (<><div >Nome: <b>{record.firstname} </b> &nbsp;Cognome: <b>{record.lastname}</b> &nbsp; Email: <b>{record.email}</b> &nbsp;Nickname:<b> {record.nickname}</b></div></>)
}
const ReferenceLearnerInput  = (props:any) => {
  const nameLearner = useWatch({ name: 'name' });
  // const perPageLearner = useWatch({ name: 'perPage' });
  // const pageLearner = useWatch({ name: 'page' });
  const params = useParams();
  const domainId = params.domainId;
  return (
    <ReferenceArrayInput
    source="learners"
    reference="learners"
    perPage={100}
    // perPage={perPageLearner} 
    // page={pageLearner}
    sort={{ field: 'name', order: 'ASC' }}
    queryOptions={{ meta: { domainId , text: nameLearner} }}
  >
    <CheckboxGroupInput row={false} optionText={<FullNameField />}/>
  </ReferenceArrayInput>
  );
};
export const LearningScenarioLearnerEdit = () => {
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.id;
  const redirect = useRedirect();

  const onSuccess = () => {
    redirect(`/scenarios/d/${domainId}/s/${learningScenarioId}/learners/view`);
};
  return (
    <Edit mutationOptions={{ onSuccess }}  actions={<PostEditActions />} transform={(data: any) => ({ ...data, domainId })} mutationMode="pessimistic">
    <SimpleForm toolbar={<EditToolbar />}>
    <TextInput source="name" label="Name" />
    <ReferenceLearnerInput />
    {/* <SelectInput source="page" choices={[
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
]} />
    <SelectInput source="perPage" choices={[
    { id: 5, name: '5' },
    { id: 10, name: '10' },
    { id: 25, name: '25' },
]} /> */}
    </SimpleForm>
    </Edit>
  );
};
