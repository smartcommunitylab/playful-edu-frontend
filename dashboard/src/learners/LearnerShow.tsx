import { Show, SimpleShowLayout, TextField } from "react-admin"

export const LearnerShow = () => {
    return (
        <Show>
            <SimpleShowLayout>
            <TextField source="firstname"  />
            <TextField source="lastMame" />
            <TextField source="email" />
        </SimpleShowLayout>
        </Show>
    )
}
