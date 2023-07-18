import { ReferenceArrayField, Show, SimpleShowLayout, TextField, useRecordContext } from "react-admin"
import { ModuleList } from "../modules/ModuleList"

export const LearningScenarioShow = () => {
    // const record= useRecordContext();
    // if (!record)
    //     return <></>;
    return (
        <Show>
            <SimpleShowLayout>
            <TextField source="title"  />
            <TextField source="desc" />
            <TextField source="language" />
            <ReferenceArrayField label="Educators" reference="educators" source="educators" />
            <ReferenceArrayField label="Learners" reference="learners" source="learners" />

        </SimpleShowLayout>
        {/* <ModuleList scenarioId={record.id}/> */}
        </Show>
    )
}
