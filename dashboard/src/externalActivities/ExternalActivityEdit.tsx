import {
  DeleteButton,
  Edit,
  ReferenceArrayInput,
  SaveButton,
  SelectInput,
  ShowButton,
  SimpleForm,
  TextInput,
  Toolbar,
  TopToolbar,
  required,
  useGetRecordId,
  useRedirect,
  useTranslate,
} from "react-admin";
import { DOMAIN_URL_PARAM } from "../constants";
import { useParams } from "react-router-dom";

const PostEditActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/external-activities/d/${domainId}/${recordId}`;
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
  const to = `/external-activities/d/${domainId}`;
  return (
    <Toolbar {...props}>
      <SaveButton />
      <DeleteButton redirect={to} />
    </Toolbar>
  );
};
export const ExternalActivityEdit = () => {
  const params = useParams();
  const domainId = params.domainId;
  const redirect = useRedirect();
  const translate = useTranslate();
  const onSuccess = () => {
    redirect(`/external-activities/d/${domainId}`);
  };
  return (
    <Edit
      mutationOptions={{ onSuccess }}
      actions={<PostEditActions />}
      transform={(data: any) => ({ ...data, domainId })}
      mutationMode="pessimistic"
    >
      <SimpleForm toolbar={<EditToolbar />}>
        <TextInput source="title" validate={[required()]} fullWidth />
        <TextInput source="desc" fullWidth />
        <TextInput source="language" />
        <TextInput source="extId" />
        <TextInput source="extGroupId" />
        <TextInput source="extUrl" type="url" />
        <SelectInput
          source="type"
          choices={[
            {
              id: "individual",
              name: translate(
                "resources.externalActivity.typeSelection.individual"
              ),
            },
          ]}
        />
        <SelectInput
          source="tool"
          choices={[
            {
              id: "computer",
              name: translate(
                "resources.externalActivity.toolSelection.computer"
              ),
            },
          ]}
        />
        <SelectInput
          source="difficulty"
          choices={[
            {
              id: "low",
              name: translate(
                "resources.externalActivity.difficultySelection.low"
              ),
            },
          ]}
        />
        <TextInput source="groupCorrelator" />
        <ReferenceArrayInput
          source="preconditions"
          reference="concepts"
          queryOptions={{ meta: { domainId } }}
        />
        <ReferenceArrayInput
          source="effects"
          reference="concepts"
          queryOptions={{ meta: { domainId } }}
        />
      </SimpleForm>
    </Edit>
  );
};
