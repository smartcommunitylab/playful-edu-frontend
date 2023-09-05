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
  useTranslate,
} from "react-admin";
import { useParams } from "react-router-dom";
import { useWatch } from "react-hook-form";

const PostEditActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/scenarios/d/${domainId}/s/${recordId}/learners`;
  if (!recordId) return null;
  return (
    <>
      <TopToolbar>
        <ShowButton to={to}></ShowButton>
      </TopToolbar>
    </>
  );
};

export const InfoLearner = () => {
  const params = useParams();

  return (
    <>
      <TextField source="firstname" fullWidth />
      <TextField source="lastname" fullWidth />
      <TextField source="email" fullWidth />
      <TextField source="nickname" fullWidth />
    </>
  );
};

const EditToolbar = (props: any) => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/scenarios/d/${domainId}/s/${recordId}/learners`;
  return (
    <Toolbar {...props}>
      <SaveButton />
      {/* <DeleteButton
            redirect={to}
        /> */}
    </Toolbar>
  );
};

const FullNameField = () => {
  const record = useRecordContext();
  const translate = useTranslate();

  return (
    <>
      <div>
        {translate("resources.learners.firstname")}: <b>{record.firstname} </b>{" "}
        &nbsp;
        {translate("resources.learners.lastname")}: <b>{record.lastname}</b>{" "}
        &nbsp;
        {translate("resources.learners.email")}: <b>{record.email}</b> &nbsp;
        {translate("resources.learners.nickname")}: <b>{record.nickname}</b>
      </div>
    </>
  );
};

const ReferenceLearnerInput = (props: any) => {
  const nameLearner = useWatch({ name: "name" });
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
      sort={{ field: "name", order: "ASC" }}
      queryOptions={{ meta: { domainId, text: nameLearner } }}
    >
      <CheckboxGroupInput
        row={false}
        optionText={<FullNameField />}
        label="resources.learningScenarios.learners.title"
      />
    </ReferenceArrayInput>
  );
};

const Title = () => {
  const translate = useTranslate();
  const record = useRecordContext();
  const recordTitle = record ? '"' + record.title + '"' : "";
  const title = translate("titlePages.learningScenarios.learners.edit", {
    name: recordTitle,
  });

  return title;
};

export const LearningScenarioLearnerEdit = () => {
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.id;
  const redirect = useRedirect();

  const onSuccess = () => {
    redirect(`/scenarios/d/${domainId}/s/${learningScenarioId}/learners`);
  };
  return (
    <Edit
      mutationOptions={{ onSuccess }}
      actions={<PostEditActions />}
      transform={(data: any) => ({ ...data, domainId })}
      mutationMode="pessimistic"
      title={<Title />}
    >
      <SimpleForm toolbar={<EditToolbar />}>
        <TextInput source="name" label="ra.action.search" />
        <ReferenceLearnerInput />
      </SimpleForm>
    </Edit>
  );
};
