import { Show, SimpleShowLayout, TextField } from "react-admin"

export const ConceptShow = () => {
    return (
        <Show>
            <SimpleShowLayout>
            <TextField source="title"  />
        </SimpleShowLayout>
        </Show>
    )
}
