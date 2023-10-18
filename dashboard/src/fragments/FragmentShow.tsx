import {
  EditButton,
  FunctionField,
  SelectField,
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
  useGetRecordId,
  useRecordContext,
  useTranslate,
} from "react-admin";
import { useParams } from "react-router-dom";
import { Title } from "../Title";

const PostShowActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
  const to = `/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${recordId}/edit`;

  if (!recordId) return null;
  return (
    <>
      <TopToolbar>
        <EditButton to={to} />
      </TopToolbar>
    </>
  );
};

const FragmentLayout = () => {
  const translate = useTranslate();

  return (
    <SimpleShowLayout>
      <TextField source="title" label="resources.learningFragments.title" />

      <FunctionField
        label="resources.learningFragments.type"
        render={(record: any) =>
          record && record.type
            ? translate(
                "resources.learningFragments.typeSelection." + record.type
              )
            : ""
        }
      />

      <FunctionField
        label="resources.learningFragments.rule"
        render={(record: any) =>
          record && record.setCompletionRule
            ? record.setCompletionRule === "at_least"
              ? translate(
                  "resources.learningFragments.ruleSelection.at_least_label",
                  {
                    number: record.minActivities,
                    smart_count: record.minActivities,
                  }
                )
              : translate(
                  "resources.learningFragments.ruleSelection." +
                    record.setCompletionRule
                )
            : ""
        }
      />
    </SimpleShowLayout>
  );
};

export const FragmentShow = () => {
  return (
    <Show
      actions={<PostShowActions />}
      title={<Title translationKey="titlePages.learningFragments.show" />}
    >
      <FragmentLayout />
    </Show>
  );
};
