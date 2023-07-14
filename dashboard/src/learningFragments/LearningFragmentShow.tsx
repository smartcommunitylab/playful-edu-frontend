import { Show, SimpleShowLayout, TextField } from "react-admin"

export const LearningFragmentShow = () => {
    return (
        <Show>
            <SimpleShowLayout>
            <TextField source="title"  />
            <TextField source="description" />
            <TextField source="type" />
            <TextField source="language" />
            <TextField source="tool" />
            <TextField source="difficulty" />
        </SimpleShowLayout>
        </Show>
    )
}
