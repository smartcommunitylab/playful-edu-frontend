import {
  BooleanInput,
  Edit,
  ReferenceArrayInput,
  ShowButton,
  SimpleForm,
  TextInput,
  TopToolbar,
  required,
  useGetRecordId,
  useRedirect,
  useStore,
} from "react-admin";
import { useParams } from "react-router-dom";

const PostEditActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/scenarios/d/${domainId}/s/${recordId}`;
  if (!recordId) return null;
  return (
    <>
      <TopToolbar>
        <ShowButton to={to}></ShowButton>
      </TopToolbar>
    </>
  );
};
export const LearningScenarioEdit = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const redirect = useRedirect();
  const onSuccess = () => {
    redirect(`/scenarios/d/${domainId}/s/${recordId}`);
  };
  return (
    <Edit
      mutationOptions={{ onSuccess }}
      actions={<PostEditActions />}
      transform={(data: any) => ({ ...data, domainId })}
      mutationMode="pessimistic"
    >
      <SimpleForm>
        <TextInput source="title" validate={[required()]} fullWidth />
        <TextInput source="description" />
        <TextInput source="language" />
        <BooleanInput source="publicScenario" />
        <ReferenceArrayInput
          source="educators"
          reference="educators"
          queryOptions={{ meta: { domainId } }}
        />
      </SimpleForm>
    </Edit>
  );
};
