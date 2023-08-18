import {
    EditButton,
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
    <Show actions={<PostShowActions />}>
      <SimpleShowLayout>
        <TextField source="title" />
        <SelectField
          source="type"
          choices={[
            {
              id: "singleton",
              name: translate("resources.fragment.typeSelection.singleton"),
            },
            {
              id: "set",
              name: translate("resources.fragment.typeSelection.set"),
            },
            {
              id: "list",
              name: translate("resources.fragment.typeSelection.list"),
            },
          ]}
        />{" "}
        <ActivityList edit={false} />
      </SimpleShowLayout>
    </Show>
  );
};
