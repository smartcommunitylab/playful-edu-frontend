import { Show, SimpleShowLayout, TextField } from "react-admin"

export const LearningScenarioShow = () => {
    return (
        <Show>
            <SimpleShowLayout>
            <TextField source="title"  />
            <TextField source="description" />
            <TextField source="language" />
        </SimpleShowLayout>
        </Show>
    )
}
