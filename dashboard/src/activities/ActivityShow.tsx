import { BooleanField, Show, SimpleShowLayout, TextField } from "react-admin"

export const ActivityShow = () => {
    return (
        <Show>
            <SimpleShowLayout>
            <TextField source="title" />
            <TextField source="desc" />
            <BooleanField source="group" />
        </SimpleShowLayout>
        </Show>
    )
}
