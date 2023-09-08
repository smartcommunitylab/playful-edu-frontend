import {
  AutocompleteArrayInput,
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
  useGetList,
  useGetRecordId,
  useRedirect,
  useStore,
  useTranslate,
} from "react-admin";
import { DOMAIN_URL_PARAM } from "../constants";
import { useParams } from "react-router-dom";
import { Title } from "../Title";

const PostEditActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/competences/d/${domainId}/${recordId}`;
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
  const to = `/competences/d/${domainId}`;
  return (
    <Toolbar {...props}>
      <SaveButton />
      <DeleteButton redirect={to} />
    </Toolbar>
  );
};

export const CompetencesEdit = () => {
  const params = useParams();
  const redirect = useRedirect();
  const translate = useTranslate();
  const domainId = params.domainId;
  const onSuccess = () => {
    redirect(`/competences/d/${domainId}`);
  };
  
  const { total } = useGetList("concepts", {
    meta: { domainId },
  });

  return (
    <Edit
      mutationOptions={{ onSuccess }}
      actions={<PostEditActions />}
      transform={(data: any) => ({ ...data, domainId })}
      mutationMode="pessimistic"
      title={<Title translationKey="titlePages.competences.edit" />}
    >
      <SimpleForm toolbar={<EditToolbar />}>
        <TextInput
          source="title"
          label="resources.competences.title"
          validate={[required()]}
          fullWidth
        />
        <TextInput source="desc" label="resources.competences.description" />
        <SelectInput
          source="type"
          choices={[
            {
              id: "knowledge",
              name: translate(
                "resources.competences.knowledgeSelection.knowledge"
              ),
            },
          ]}
          label="resources.competences.type"
        />
        <ReferenceArrayInput
          source="concepts"
          reference="concepts"
          queryOptions={{ meta: { domainId } }}
          perPage={total}
        >
          <AutocompleteArrayInput label="resources.competences.concepts" />
        </ReferenceArrayInput>
      </SimpleForm>
    </Edit>
  );
};
