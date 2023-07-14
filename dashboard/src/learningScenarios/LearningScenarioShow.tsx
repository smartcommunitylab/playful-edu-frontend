import { ReferenceArrayField, Show, SimpleShowLayout, TextField } from "react-admin"

export const LearningScenarioShow = () => {
    return (
        <Show>
            <SimpleShowLayout>
            <TextField source="title"  />
            <TextField source="desc" />
            <TextField source="language" />
            <ReferenceArrayField label="Educators" reference="educators" source="educators" />
            <ReferenceArrayField label="Learners" reference="learners" source="learners" />

        </SimpleShowLayout>
        </Show>
    )
}
