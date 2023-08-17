import {
    ChipField,
  EditButton,
  FormDataConsumer,
  ReferenceArrayField,
  ReferenceArrayInput,
  ReferenceInput,
  SelectField,
  Show,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
  TopToolbar,
  useGetRecordId,
  useRecordContext,
  useRedirect,
  useTranslate,
} from "react-admin";
import {
  ACTIVITY_URL_PARAM,
  COMPOSED_ACTIVITY_URL_PARAM,
  DOMAIN_URL_PARAM,
  FRAGMENT_URL_PARAM,
  MODULO_URL_PARAM,
  SCENARIO_URL_PARAM,
} from "../constants";
import { useParams } from "react-router-dom";

const PostShowActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
  const learningFragmentId = params.learningFragmentId;
  const to = `/activities/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${learningFragmentId}/a/${recordId}/edit`;
  if (!recordId) return null;
  return (
    <>
      <TopToolbar>
        <EditButton to={to}></EditButton>
      </TopToolbar>
    </>
  );
};
export const ActivityLayout = () => {
    const params = useParams();
  const record = useRecordContext();
    if (!record) return null;
  const translate = useTranslate();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
  const learningFragmentId = params.learningFragmentId;
    return (
        <>
              <SimpleShowLayout>

        <TextField source="title" />
        <TextField source="desc" />
        <SelectField
          source="type"
          choices={[
            {
              id: "concrete",
              name: translate("resources.activity.typeSelection.concrete"),
            },
            {
              id: "abstract",
              name: translate("resources.activity.typeSelection.abstract"),
            },
            {
              id: "group",
              name: translate("resources.activity.typeSelection.group"),
            },
          ]}
        />
       
            {record.type == "abstract" &&
               (
                <ReferenceArrayField
                label="Goals"
                reference="concepts"
                source="goals"
              >
                <SingleFieldList linkType={false}>
                  <ChipField source="title" />
                </SingleFieldList>
              </ReferenceArrayField>
              )
                }
               {record.type == "concrete" && 
               (
                <ReferenceArrayField
                label="Goals"
                reference="external-activities"
                source="externalActivityId"
              >
                <SingleFieldList linkType={false}>
                  <ChipField source="title" />
                </SingleFieldList>
              </ReferenceArrayField>
              ) } 
              {record.type == "group" &&
               (
                <TextField
                  source="groupCorrelator"
                />
              )}
              </SimpleShowLayout>
              </>)
}
export const ActivityShow = () => {
  
  return (
    <Show actions={<PostShowActions />}>
      <ActivityLayout />

    </Show>
  );
};
