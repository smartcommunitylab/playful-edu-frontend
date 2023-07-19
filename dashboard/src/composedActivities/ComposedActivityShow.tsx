import { ReferenceArrayField, Show, SimpleShowLayout, TextField } from "react-admin"

export const ComposedActivityShow = () => {
    return (
        <Show>
            <SimpleShowLayout>
            <TextField source="title" label="resources.composedActivity.title" />
        <TextField source="type" label="resources.composedActivity.description" />
        </SimpleShowLayout>
        </Show>
    )
}
