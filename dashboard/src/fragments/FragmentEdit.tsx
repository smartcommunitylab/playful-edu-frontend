import {
  DeleteButton,
  Edit,
  FormDataConsumer,
  NumberInput,
  SaveButton,
  SelectInput,
  ShowButton,
  SimpleForm,
  TextInput,
  Toolbar,
  TopToolbar,
  minValue,
  required,
  useGetList,
  useGetRecordId,
  useNotify,
  useRedirect,
  useTranslate,
} from "react-admin";
import { useParams } from "react-router-dom";
import { Title } from "../Title";
import { useFormContext } from "react-hook-form";

const PostEditActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
  const to = `/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${recordId}`;
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
  const to = `/modules/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}`;

  const learningFragmentId = params.id;
  const { getValues } = useFormContext();
  const { total, isLoading } = useGetList("activities", {
    meta: { learningFragmentId },
  });
  const notify = useNotify();

  const save = () => {
    if (!isLoading) {
      const values = getValues();
      if (values.type === "singleton") {
        if (total && total > 1) {
          event?.preventDefault();
          notify("resources.learningFragments.singletonFragmentError", {
            type: "error",
          });
        }
      }
    } else {
      event?.preventDefault();
      notify("resources.learningFragments.activitiesNotYetLoaded", {
        type: "error",
      });
    }
  };

  return (
    <Toolbar
      {...props}
      sx={{
        justifyContent: "space-between",
      }}
    >
      <SaveButton onClick={() => save()} />
      <DeleteButton
        redirect={to}
        confirmTitle={
          <Title translationKey="titlePages.learningFragments.delete" />
        }
      />
    </Toolbar>
  );
};

const FramgmentEditChildren = () => {
  return (
    <SimpleForm toolbar={<EditToolbar />}>
      <TextInput
        source="title"
        validate={[required()]}
        fullWidth
        label="resources.learningFragments.title"
      />
      <SelectInput
        source="type"
        choices={[
          {
            id: "singleton",
            name: "resources.learningFragments.typeSelection.singleton",
          },
          {
            id: "set",
            name: "resources.learningFragments.typeSelection.set",
          },
          {
            id: "list",
            name: "resources.learningFragments.typeSelection.list",
          },
        ]}
        label="resources.learningFragments.type"
        sx={{ minWidth: "265px" }}
      />
      <SelectInput
        source="setCompletionRule"
        choices={[
          {
            id: "all",
            name: "resources.learningFragments.ruleSelection.all",
          },
          {
            id: "at_least",
            name: "resources.learningFragments.ruleSelection.at_least",
          },
        ]}
        label="resources.learningFragments.rule"
        sx={{ minWidth: "265px" }}
      />
      <FormDataConsumer>
        {({ formData, ...rest }) => {
          if (
            formData.setCompletionRule &&
            formData.setCompletionRule == "at_least"
          )
            return (
              <NumberInput
                source="minActivities"
                validate={minValue(1, "resources.validation.minValue")}
                label="resources.learningFragments.minimumNumberOfActivities"
                sx={{ minWidth: "265px" }}
              ></NumberInput>
            );
        }}
      </FormDataConsumer>
    </SimpleForm>
  );
};

export const FragmentEdit = () => {
  const redirect = useRedirect();
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;

  const onSuccess = () => {
    redirect(
      `/modules/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}`
    );
  };

  return (
    <Edit
      mutationOptions={{ onSuccess }}
      actions={<PostEditActions />}
      mutationMode="pessimistic"
      title={<Title translationKey="titlePages.learningFragments.edit" />}
    >
      <FramgmentEditChildren />
    </Edit>
  );
};
