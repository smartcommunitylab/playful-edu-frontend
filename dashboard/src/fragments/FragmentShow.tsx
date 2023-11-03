import {
  EditButton,
  FunctionField,
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
  useGetOne,
  useGetRecordId,
  useTranslate,
} from "react-admin";
import { useParams } from "react-router-dom";
import { Title } from "../Title";
import { useLayoutEffect, useState } from "react";

const PostShowActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
  const to = `/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${recordId}/edit`;
  const [isScenarioRunning, setIsScenarioRunning] = useState<
    boolean | undefined
  >(undefined);
  const { data, isLoading } = useGetOne("scenarios", {
    id: learningScenarioId,
  });

  useLayoutEffect(() => {
    if (data) {
      setIsScenarioRunning(data.running);
    }
  }, [data]);

  if (!recordId) return null;
  return (
    <>
      {!isLoading && (
        <TopToolbar>
          <EditButton to={to} disabled={isScenarioRunning} />
        </TopToolbar>
      )}
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
