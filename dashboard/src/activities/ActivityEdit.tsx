import {
  AutocompleteArrayInput,
  AutocompleteInput,
  CheckboxGroupInput,
  DeleteButton,
  Edit,
  FormDataConsumer,
  ReferenceArrayInput,
  ReferenceInput,
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
  useTranslate,
} from "react-admin";
import { useParams } from "react-router-dom";
import { Title } from "../Title";

const PostEditActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
  const learningFragmentId = params.learningFragmentId;

  const to = `/activities/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${learningFragmentId}/a/${recordId}`;
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
  const learningModuleId = params.learningModuleId;
  const learningFragmentId = params.learningFragmentId;
  const to = `/modules/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}`;
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
        confirmTitle={<Title translationKey="titlePages.activities.delete" />}
      />
    </Toolbar>
  );
};

export const ActivityEdit = () => {
  const redirect = useRedirect();
  const params = useParams();
  const translate = useTranslate();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
  const learningFragmentId = params.learningFragmentId;

  const onSuccess = () => {
    redirect(
      `/modules/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}`
    );
  };

  const { total: conceptsTotal } = useGetList("concepts", {
    meta: { domainId, learningScenarioId, learningModuleId },
  });

  const { total: externalActivitiesTotal } = useGetList("external-activities", {
    meta: {
      domainId,
      learningScenarioId,
      learningModuleId,
      learningFragmentId,
    },
  });

  return (
    <Edit
      mutationOptions={{ onSuccess }}
      actions={<PostEditActions />}
      mutationMode="pessimistic"
      title={<Title translationKey="titlePages.activities.edit" />}
    >
      <SimpleForm toolbar={<EditToolbar />}>
        <TextInput
          source="title"
          validate={[required()]}
          fullWidth
          label="resources.activities.title"
        />
        <TextInput source="desc" label="resources.activities.description" />
        <SelectInput
          source="type"
          choices={[
            {
              id: "concrete",
              name: translate("resources.activities.typeSelection.concrete"),
            },
            {
              id: "abstr",
              name: translate("resources.activities.typeSelection.abstr"),
            },
            {
              id: "group",
              name: translate("resources.activities.typeSelection.group"),
            },
          ]}
          label="resources.activities.type"
        />
        <FormDataConsumer>
          {({ formData, ...rest }) => {
            if (formData.type && formData.type == "abstr")
              return (
                <ReferenceArrayInput
                  source="goals"
                  reference="concepts"
                  queryOptions={{
                    meta: { domainId, learningScenarioId, learningModuleId },
                  }}
                  perPage={conceptsTotal}
                >
                  <AutocompleteArrayInput label="resources.activities.goals" />
                </ReferenceArrayInput>
              );
            else if (formData.type == "concrete")
              return (
                <ReferenceInput
                  source="externalActivityId"
                  reference="external-activities"
                  queryOptions={{
                    meta: {
                      domainId,
                      learningScenarioId,
                      learningModuleId,
                      learningFragmentId,
                    },
                  }}
                  perPage={externalActivitiesTotal}
                >
                  <AutocompleteInput label="resources.activities.externalActivity" />
                </ReferenceInput>
              );
            else if (formData.type == "group")
              return (
                <TextInput
                  source="groupCorrelator"
                  label="resources.activities.groupCorrelator"
                />
              );
          }}
        </FormDataConsumer>
      </SimpleForm>
    </Edit>
  );
};
