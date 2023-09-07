import {
  EditButton,
  FunctionField,
  SelectField,
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
  useGetRecordId,
  useTranslate,
} from "react-admin";
import { useParams } from "react-router-dom";
import { ActivityList } from "../activities/ActivityList";
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

export const FragmentShow = () => {
  const translate = useTranslate();
  return (
    <Show
      actions={<PostShowActions />}
      title={<Title translationKey="titlePages.learningFragments.show" />}
    >
      <SimpleShowLayout>
        <TextField source="title" label="resources.learningFragments.title" />
        <FunctionField
          label="resources.learningFragments.type"
          render={(record: any) =>
            translate(
              "resources.learningFragments.typeSelection." + record.type
            )
          }
        />
        <ActivityList edit={false} />
      </SimpleShowLayout>
    </Show>
  );
};
