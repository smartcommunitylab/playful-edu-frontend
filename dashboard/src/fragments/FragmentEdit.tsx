import {
  DeleteButton,
  Edit,
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
  const translate = useTranslate();

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
            name: translate(
              "resources.learningFragments.typeSelection.singleton"
            ),
          },
          {
            id: "set",
            name: translate("resources.learningFragments.typeSelection.set"),
          },
          {
            id: "list",
            name: translate("resources.learningFragments.typeSelection.list"),
          },
        ]}
        label="resources.learningFragments.type"
      />
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
