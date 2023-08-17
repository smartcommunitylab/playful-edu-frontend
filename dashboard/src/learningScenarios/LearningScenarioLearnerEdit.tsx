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
} from "react-admin";
import { useParams } from "react-router-dom";

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
  const learningScenarioId = params.id;
  const redirect = useRedirect();

  const onSuccess = () => {
    redirect(`/scenarios/d/${domainId}/s/${learningScenarioId}/learners/view`);
};
  return (
    <Edit mutationOptions={{ onSuccess }}  actions={<PostEditActions />} transform={(data: any) => ({ ...data, domainId })} mutationMode="pessimistic">
    <SimpleForm toolbar={<EditToolbar />}>
    <ReferenceArrayInput
          source="learners"
          reference="learners"
          queryOptions={{ meta: { domainId } }}
        />
      {/* <List 
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
      </List> */}
      </SimpleForm>
    </Edit>
  );
};
